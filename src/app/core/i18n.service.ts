import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {includes} from 'lodash';
import {isPlatformBrowser} from '@angular/common';

import {Logger} from './logger.service';
import * as enUS from '../../translations/en-US.json';
import * as daDK from '../../translations/da-DK.json';
import enUS_2 from '../../translations/en-US.json';
import daDK_2 from '../../translations/da-DK.json';

const log = new Logger('I18nService');
const languageKey = 'language';

/**
 * Pass-through function to mark a string for translation extraction.
 * Running `npm translations:extract` will include the given string by using this.
 * @param {string} s The string to extract for translation.
 * @return {string} The same string.
 */
export function extract(s: string) {
  return s;
}

@Injectable()
export class I18nService {

  defaultLanguage: string;
  supportedLanguages: string[];

  constructor(private translateService: TranslateService,
              /* Inject the platoform id, we need this to determine if we are rendering in a browser. (SSR render issue
              with window and localStorage */
              @Inject(PLATFORM_ID) private platformId: Object) {
    // Embed languages to avoid extra HTTP requests
    const merged_enUS = {};
    const merged_daDK = {};
    Object.assign(merged_enUS, enUS, enUS_2);
    Object.assign(merged_daDK, daDK, daDK_2);

    translateService.setTranslation('English', merged_enUS);
    translateService.setTranslation('Dansk', merged_daDK);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param {!string} defaultLanguage The default language to use.
   * @param {Array.<String>} supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.language = '';

    this.translateService.onLangChange
      .subscribe((event: LangChangeEvent) => {
        /* Avoid access to localStorage when rendering with SSR - need to refator to use an abstraction of localStorage
        instead. */
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(languageKey, event.lang);
        }
      });
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param {string} language The IETF language code to set.
   */
  set language(language: string) {
    /* Avoid access to localStorage when rendering with SSR - need to refator to use an abstraction of localStorage
    instead. */
    if (!isPlatformBrowser(this.platformId)) {
      language = language || this.translateService.getBrowserCultureLang();
    } else {
      language = language || localStorage.getItem(languageKey) || this.translateService.getBrowserCultureLang();
    }

    let isSupportedLanguage = includes(this.supportedLanguages, language);

    // If no exact match is found, search without the region
    if (language && !isSupportedLanguage) {
      language = language.split('-')[0];
      language = this.supportedLanguages.find(supportedLanguage => supportedLanguage.startsWith(language)) || '';
      isSupportedLanguage = Boolean(language);
    }

    // Fallback if language is not supported
    if (!isSupportedLanguage) {
      language = this.defaultLanguage;
    }

    log.debug(`Language set to ${language}`);
    this.translateService.use(language);
  }

  /**
   * Gets the current language.
   * @return {string} The current language code.
   */
  get language(): string {
    return this.translateService.currentLang;
  }

}

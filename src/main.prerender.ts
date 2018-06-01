import { enableProdMode } from '@angular/core';
import { environment } from '@env/environment';
export { AppPrerenderModule } from './app/app.prerender.module';

if (environment.production) {
  enableProdMode();
}

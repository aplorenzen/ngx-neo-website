import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgsRevealModule } from 'ng-scrollreveal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NotFoundComponent } from './core/not-found/not-found.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition(
      // this is just the name of our application
      // configured in angular-cli.json
      { appId: 'ngx-neo-website' }
    ),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    NgsRevealModule.forRoot(),
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollToModule.forRoot()
  ],
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchHomeComponent } from './search-home/search-home.component';
import { ResultsViewComponent } from './results-view/results-view.component';
import { KeywordValidationComponent } from './keyword-validation/keyword-validation.component';
import { PriceValidationComponent } from './price-validation/price-validation.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchHomeComponent,
    ResultsViewComponent,
    KeywordValidationComponent,
    PriceValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchHomeComponent } from './search-home/search-home.component';
import { ResultsViewComponent } from './results-view/results-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchHomeComponent,
    ResultsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

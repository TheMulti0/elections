import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './app.material.module.exports';
import { ResultsComponent } from './components/results/results.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    NgxChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

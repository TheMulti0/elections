import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './shared/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

const modules = [
  CommonModule,
  LayoutModule,
  MaterialModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule
];

@NgModule({
  declarations: [
  ],
  imports: modules,
  exports: modules
})
export class SharedModule { }

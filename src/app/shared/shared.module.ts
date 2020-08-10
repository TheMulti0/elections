import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
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
    LayoutComponent
  ],
  imports: modules,
  exports: modules
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';

const modules = [
  CommonModule,
  RouterModule
];

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: modules,
  exports: modules
})
export class SharedModule { }

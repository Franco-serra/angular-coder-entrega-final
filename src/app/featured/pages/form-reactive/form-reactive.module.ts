import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormReactiveComponent } from './form-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormReactiveRoutingModule } from './form-reactive-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [FormReactiveComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormReactiveRoutingModule,
    SharedModule
  ],
  exports: [FormReactiveComponent]
})
export class FormReactiveModule { } 
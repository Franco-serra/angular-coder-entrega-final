import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './student-form-list/students-list/students-list.component';
import { StudentsFormComponent } from './student-form-list/students-form/students-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentsFormComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class StudentsModule { } 
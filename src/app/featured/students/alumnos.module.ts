import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';

import { AlumnosComponent } from './alumnos.component';
import { StudentsListComponent } from './student-form-list/students-list/students-list.component';
import { StudentsFormComponent } from './student-form-list/students-form/students-form.component';

@NgModule({
  declarations: [
    AlumnosComponent,
    StudentsListComponent,
    StudentsFormComponent,
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule,
  ],
  exports: [
    AlumnosComponent,
    StudentsListComponent,
    StudentsFormComponent
  ]
})
export class AlumnosModule { }
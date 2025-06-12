import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './student-form-list/students-list/students-list.component';
import { StudentsFormComponent } from './student-form-list/students-form/students-form.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent,
    title: 'Lista de Estudiantes'
  },
  {
    path: 'new',
    component: StudentsFormComponent,
    title: 'Nuevo Estudiante'
  },
  {
    path: ':id/edit',
    component: StudentsFormComponent,
    title: 'Editar Estudiante'
  },
  {
    path: ':id/view',
    component: StudentsFormComponent,
    title: 'Ver Estudiante'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { } 
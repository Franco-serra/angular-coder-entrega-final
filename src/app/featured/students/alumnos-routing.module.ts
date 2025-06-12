import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';
import { StudentsFormComponent } from './student-form-list/students-form/students-form.component';

const routes: Routes = [
  { path: '', component: AlumnosComponent, data: { title: 'Estudiantes' } },
  { path: ':id/edit', component: StudentsFormComponent, data: { title: 'Editar Estudiante' } },
  { path: ':id/view', component: StudentsFormComponent, data: { title: 'Ver Estudiante' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }

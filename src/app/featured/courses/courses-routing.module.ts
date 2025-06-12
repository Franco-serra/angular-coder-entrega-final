import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

const routes: Routes = [
  { path: '', component: CoursesListComponent, data: { title: 'Cursos' } },
  { path: 'new', component: CourseFormComponent, data: { title: 'Nuevo Curso' } },
  { path: ':id/edit', component: CourseFormComponent, data: { title: 'Editar Curso' } },
  { path: ':id/view', component: CourseDetailsComponent, data: { title: 'Detalles del Curso' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { } 
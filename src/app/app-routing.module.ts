import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./featured/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: { title: 'Dashboard' }
  },
  {
    path: 'students',
    loadChildren: () => import('./featured/students/students.module').then(m => m.StudentsModule),
    canActivate: [AuthGuard],
    data: { title: 'Estudiantes' }
  },
  {
    path: 'courses',
    loadChildren: () => import('./featured/courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard],
    data: { title: 'Cursos' }
  },
  {
    path: 'users',
    loadChildren: () => import('./featured/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
    data: { title: 'Usuarios' }
  },
  {
    path: 'auth',
    loadChildren: () => import('./featured/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



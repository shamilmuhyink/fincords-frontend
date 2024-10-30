import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'dashboard',
      canActivate: [authGuard],
      component: DashboardComponent
    }
    // { 
    //     path: 'auth', 
    //     // component: AuthComponent 
    // },
    // // Lazy loaded module for authenticated routes
    // {
    //     path: 'app',
    //     canActivate: [authGuard],
    //     children: [
    //         {
    //             path: 'dashboard',
    //             // component: DashboardComponent
    //         },
    //         {
    //             path: 'profile',
    //             // component: ProfileComponent
    //         },
    //         {
    //             path: 'admin',
    //             canActivate: [() => roleGuard(['ADMIN'])()],
    //             // loadChildren: () => import('./modules/admin/admin.module')
    //             //     .then(m => m.AdminModule)
    //         },
    //         {
    //             path: 'reports',
    //             canActivate: [() => roleGuard(['MANAGER', 'ADMIN'])()],
    //             // loadChildren: () => import('./modules/reports/reports.module')
    //             //     .then(m => m.ReportsModule)
    //         }
    //     ]
    // },
    // { 
    //     path: 'unauthorized', 
    //     // component: UnauthorizedComponent 
    // },
    // { 
    //     path: '**', 
    //     redirectTo: '/auth' 
    // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

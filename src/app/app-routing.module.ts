import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

/*
{
      path: 'dashboard',
      pathMatch: 'full',
      redirectTo: 'dashboard/59c3ecb56f197830243f9961'
    }
    */

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'login',
      loadChildren: 'app/pages/login/login.module#LoginModule'
    }, {
      path: 'home',
      component: HomeComponent
    }, {
      path: 'dashboard',
      component: DashboardComponent
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

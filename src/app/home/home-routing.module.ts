import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '@app/core';
import { ChuckComponent } from '@app/home/chuck/chuck.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: ChuckComponent }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }

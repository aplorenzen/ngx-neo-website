import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Route } from '@app/core';
import { HomeComponent } from '@app/home/home.component';
import { NotFoundComponent } from '@app/core/not-found/not-found.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }

  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }

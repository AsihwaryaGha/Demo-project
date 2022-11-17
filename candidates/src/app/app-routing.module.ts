import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {

  //   path:'',
  //   redirectTo:'candidates',
  //   pathMatch:'full'
  // },
  {
    component : CandidatesComponent,
    path:'candidates'
  },
  {
    component : LoginComponent,
    path:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

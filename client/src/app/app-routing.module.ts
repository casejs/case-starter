import { Route } from '@angular/compiler/src/core'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { abcRoutes, AuthGuard } from '@case-app/angular-library'
import { HomeComponent } from './pages/home/home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  ...(abcRoutes as Route[]),
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

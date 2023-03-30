import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { caseRoutes, AuthGuard } from '@casejs/angular-library'
import { HomeComponent } from './pages/home/home.component'
import { userRoutes } from './resources/user/user.routes'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  ...userRoutes,
  ...(caseRoutes as Routes)
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { CaseModule } from '@case-app/angular-library'
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { UserCreateEditComponent } from './resources/user/user-create-edit.component'
import { UserListComponent } from './resources/user/user-list.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserCreateEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CaseModule.forRoot({
      baseUrl: environment.baseUrl,
      apiBaseUrl: environment.apiBaseUrl,
      storagePath: environment.storagePath,
      appName: environment.appName,
      tokenName: environment.tokenName,
      tokenAllowedDomains: environment.tokenAllowedDomains,
      production: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

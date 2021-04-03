import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppRoutes } from './constants/app-routes'
import { HomeComponent } from './pages/home/home.component'
import { AboutComponent } from './pages/about/about.component'
import { ServicesComponent } from './pages/services/services.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: AppRoutes.home,
        pathMatch: 'full'
      },
      {
        path: AppRoutes.home,
        component: HomeComponent
      },
      {
        path: AppRoutes.about,
        component: AboutComponent
      },
      {
        path: AppRoutes.services,
        component: ServicesComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

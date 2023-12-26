import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HighwaysPageComponent } from './pages/highways-page/highways-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'highways', component: HighwaysPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

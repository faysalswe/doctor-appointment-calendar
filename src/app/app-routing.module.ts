import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentCalendarComponent } from './pages/appointment-calendar/appointment-calendar.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'month/:month',
    pathMatch: 'full'
  },
  {
    path: 'month/:month',
    component: AppointmentCalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

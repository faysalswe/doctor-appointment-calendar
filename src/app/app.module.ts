import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

@NgModule({
  declarations: [		
    AppComponent,
      AppointmentCalendarComponent,
      NewAppointmentComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

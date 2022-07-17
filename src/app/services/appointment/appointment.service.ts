import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NewAppointment } from 'src/app/models/new-appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments: NewAppointment[] = [];
  isMonthlyAppointmentsChange: Subject<number> = new Subject();

  constructor() { 
    const data = localStorage.getItem('PERSIST_DATA');

    if(data !== null)
      this.appointments = JSON.parse(data);
  }

  createAppointment(newAppointment: NewAppointment) {
    console.log(newAppointment);
    this.appointments.push(newAppointment);
    this.isMonthlyAppointmentsChange.next(newAppointment.date.getMonth() + 1);
    localStorage.setItem('PERSIST_DATA', JSON.stringify(this.appointments));
    
  }

  getAppointments(month: number) {
    console.log(this.appointments);
    return this.appointments.filter(x => (new Date(x.date).getMonth() + 1) === month);
  }
}

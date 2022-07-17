import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'; 
import { MonthNames } from '../../constants/app.enums';
import { MatDialog } from '@angular/material/dialog';
import { MonthDay } from 'src/app/models/month-day';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { ModalNewAppointmentComponent } from 'src/app/dialogs/modal-new-appointment/modal-new-appointment.component';
import { NewAppointment } from './../../models/new-appointment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css']
})
export class AppointmentCalendarComponent implements OnInit {

  monthDays: MonthDay[] = [];
  selectedMonth = new Date().getMonth() + 1;
  subscription: any;

  monthNames = Object.keys(MonthNames)
  .filter((v) => isNaN(Number(v)))
  .map((name) => {
    return {
      key: MonthNames[name as keyof typeof MonthNames],
      name,
    };
  });

  constructor(
    public dialog: MatDialog,
    private appointmentService: AppointmentService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    const param = this.activatedRoute.snapshot.paramMap.get('month')
    if (param) 
      this.selectedMonth = parseInt(param, 10);

    this.location.replaceState(`/month/${this.selectedMonth}`);
  }

  ngOnInit() {
    // for initial
    this.setAppointments();

    // new appointment created
    this.subscription = this.appointmentService.isMonthlyAppointmentsChange
    .subscribe((res: any) => {
      if (res === this.selectedMonth) {
        this.setAppointments();
      }
    });

    console.log(this.monthDays);
    
  }

  setAppointments() {
    this.getAllDaysInMonth(this.selectedMonth);
    const appointments = this.appointmentService.getAppointments(this.selectedMonth);

    for (let index = 0; index < this.monthDays.length; index++) {
      const element = this.monthDays[index];
      
      this.monthDays[index].appointments = appointments
        .filter(x => new Date(x.date).getDate() === element.day);
    }
  }

  openNewAppointmentModal() {
    this.dialog.open(ModalNewAppointmentComponent, {
      width: '600px',
      data: { isView : false }
    });
  }

  monthSelectionChange() {
    this.setAppointments();
    this.location.replaceState(`/month/${this.selectedMonth}`);
  }

  getAllDaysInMonth(month: number) {
    month--;
    this.monthDays = [];
    const date = new Date(2022, month, 1);

    while (date.getMonth() === month) {
      this.monthDays.push({ 
        day: date.getDate(),
        name: date.toLocaleString('en-us', { weekday: 'long' }), 
        appointments: []
      });
      date.setDate(date.getDate() + 1);
    }
  }

  showAppointmentDetail(appointment: NewAppointment) {
    this.dialog.open(ModalNewAppointmentComponent, {
      width: '600px',
      data: { isView : true, appointment: appointment }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

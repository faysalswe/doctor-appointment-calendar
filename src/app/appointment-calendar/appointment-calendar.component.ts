import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css']
})
export class AppointmentCalendarComponent implements OnInit {

  monthDays: MonthDay[] = [];

  constructor() {
    this.getAllDaysInMonth(2022, 7);
  }

  ngOnInit() {
  }

  getAllDaysInMonth(year: number, month: number) {
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      this.monthDays.push({ Date: date.getDate(), Name: date.toLocaleString('en-us', {weekday: 'long'}) });
      date.setDate(date.getDate() + 1);
    }
  }

}

export interface MonthDay {
  Name: string;
  Date: number;
}

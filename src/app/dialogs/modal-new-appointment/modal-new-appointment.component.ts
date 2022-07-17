import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewAppointmentModalData } from 'src/app/models/new-appointment-modal-data';
import { AppointmentService } from '../../services/appointment/appointment.service';

@Component({
  selector: 'app-modal-new-appointment',
  templateUrl: './modal-new-appointment.component.html',
  styleUrls: ['./modal-new-appointment.component.css']
})
export class ModalNewAppointmentComponent implements OnInit {

  createAppointmentFrom = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(40)]],
    lastName: ['', [Validators.required, Validators.maxLength(40)]],
    email: ['', [Validators.required, Validators.email]],
    gender: [''],
    age: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewAppointmentModalData,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<ModalNewAppointmentComponent>,
  ) { 
    if (data.isView) {
      this.createAppointmentFrom.patchValue(data.appointment);
      this.createAppointmentFrom.disable();
    }
  }

  ngOnInit() { }

  closeModal() {
    this.dialogRef.close();
  }

  saveAppointment() {
    this.appointmentService.createAppointment(this.createAppointmentFrom.value);
    this.closeModal();
  }

}

import { Component, OnInit } from '@angular/core';
import { Appointment } from '../Appointment';
import { AppointmentsService } from '../appointments.service';




@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})


export class AppointmentComponent implements OnInit {
  public successMsg!: string;
  public errorMsg!: string;
  public appointmentDateTime!: string;
  public name!: string;
  public email!: string;

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit() {
  }

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.appointmentDateTime, this.name, this.email)
      .subscribe((createdAppointment: Appointment) => {
        this.appointmentDateTime = '';
        this.name = '';
        this.email = '';
        const appointmentDateTime = new Date(createdAppointment.appointmentDateTime).toString();
        this.successMsg = `Booked successfully for ${appointmentDateTime}`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });

  }


}


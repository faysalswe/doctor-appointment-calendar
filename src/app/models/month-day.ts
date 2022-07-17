
import { NewAppointment } from './new-appointment';

export interface MonthDay {
  name: string;
  day: number;
  appointments: NewAppointment[];
}
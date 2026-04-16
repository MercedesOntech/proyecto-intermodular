export interface Seat {
  id: number;
  row: string;
  number: number;
  type: 'normal' | 'vip' | 'disabled';
  isAvailable: boolean;
  price: number;
}

export interface ScheduleTime {
  id: number;
  time: string;
  type: '2D' | '3D';
  availableSeats: Seat[];
}

export interface DaySchedule {
  day: string;
  date: Date;
  schedules: ScheduleTime[];
}
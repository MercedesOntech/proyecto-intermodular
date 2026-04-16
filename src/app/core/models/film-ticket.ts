import { Film } from './film';
import { User } from './user';
import { Schedule } from './film';

export interface FilmTicket {
  id: number;
  dateTicket: Date;
  user_id: number;
  user?: User;
  film_id: number;
  film?: Film;
  schedules?: Schedule[];
  chairs?: Chair[];
}

export interface Chair {
  id: number;
  film_ticket_id: number;
  chair_type_id: number;
  chairType?: ChairType;
  row?: string;
  number?: number;
}

export interface ChairType {
  id: number;
  type: string; // 'vip', 'disabled', 'normal'
}

export interface SeatReservation {
  filmId: number;
  scheduleId: number;
  filmTicketId?: number;
  chairs: ChairReservation[];
}

export interface ChairReservation {
  chairTypeId: number;
  row: string;
  number: number;
  price: number;
}

export interface FilmPurchaseRequest {
  filmId: number;
  scheduleId: number;
  chairs: ChairReservation[];
  tarjetId: number;
  totalAmount: number;
}
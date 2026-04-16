export interface Film {
  id: number;
  name: string;
  description: string;
  releaseDate: Date;
  duration: string;
  imageUrl: string;
  trailerUrl: string;
  room_id: number;
  room?: Room;
  film_type_id: number;
  filmType?: FilmType;
  genres?: Genre[];
  directors?: Director[];
  actors?: Actor[];
  schedules?: Schedule[];
}

export interface FilmType {
  id: number;
  type: string;
}

export interface Room {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  type: string;
}

export interface Director {
  id: number;
  name: string;
}

export interface Actor {
  id: number;
  name: string;
}

export interface Schedule {
  id: number;
  timeSchedule: string;
}

export interface RegisterFilm {
  name: string;
  description: string;
  releaseDate: Date;
  duration: string;
  imageUrl: string;
  trailerUrl: string;
  room_id: number;
  film_type_id: number;
  genre_ids: number[];
  director_ids: number[];
  actor_ids: number[];
  schedule_ids: number[];
}
export interface CancelReservationDto {
    reserv_user: number;
    reserv_date: string;
    studyroom: number;
    building: string;
    reserv_time: number[];
}
  
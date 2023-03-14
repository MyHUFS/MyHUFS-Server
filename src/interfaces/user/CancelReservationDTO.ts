export interface CancelReservationDto {
    user_id: number;
    building: string;
    date: string;
    studyroom: number;
    time: number[];
}
  
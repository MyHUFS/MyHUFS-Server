export interface CreateReservationDto {
    user_id : number;
    building : string;
    studyroom : number; 
    date : string;
    time : number[];
}
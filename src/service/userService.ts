import { CancelReservationDto } from './../interfaces/user/CancelReservationDTO';
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getReservation = async ( user_id: number ) => {

}

const cancelReservation = async ( cancelReservationDto : CancelReservationDto ) => {

}

const userService = {
    getReservation,
    cancelReservation
};

export default userService;
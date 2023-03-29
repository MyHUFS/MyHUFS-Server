import { CancelReservationDto } from './../interfaces/user/CancelReservationDTO';
import { PrismaClient } from "@prisma/client"
import { sc } from '../constants';

const prisma = new PrismaClient();

const getReservation = async ( user_id: number ) => {
    const data = await prisma.reservation.findMany({
        where: {
            reserv_user: user_id,
        }
    })

    return data
}

const cancelReservation = async ( cancelReservationDto : CancelReservationDto ) => {
    const reserv_id = await prisma.reservation.findFirst({
        where: {
            ...cancelReservationDto,
        }
    })

    if (!reserv_id) {
        return sc.NOT_FOUND;
    }

    return await prisma.reservation.delete({
        where: {
            reservation_pk: reserv_id.reservation_pk
        }
    })

}

const userService = {
    getReservation,
    cancelReservation
};

export default userService;
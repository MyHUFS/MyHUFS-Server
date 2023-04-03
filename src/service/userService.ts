import { CancelReservationDto } from './../interfaces/user/CancelReservationDTO';
import { PrismaClient } from "@prisma/client"
import { sc } from '../constants';
import { timeCalculator, timeCancel } from '../middlewares.ts/time';
import { findBuilding_kor } from '../middlewares.ts/findBuilding';

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
    const building = await findBuilding_kor(cancelReservationDto.building);
    const time = await timeCalculator(cancelReservationDto.reserv_time);
    const reserv_id = await prisma.reservation.findFirst({
        where: {
            building,
            reserv_date : cancelReservationDto.reserv_date,
            reserv_user: cancelReservationDto.reserv_user,
            reserv_time: time,
            studyroom: cancelReservationDto.studyroom
        }
    })

    if (!reserv_id) {
        return sc.NOT_FOUND;
    }

    const cancel = await prisma.reservation.delete({
        where: {
            reservation_pk: reserv_id.reservation_pk
        }
    })
    const year = parseInt(reserv_id.reserv_date.slice(0,4));
    const month = parseInt(reserv_id.reserv_date.slice(5,7));
    const day = parseInt(reserv_id.reserv_date.slice(8,10));
    const reserv_cnt = await prisma.reservationcnt.findFirst({
        where: {
            year,
            month,
            day,
            building: cancelReservationDto.building,
            studyroom: cancelReservationDto.studyroom,
        }
    })
    if (reserv_cnt){
        const total_update = await prisma.reservationcnt.update({
            where: {
                reserv_cnt_pk: reserv_cnt.reserv_cnt_pk
            },
            data: {
                time: "x" + await timeCancel(reserv_id.reserv_time, reserv_cnt.time) 
            }
        })
    }
    else {
        return sc.NOT_FOUND
    }

    return cancel
}

const userService = {
    getReservation,
    cancelReservation
};

export default userService;
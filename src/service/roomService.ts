import { CreateReservationDto } from './../interfaces/room/CreateReservationDTO.ts';
import { PrismaClient } from "@prisma/client"
import { findStudyroom } from '../middlewares.ts/findStudyroom';
import { findBuilding_eng, findBuilding_kor } from '../middlewares.ts/findBuildingID';
import { timeCalculator } from '../middlewares.ts/time';

const prisma = new PrismaClient();

const geAllStudyroom = async () => {
    const data = await prisma.building.findMany();
    const room = data.map((e) => {
        return e.building_name
    })
    return room
}

const getBuilding = async (building_name: string) => {
    const building = await findBuilding_eng(building_name);
    const data = await prisma.reservation.findMany({
        where: {
            building,
        }
    });
    return data;
}

const getStudyroom = async () => {

}

const createReservation = async (createReservationDto : CreateReservationDto) => {
    const time = await timeCalculator(createReservationDto.time);
    const studyroom = await findStudyroom(createReservationDto.building, createReservationDto.studyroom);
    const building_id = await findBuilding_kor(createReservationDto.building)

    const data = await prisma.reservation.create({
        data: {
            reserv_user : createReservationDto.user_id,
            building : building_id,
            studyroom : studyroom, 
            reserv_date : createReservationDto.date,
            reserv_time : time,
        }
    })

    const success = await prisma.reservation.findFirst({
        where:{
            reserv_user : createReservationDto.user_id,
            building : building_id,
            studyroom : studyroom, 
            reserv_date : createReservationDto.date,
            reserv_time : time,
        }
    })
    return success;
}

const userService = {
    getBuilding,
    getStudyroom,
    geAllStudyroom,
    createReservation
};

export default userService;
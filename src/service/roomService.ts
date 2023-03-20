import { BuildingResponseDto } from './../interfaces/room/BuildingResponseDTO';
import { CreateReservationDto } from './../interfaces/room/CreateReservationDTO.ts';
import { PrismaClient } from "@prisma/client"
import { findStudyroom } from '../middlewares.ts/findStudyroom';
import { findBuilding_eng, findBuilding_kor, findBuilding_name, findMonthly } from '../middlewares.ts/findBuildingID';
import { timeCalculator } from '../middlewares.ts/time';

const prisma = new PrismaClient();

const geAllStudyroom = async () => {
    const data = await prisma.building.findMany();
    const room = data.map((e) => {
        return e.building_name
    })
    return room
}

const getBuilding = async (building_name: string, month: number) => {
    const building_id = await findBuilding_eng(building_name)
    const building = await findBuilding_name(building_id);
    const total = 0
    const count = await findMonthly(month, building);
    const data : BuildingResponseDto = {
        building,
        total,
        reservation: count
    }
    
    return data;
}

const getStudyroom = async (building_name: string) => {
    const building = await findBuilding_eng(building_name);
    const data = await prisma.reservation.findMany({
        where: {
            building,
        }
    });
    return data
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
    const year = parseInt(createReservationDto.date.slice(0,4));
    const month = parseInt(createReservationDto.date.slice(5,7));
    const day = parseInt(createReservationDto.date.slice(8,10));
    const cnt = await prisma.reservationcnt.findFirst({
        where: {
            year,
            month,
            day,
            building: createReservationDto.building,
        }
    })

    if (cnt) {
        const real_cnt = cnt.cnt + createReservationDto.time.length;
        await prisma.reservationcnt.update({
            where: {
                reserv_cnt_pk: cnt.reserv_cnt_pk,
            },
            data: {
                cnt: real_cnt
            }
        })
    } else {
        await prisma.reservationcnt.create({
            data: {
                year,
                month,
                day,
                building : createReservationDto.building,
            }
        })
    }

    const success = {
        building: createReservationDto.building,
        studyroom : createReservationDto.studyroom,
        reserv_date : createReservationDto.date,
        reserv_time : time,
    }
    
    return [data, success];
}

const userService = {
    getBuilding,
    getStudyroom,
    geAllStudyroom,
    createReservation
};

export default userService;
import { BuildingResponseDto } from './../interfaces/room/BuildingResponseDTO';
import { CreateReservationDto } from './../interfaces/room/CreateReservationDTO.ts';
import { PrismaClient } from "@prisma/client"
import { findStudyroom } from '../middlewares.ts/findStudyroom';
import { findBuilding_eng, findBuilding_kor, findBuilding_name, findMonthly } from '../middlewares.ts/findBuilding';
import { timeAnd, timeCalculator, timeOr } from '../middlewares.ts/time';
import { sc } from '../constants';

const prisma = new PrismaClient();

const geAllStudyroom = async () => {
    const data = await prisma.building.findMany();
    const room = data.map((e) => {
        return e.building_name
    })
    return room
}

const getBuilding = async (building_name: string, year: number, month: number) => {
    const building_id = await findBuilding_eng(building_name)
    const building = await findBuilding_name(building_id);
    const total = 0
    const count = await findMonthly(year, month, building);
    const data : BuildingResponseDto = {
        building,
        total,
        reservation: count
    }
    
    return data;
}

const getStudyroom = async (building_name: string, year: number, month: number, day: number) => {
    const building_key = await findBuilding_eng(building_name);
    const building = await findBuilding_name(building_key);
    const data = await prisma.reservationcnt.findMany({
        where: {
            building,
            year,
            month,
            day,
        },
        select: {
            studyroom: true,
            time: true,
        },
        orderBy: [{
            studyroom: 'asc'
        }]

    });

    return data
}

const createReservation = async (createReservationDto : CreateReservationDto) => {
    const time = await timeCalculator(createReservationDto.time);
    const studyroom = await findStudyroom(createReservationDto.building, createReservationDto.studyroom);
    const building_id = await findBuilding_kor(createReservationDto.building)

    const year = parseInt(createReservationDto.date.slice(0,4));
    const month = parseInt(createReservationDto.date.slice(5,7));
    const day = parseInt(createReservationDto.date.slice(8,10));
    const cnt = await prisma.reservationcnt.findFirst({
        where: {
            year,
            month,
            day,
            building: createReservationDto.building,
            studyroom: createReservationDto.studyroom
        }
    })

    if (cnt) {
        const reserved_time = cnt.time.slice(1, cnt.time.length-1);
        const reserve_time = time.slice(1, cnt.time.length-1);
        const can_reserve = await timeAnd(reserved_time, reserve_time)
        if (!can_reserve){
            return sc.BAD_REQUEST
        } else {
            const prev_time = await timeOr(reserved_time ,reserve_time);
            const final_time = "x"+ prev_time;
            console.log(final_time)
            await prisma.reservationcnt.update({
                where: {
                    reserv_cnt_pk: cnt.reserv_cnt_pk
                },
                data: {
                    time: final_time
                }
            })
        }
    } else {
        await prisma.reservationcnt.create({
            data: {
                year,
                month,
                day,
                time,
                building : createReservationDto.building,
                studyroom: createReservationDto.studyroom,
            }
        })
    }
    

    const data = await prisma.reservation.create({
        data: {
            reserv_user : createReservationDto.user_id,
            building : building_id,
            studyroom : studyroom, 
            reserv_date : createReservationDto.date,
            reserv_time : time,
        }
    })


    const success = {
        building: createReservationDto.building,
        studyroom : createReservationDto.studyroom,
        reserv_date : createReservationDto.date,
        reserv_time : time,
    }
    
    return success;
}

const userService = {
    getBuilding,
    getStudyroom,
    geAllStudyroom,
    createReservation
};

export default userService;
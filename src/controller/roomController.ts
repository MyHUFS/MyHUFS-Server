import { CreateReservationDto } from './../interfaces/room/CreateReservationDTO.ts';
import { rm, sc } from "../constants"
import { fail, success } from "../constants/response"
import {Request, Response } from "express";
import roomService from "../service/roomService";
import { userService } from '../service';

const getAllStudyroom = async (req: Request, res: Response) => {
    const building = await roomService.geAllStudyroom();
    return res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_STUDYROOM_SUCCESS, building));
}

const getBuilding = async (req: Request, res: Response) => {
    const { building } = req.params;
    const { year, month } = req.body;
    const data = await roomService.getBuilding( building, year, month );
    return res.status(sc.OK).send(success(sc.OK,rm.READ_STUDYROOM_SUCCESS, data));
}


const getStudyroom = async (req: Request, res: Response) => {
    const { building } = req.params;
    const { year, month, day } = req.body;
    const data = await roomService.getStudyroom( building, year, month, day );
    return res.status(sc.OK).send(success(sc.OK,rm.READ_STUDYROOM_SUCCESS, data));
}

const createReservation = async (req: Request, res: Response) => {
    const createReservationDto : CreateReservationDto = req.body;
    const data = await roomService.createReservation( createReservationDto );
    if (data === sc.BAD_REQUEST){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.RESERVATION_FAIL))
    }

    return res.status(sc.OK).send(success(sc.OK,rm.RESERVATION_SUCCESS, data));
}


const roomController = {
    getBuilding,
    getStudyroom,
    getAllStudyroom,
    createReservation
};

export default roomController;
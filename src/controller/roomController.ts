import { rm, sc } from "../constants"
import { fail, success } from "../constants/response"
import {Request, Response } from "express";
import roomService from "../service/roomService";
import { userService } from '../service';

const getBuilding = async (req: Request, res: Response) => {


}

const getAllStudyroom = async (req: Request, res: Response) => {
    const building = await roomService.geAllStudyroom();
    return res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_STUDYROOM_SUCCESS, building));
}

const getStudyroom = async (req: Request, res: Response) => {

}

const createReservation = async (req: Request, res: Response) => {

}


const roomController = {
    getBuilding,
    getStudyroom,
    getAllStudyroom,
    createReservation
};

export default roomController;
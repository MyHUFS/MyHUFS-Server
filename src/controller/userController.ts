import { CancelReservationDto } from './../interfaces/user/CancelReservationDTO';
import { rm, sc } from "../constants"
import { Request, Response } from "express";
import { fail, success } from "../constants/response"
import roomService from "../service/roomService";
import { userService } from '../service';

const getReservation = async (req: Request, res: Response) => {
    const { user_id } = req.body;
    const reservation = await userService.getReservation(user_id);

    if (!reservation){
        return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.INVALID_USER));
    }

    return res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_STUDYROOM_SUCCESS));
}

const cancelReservation = async (req: Request, res: Response) => {
    const cancelReservationDto :CancelReservationDto = req.body;
    // const cancel = await userService.cancelReservation(cancelReservationDto);
    const cancel = 0;
    if (!cancel){
        return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.INVALID_USER));
    }

    return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_USER_SUCCESS));
}

const userController = {
    getReservation,
    cancelReservation
};

export default userController;
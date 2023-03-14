import { rm, sc } from "../constants"
import { fail, success } from "../constants/response"
import roomService from "../service/roomService";
import { userService } from '../service';

const getReservation = async (req: Request, res: Response) => {

}

const cancelReservation = async (req: Request, res: Response) => {

}

const userController = {
    getReservation,
    cancelReservation
};

export default userController;
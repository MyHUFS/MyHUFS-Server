import { rm, sc } from "../constants"
import { fail, success } from "../constants/response"
import roomService from "../service/roomService";
import { userService } from '../service';

const getBuilding = async (req: Request, res: Response) => {

}

const geAllStudyroom = async (req: Request, res: Response) => {

}

const getStudyroom = async (req: Request, res: Response) => {

}

const createReservation = async (req: Request, res: Response) => {

}


const roomController = {
    getBuilding,
    getStudyroom,
    geAllStudyroom,
    createReservation
};

export default roomController;
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getBuilding = async (req: Request, res: Response) => {

}

const geAllStudyroom = async (req: Request, res: Response) => {

}

const getStudyroom = async (req: Request, res: Response) => {

}

const createReservation = async (req: Request, res: Response) => {

}

const userService = {
    getBuilding,
    getStudyroom,
    geAllStudyroom,
    createReservation
};

export default userService;
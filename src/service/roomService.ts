import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getBuilding = async () => {

}

const geAllStudyroom = async () => {
    const data = await prisma.building.findMany();
    const room = data.map((e) => {
        return e.building_name
    })
    return room
}

const getStudyroom = async () => {

}

const createReservation = async () => {

}

const userService = {
    getBuilding,
    getStudyroom,
    geAllStudyroom,
    createReservation
};

export default userService;
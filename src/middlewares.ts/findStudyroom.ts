import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findStudyroom = async (building: string, room: number) => {
    const room_id = await prisma.studyroom.findFirst({
        where: {
            building: building,
            studyroom_num: room,
        }
    })
    if (!room_id) return 0;
    return room_id.studyroom_pk
}

const findStudyroomNum = async (room: number) => {
    const room_id = await prisma.studyroom.findFirst({
        where: {
            studyroom_pk : room,
        }
    })
    if (!room_id) return 0;
    return room_id.studyroom_num;
}

export {
    findStudyroom,
    findStudyroomNum
}
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

export {
    findStudyroom,
}
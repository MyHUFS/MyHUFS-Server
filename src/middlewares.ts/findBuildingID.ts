import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findBuilding_eng =  async (building: string) => {
    const buildings = ["baek", "science", "engineer", "language", "liberal", "refine"];
    console.log("building", buildings.indexOf(building)+1)
    return buildings.indexOf(building)+1
}

const findBuilding_kor =  async (building: string) => {
    const buildings = ["백년관", "자연과학관", "공학관", "어문관", "인문경상관", "교양관"];
    console.log("building", buildings.indexOf(building)+1)
    return buildings.indexOf(building)+1
}

const findBuilding_name = async (id: number) => {
    const buildings = ["백년관", "자연과학관", "공학관", "어문관", "인문경상관", "교양관"];
    return buildings[id-1];
}

const createZeroArray = function(len : number) {
    return new Array(len).fill(0);
  }

const findMonthly = async (month: number, building: string) => {

    const reservation = await prisma.reservationcnt.findMany({
        where: {
            month,
            building,
        }
    })
    console.log(reservation)
    let reserv_cnt : number[] = createZeroArray(31)
    reservation.forEach((e) => {
        reserv_cnt[e.day] = e.cnt
    })
    return reserv_cnt
}

export {
    findBuilding_eng,
    findBuilding_kor,
    findBuilding_name,
    findMonthly,
}
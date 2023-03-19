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

export {
    findBuilding_eng,
    findBuilding_kor
}
const timeCalculator  = async (time_list : Array<number>) => {
    const time = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
    const last = time_list.length - 1
    let start_time = time[Math.floor((time_list[0]-1)/2)]
    let end_time = time[Math.floor(time_list[last]/2)]

    if (time_list[0] % 2 == 1) {
        start_time += ":00 ~ "
    } else{
        start_time += ":30 ~ "
    }

    if (time_list[last] % 2 == 1) {
        end_time += ":30"
    } else {
        end_time += ":00"
    }

    return start_time + end_time

}

export {
    timeCalculator,
}
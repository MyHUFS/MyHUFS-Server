const createZeroArray = function(len : number) {
    return new Array(len).fill(0);
  }

const timeCalculator  = async (time_list : Array<number>) => {
    const time = createZeroArray(17);
    time_list.forEach((e) => {
        time[e-1] = 1
    })

    const success = "x" + time.join('');

    return success

}

const timeAnd = async (time_1: string, time_2: string) => {
    const time_first = time_1.split('')
    const time_second = time_2.split('')
    for (let i=0; i<time_first.length; i++) {
        const t1 = parseInt(time_first[i])
        const t2 = parseInt(time_second[i])
        if((t1&t2) != 0) return false
    };
    return true
}

const timeOr = async (time_1: string, time_2: string) => {
    const time_first = time_1.split('')
    const time_second = time_2.split('')
    console.log(time_first, time_second)
    let list : number[] = []
    for (let i=0; i<time_first.length; i++) {
        const t1 = parseInt(time_first[i])
        const t2 = parseInt(time_second[i])
        list.push(t1|t2)
    };

    return list.join('')
}

const timeCancel = async (time_1: string, time_2: string) => {
    const time_first = time_1.split('')
    const time_second = time_2.split('')
    console.log(time_first, time_second)
    let list : number[] = []
    for (let i=0; i<time_first.length; i++) {
        const t1 = parseInt(time_first[i]);
        const t2 = parseInt(time_second[i]);
        if (t1&t2) list.push(0);
        else list.push(t1|t2)
    };

    return list.join('')
}

export {
    timeCalculator,
    timeAnd,
    timeOr,
    timeCancel,
}
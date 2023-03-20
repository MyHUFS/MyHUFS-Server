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

export {
    timeCalculator,
}
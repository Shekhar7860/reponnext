export const hhmmToampm = (hhmm) => {
    let hhmmArr = String(hhmm).split(":")
    // 00:30
    let time = ""
    if (hhmmArr.length === 2) {
        let hhNumber = Number(hhmmArr[0])
        let mmNumber = Number(hhmmArr[1])
        if (hhNumber > 11) {
            if (hhNumber > 12) {
                if ((hhNumber - 12) > 9) {
                    time = `${hhNumber - 12}:${(mmNumber >9) ? mmNumber : `0${mmNumber}`} pm`
                } else {
                    time = `0${hhNumber - 12}:${(mmNumber >9) ? mmNumber : `0${mmNumber}`} pm`
                }
            } else {
                time = `${hhNumber}:${(mmNumber >9) ? mmNumber : `0${mmNumber}`} pm`
            }
        } else {
            if (hhNumber == 0) {
                time = `12:${(mmNumber >9) ? mmNumber : `0${mmNumber}`} am`
            } else {
                if (hhNumber > 9) {
                    time = `${hhNumber}:${(mmNumber >9) ? mmNumber : `0${mmNumber}`} am`
                } else {
                    time = `0${hhNumber}:${(mmNumber >9) ? mmNumber : `0${mmNumber}`} am`
                }
            }
        }
        return time
        // return (hhNumber > 11) ? `${(hhNumber > 9) ? (hhNumber === 12) ? hhNumber : hhNumber - 12 : `${hhNumber}`}:${(mmNumber > 9) ? mmNumber : `0${mmNumber}`} pm` : `${(hhNumber > 9) ? hhNumber : `${hhNumber}`}:${(mmNumber > 9) ? mmNumber : `0${mmNumber}`} am`
    } else {
        let hhNumber = Number(hhmm)
        return (hhNumber > 11) ? `${((hhNumber - 12) > 9) ? (hhNumber - 12) : `0${(hhNumber - 12)}`} pm` : `${((hhNumber - 12) > 9) ? (hhNumber - 12) : `0${(hhNumber - 12)}`} am`
    }
}

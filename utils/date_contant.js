const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const dateFormatter = (timestamp) => {
    var today = new Date(timestamp);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = "" + dd + "/" + mm + "/" + yyyy;
    return today;
}

const getTodayInStr = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    var today = `${month[mm]} ${dd}, ${yyyy}`;
    return today;
}
const getNextDayInStr = () => {
    var today = new Date();
    var dd = today.getDate() + 1;
    var mm = today.getMonth()

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    var today = `${month[mm]} ${dd}, ${yyyy}`;
    return today;
}
export const manamusuDateFormatter = (timestamp) => {
    var today = new Date(timestamp);
    var dd = today.getDate();
    var mm = today.getMonth()

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    var today = `${month[mm]} ${dd}, ${yyyy}`;
    return (today == getTodayInStr()) ? "Today" : (today == getNextDayInStr()) ? "Tomorrow" : today;
}
export const dateFormatterByDate = (timestamp) => {
    var today = new Date(timestamp);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = "" + dd + "/" + mm + "/" + yyyy;
    return today;
}
export const reportsDateFormatter = (timestamp) => {
    var today = new Date(timestamp);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = "" + dd + "-" + mm + "-" + yyyy;
    return today;
}
export const timeFormatter = (timestamp) => {
    var today = new Date(timestamp);
    var hh = today.getHours();
    var mm = today.getMinutes() + 1; //January is 0!

    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return `${hh}:${mm}`;
}

export const getMaxMonthSearch = () => {
    var selectedDate = new Date();
    var today = (selectedDate.getMonth() == 11) ? new Date(selectedDate.getFullYear() + 1, 0, 1) : new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (mm < 10) {
        mm = '0' + mm;
    }
    return `${yyyy}-${mm}`;
}


export const timestampToYyyyMmDd = (timestamp) => {
    var today = new Date(timestamp);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return `${yyyy}-${mm}-${dd}`;
}
export const previousDateTimestamp = () => {

    var dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 1);
    let timestamp = dateObj.getTime()
    return timestamp;
}
export const todayTimestamp = () => {
    let today_a = new Date();
    let dateTimestamp = new Date(today_a.getFullYear(), today_a.getMonth(), today_a.getDate(), 0, 0, 0, 0);
    let timestamp = dateTimestamp.getTime();
    return timestamp;
}
export const todayTimeDate = () => {
    let today_a = new Date();
    let dateTimestamp = new Date(today_a.getFullYear(), today_a.getMonth(), today_a.getDate(), 0, 0, 0, 0);
    return dateTimestamp;
}
export const timeDateByUser = (today) => {
    let dateTimestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    return dateTimestamp;
}
export const checkCreateEditSlot = (today, hour) => {
    let dateTimestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), Number(hour), 0, 0, 0);
    return dateTimestamp.getTime() > new Date().getTime();
}
export const nextdayTimestamp = () => {
    let today_a = new Date();
    let dd = today_a.getDate();
    let mm = today_a.getMonth() + 1;
    let yyyy = today_a.getFullYear();
    let dateTimestamp = new Date(yyyy, mm - 1, dd + 1, 0, 0, 0, 0);
    let timestamp = dateTimestamp.getTime();
    return timestamp;
}
export const getMonthFirstDate = (date) => {
    let today_a = new Date(date);
    let dd = today_a.getDate();
    let mm = today_a.getMonth();
    let yyyy = today_a.getFullYear();
    let dateTimestamp = new Date(yyyy, mm, 1, 0, 0, 0, 0);
    return dateTimestamp
}
export const getDateToTimestamp = (payload) => {
    let today = String(payload).split("/");
    let dd = Number(today[0]);
    let mm = Number(today[1]);
    let yyyy = Number(today[2]);
    let dateTimestamp = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
    return dateTimestamp.getTime();
}

export const getPartucularDateTimestamp = () => {
    var today_a = new Date();
    var dd = today_a.getDate();
    var mm = today_a.getMonth() + 1;
    var yyyy = today_a.getFullYear();
    var dateTimestamp = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
    var timestamp = dateTimestamp.getTime();
    return timestamp;
}
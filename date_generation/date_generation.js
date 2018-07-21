const arrayOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const arrayOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getDayOfWeek = (index) => {
    let dateString = arrayOfDays[index];
    return dateString;
}

const getMonthOfYear = (index) => {
    let monthString = arrayOfMonths[index];
    return monthString;
}

const getFormattedDate = (dateToFormat) => {

    const dayOfWeek = getDayOfWeek(dateToFormat.getDay());
    const dateOfMonth = dateToFormat.getDate();
    const year = dateToFormat.getFullYear();
    const monthAsNumberIndex = dateToFormat.getMonth();
    const monthAsNumber = monthAsNumberIndex + 1;
    const monthAsString = getMonthOfYear(monthAsNumberIndex);
    const upComingDateStringEuroNamingNumber = `${year} ${monthAsNumber} ${dateOfMonth}`
    const upComingDateStringAmericanNaming = `${monthAsString} ${dateOfMonth}, ${year}`
    const upComingDateStringAmericanWithSlash = `${monthAsNumber}/${dateOfMonth}/${year}`

    return {
        dayOfWeek: dayOfWeek,
        dateOfMonth: dateOfMonth,
        year: year,
        monthAsNumberIndex: monthAsNumberIndex,
        monthAsNumber: monthAsNumber,
        monthAsString: monthAsString,
        upComingDateStringEuroNamingNumber: upComingDateStringEuroNamingNumber,
        upComingDateStringAmericanNaming: upComingDateStringAmericanNaming,
        upComingDateStringAmericanWithSlash: upComingDateStringAmericanWithSlash
    };

}

// need to have a variable of the time now

let currentTime = new Date();
console.log('currentTime', currentTime);
console.log('currentTime(String): ', currentTime.toString());
let dayBefore = new Date();
dayBefore.setDate(currentTime.getDate()-1)
console.log('dayBefore', dayBefore.toString());

// let convertedDate = new Date().toISOString();
// console.log(convertedDate);
let formatedDate = getFormattedDate(currentTime);
console.log(formatedDate);

function shiftDays(timeShiftText, increment){
    currentTime = new Date();
    shiftedDate = new Date();
    if(timeShiftText === 'before'){
        shiftedDate.setDate(currentTime.getDate() - increment)
    }
    else if(timeShiftText === 'after'){
        shiftedDate.setDate(currentTime.getDate() + increment)
    }
    else{
        console.log('Bonk @ shiftDays Function');
    }
}

let fs = require('fs');

let allLessons = fs.readFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingLessons.json`)
allLessons = JSON.parse(allLessons)


const scheduledLessons = allLessons.filter(item => item.scheduled === true);
console.log(scheduledLessons.length);

const orderedScheduledLessons = scheduledLessons.sort((a, b) => new Date(a.date) > new Date(b.date))
console.log(orderedScheduledLessons);

// let dateArray = []
// for(let i = 0; i < scheduledLessons.length; i += 1){
//     // console.log(scheduledLessons[i]['date']);
//     dateArray.push(scheduledLessons[i]['date'])
// }

// console.log(dateArray);
// let orderDatesLastToFirst = dateArray.sort((a, b) => new Date(a) > new Date(b))
// // let orderDatesLastToFirst = dateArray.sort((a, b) => new Date(a) < new Date(b))
// console.log(orderDatesLastToFirst);
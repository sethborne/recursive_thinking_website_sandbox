let fs = require('fs');

let readLessonJSONFile = fs.readFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingLessons.json`, 'utf8');
readLessonArray = JSON.parse(readLessonJSONFile)
console.log(readLessonArray.length)

let lessonsNotScheduled = readLessonArray.filter(lesson => lesson.scheduled === false)
console.log(lessonsNotScheduled);

// english
// filter the array and only return items whose date is less than 30 days of age from today

let currentDate = new Date();
console.log(currentDate);
let comparisonDate = new Date();
comparisonDate.setDate(currentDate.getDate() - 30);
console.log(comparisonDate);

let onlyValidLessons = lessonsNotScheduled.filter(lesson => new Date(lesson.createdAt) > comparisonDate)
console.log(onlyValidLessons.length);
console.log(onlyValidLessons);
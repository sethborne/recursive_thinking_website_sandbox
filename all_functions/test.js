function timeSense(timeNow, timePast) {
  // Convert to standardized dates
  let now = new Date(timeNow);
  let then = new Date(timePast);

  // Get difference between the dates, in seconds (from milliseconds)
  let diff = Math.abs(now-then) / 1000;
  
  // Break in to years, days, hours, minutes seconds 
  const years = Math.floor(diff/31536000);
  const days = Math.floor(diff / 86400) % 365;
  const hours = Math.floor(diff / 3600) % 24;
  const minutes = Math.floor(diff / 60) % 60;
  const seconds = Math.floor(diff % 60);

  // Constructs correct return statement
  let elapsedTime = "";
  if (years === 1) {elapsedTime += years + ' year ';}
  else if (years > 1) {elapsedTime += years + ' years ';}
  if (days === 1) {elapsedTime += days + ' day ';}
  else if (days > 1) {elapsedTime += days + ' days ';}
  if (hours === 1) {elapsedTime += hours + ' hour ';}
  else if (hours > 1) {elapsedTime += hours + ' hours ';}
  if (minutes === 1) {elapsedTime += minutes + ' minute ';}
  else if (minutes > 1) {elapsedTime += minutes + ' minutes ';}
  if (seconds === 1) {elapsedTime += seconds + ' second ';}
  else if (seconds > 1) {elapsedTime += seconds + ' seconds ';}
  elapsedTime += 'ago';

  return elapsedTime;
}

// console.log(timeSense('Fri Sep 21 2018 10:31:45 GMT-0700', 'Mon Sep 21 2017 09:34:44 GMT-0700'));


function whenIsNextSaturdayNoon(optionalDate){
  let referenceDay;
  // If no date is entered as an argument, function will create a current timestamp to find the next Saturday
  if (!optionalDate){
      referenceDay = Date.now();
  }
  // First checks to see if the user submitted date argument is valid. If it isn't it will return an error message. If it is, the function will use that date to find next Saturday. The date needs to be converted to milliseconds first 
  else {
      let checkBadDate = Date.parse(optionalDate);
      if (isNaN(checkBadDate) == true){
          return 'Error, please check your date';
      }
      let dateConversion = new Date(optionalDate);
      referenceDay = dateConversion.getTime();
  }
  let millisecondsPerDay = 86400000;
  // Gets the day of the week for the entered date (user submitted or default)
  let dayOfWeek = new Date(referenceDay).getDay();
  // Takes the day of the week, adds (in milliseconds) x days to get the date of the upcoming Saturday. Can delete the day variables, I left them in to help read the getDay output (Sunday=0, Saturday=6)
  switch (dayOfWeek) {
      case 0:
          day = "Sunday";
          upcomingSaturday = String(new Date(referenceDay + 6*(millisecondsPerDay)));
          break;
      case 1:
          day = "Monday";
          upcomingSaturday = String(new Date(referenceDay + 5*(millisecondsPerDay)));
          break;
      case 2:
          day = "Tuesday";
          upcomingSaturday = String(new Date(referenceDay + 4*(millisecondsPerDay)));
          break;
      case 3:
          day = "Wednesday";
          upcomingSaturday = String(new Date(referenceDay + 3*(millisecondsPerDay)));
          break;
      case 4:
          day = "Thursday";
          upcomingSaturday = String(new Date(referenceDay + 2*(millisecondsPerDay)));
          break;
      case 5:
          day = "Friday";
          upcomingSaturday = String(new Date(referenceDay + 1*(millisecondsPerDay)));
          break;
      case 6:
          day = "Saturday";
          // Checks to see if it is past noon already on Saturday. If so, returns the following Saturday
          if (new Date(referenceDay).getHours()>12){
              upcomingSaturday = String(new Date(referenceDay + 7*(millisecondsPerDay)));
          }
          else {
              upcomingSaturday = String(new Date(referenceDay + 0*(millisecondsPerDay)));
          }
  }
  // Splits the date output up for the return statement
  console.log('upcomingSaturday', upcomingSaturday)
  upcomingSaturday = new Date(upcomingSaturday)
  upcomingSaturday.setHours(12, 00, 00, 00)
  console.log(typeof upcomingSaturday)
  
  return upcomingSaturday;
}

// console.log(whenIsNextSaturdayNoon())
// console.log(whenIsNextSaturdayNoon('9/11/2001'))
// console.log(whenIsNextSaturdayNoon('4/1'))
// console.log(whenIsNextSaturdayNoon('6/1/1'))
// console.log(whenIsNextSaturdayNoon('1'))
// console.log(whenIsNextSaturdayNoon('6/1/20=04'))
// console.log(whenIsNextSaturdayNoon('Jan 4 1999'))
// console.log(whenIsNextSaturdayNoon('november/7/2004'))
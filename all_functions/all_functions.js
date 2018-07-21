module.exports = {
    shiftDays: function(timeShiftText, increment){
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
        return shiftedDate;
    }
}
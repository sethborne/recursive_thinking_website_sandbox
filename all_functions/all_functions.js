module.exports = {
    makeArrayFromObjectKey: function(array, key){
        // console.log(array);
        let tempArray = [];
        for(let i = 0; i < array.length; i += 1){
            tempArray.push(array[i][key])
        }
        return tempArray
    },
    getValueAtKey: function(){
        
    },
    // getRandomIndex of Array should always accept the full array length...don't sub...
    getRandomIndexOfArray: function(arrayLength, min){
        let randomIndex = this.getRandomNumberForIndex(arrayLength, min)
        return randomIndex;
    },
    getRandomNumberForIndex: function(max, min){
        if(!min){
            min = 0;
        }
        max = max - 1;
        let randomNumberIndex = Math.floor(Math.random()*(max-min+1) + min)
        return randomNumberIndex;
    },
    getRandomNumber: function(max, min){
        if(!min){
            min = 0;
        }
        let randomNumber = Math.floor(Math.random()*(max-min + 1)+ min)
        return randomNumber;
    },
    getArrayOfValuesAtAVariableLength: function(array, maxValsInArray, minValsInArray){
        
    },
    // if you are using this - you should have already used makeArrayFromObjectKey
    getArrayOfValuesAtAFixedLength: function(array, maxValsInArray){
        let returnArray = [];
        for(let i = 0; i < maxValsInArray; i += 1){
            let index = this.getRandomIndexOfArray(array.length);
            let tempUserId = array[index]
            returnArray.push(tempUserId)
            array = array.filter(item => item !== tempUserId)
        }
        console.log('ret: ', returnArray);
        return returnArray;
    },
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
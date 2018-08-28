module.exports = {
  diffArrays: function(largeArray, smallArray){
    return largeArray.filter(lrgArrayItem => !smallArray.includes(lrgArrayItem))
  }
}
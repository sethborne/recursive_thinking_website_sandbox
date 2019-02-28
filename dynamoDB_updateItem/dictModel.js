const dictModel = {
  lesson: {
    Id: 'Id',
    title: 'title',
    date: 'date',
    description: 'description',
    lessonTaughtBy: 'lessonTaughtBy',
    lessonAttendees: 'lessonAttendees',
    lessonVotes: 'lessonVotes',
    scheduled: 'scheduled',
    _lessonCreatedBy: '_lessonCreatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}
const lesson = {
  Id: "ad7be290-325f-11e9-a716-53970632e901",
  createdAt: "Sat Feb 16 2019 18:56:52 GMT-0800 (Pacific Standard Time)",
  date: " ",
  description: "asdfasdfasdf",
  lessonAttendees: [],
  lessonTaughtBy: [],
  lessonVotes: [],
  scheduled: false,
  title: "asdfasdf",
  updatedAt: "Sat Feb 16 2019 18:56:52 GMT-0800 (Pacific Standard Time)",
  _lessonCreatedBy: "9cdd7123-8ed0-11e860-d5e4455e16bd"
}

let body = {
  Key: {},
  ExpressionAttributeNames: {},
  ExpressionAttributeValues: {},
  UpdateExpression: ""
}

body.Key.Id = lesson.Id
let UEString = 'SET '
for(let key in lesson){
  let tempEAN = `#${key}`
  body.ExpressionAttributeNames[tempEAN] = dictModel.lesson[key]
  let tempEAV = `${key}`
  body.ExpressionAttributeValues[tempEAV] = lesson[key]
}

let array = [];
for(let key in body.ExpressionAttributeNames){
  array.push(`${key} = ${body.ExpressionAttributeNames[key]}`)
}
array = array.toString().split(',').join(', ')
body.UpdateExpression = UEString += array

// "SET #Id = Id, #title = title, #date = date, #description = description, #lessonTaughtBy = lessonTaughtBy, #lessonAttendees = lessonAttendees, #lessonVotes = lessonVotes, #scheduled = scheduled, #_lessonCreatedBy = _lessonCreatedBy, #createdAt = createdAt, #updatedAt = updatedAt"

console.log('array: ', array)


console.log('UEString: ', UEString)


console.log('body', body)

// var params = {
//   ExpressionAttributeNames: {
//     "#AT": "AlbumTitle", 
//     "#Y": "Year"
//   }, 
//   ExpressionAttributeValues: {
//     ":t": {
//       S: "Louder Than Ever"
//     }, 
//     ":y": {
//       N: "2015"
//     }
//   }, 
//   Key: {
//     "Artist": {
//       S: "Acme Band"
//     }, 
//     "SongTitle": {
//       S: "Happy Day"
//     }
//   }, 
//   ReturnValues: "ALL_NEW", 
//   TableName: "Music", 
//   UpdateExpression: "SET #Y = :y, #AT = :t"
// }

/*
  data = {
    Attributes: {
      "AlbumTitle": {
        S: "Louder Than Ever"
      }, 
      "Artist": {
        S: "Acme Band"
      }, 
      "SongTitle": {
        S: "Happy Day"
      }, 
      "Year": {
        N: "2015"
      }
    }
  }
*/
// let AWS = require('aws-sdk');
// let docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
let fs = require('fs');
let AWS = require('aws-sdk');
let util = require('util');
const uuidv1 = require('uuid/v1');

let allFunctions = require('../all_functions/all_functions.js');

let readJSONFromUserIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingUsersIdArray.json', 'utf8');

let currentIdsForUsers = JSON.parse(readJSONFromUserIdFile);

let readJSONFromInterviewQuestionIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingInterviewQuestionsIdArray.json', 'utf8');

let currentIdsForInterviewQuestions = JSON.parse(readJSONFromInterviewQuestionIdFile);
// console.log('AllUsers', currentIdsForUsers);

let readJSONFromInterviewQuestionFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingInterviewQuestions.json', 'utf8');

let currentInterviewQuestions = JSON.parse(readJSONFromInterviewQuestionFile);
// console.log('AllUsers', currentIdsForUsers);

const allSkillsLanguageArray = [ 'JavaScript', 'HTML', 'HTML5', 'CSS', 'CSS3', 'jQuery', 'AngularJS', 'Angular', 'React', 'ReactJS', 'C#', '.NetCore', 'Nancy', 'Python', 'Django', 'Flask', 'Bootstrap', 'WebPack' ];

const allSkillsProfessionalArray = [ 'User Experience Design', 'User Research', 'Information Architecture', 'Visual Design', 'User Centered Design', 'Wireframing Design', 'Interaction Design', 'Front End Development'];

const allSkillsSoftwareArray = [ 'Sketch', 'Balsamiq', 'OmniGraffle', 'Axure'];

// =========================================================================
// Creates a file for all category ids
// =========================================================================
const textArray = [ 
  allSkillsLanguageArray,
  allSkillsProfessionalArray,
  allSkillsSoftwareArray
]

let tempArr = [];
textArray.forEach(arrItem => {
  arrItem.forEach(skillItem => tempArr.push(uuidv1()));
})

// console.log('add it up', allSkillsLanguageArray.length + allSkillsProfessionalArray.length + allSkillsSoftwareArray.length)
// console.log('check prop', tempArr.length)

// console.log('tempArr', tempArr)
// tempArr = JSON.stringify(tempArr)
// fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingProfileSkillsAllIdArray.json`, tempArr, 'utf8')

// =========================================================================

// ref in each skill Id 
// let currentIdsForSkillsLanguages = [];
// let currentIdsForSkillsProfessional = [];
// let currentIdsForSkillsSoftware = [];
// let skillsIdArray = [ currentIdsForSkillsLanguages, currentIdsForSkillsProfessional, currentIdsForSkillsSoftware ]

// for(let i = 0; i < skillsIdArray.length; i += 1){
//   skillsIdArray[i] = JSON.parse(tempReadCont)
// }

// read in all Ids
let tempReadCont = fs.readFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingProfileSkillsIdArray.json`, 'utf8');
console.log(tempReadCont)
let parseTempReadCont = JSON.parse(tempReadCont);

// currentIdsForSkillsLanguages = skillsIdArray[0];
// currentIdsForSkillsProfessional = skillsIdArray[1];
// currentIdsForSkillsSoftware = skillsIdArray[2];

// for(let i = 0; i < skillsIdArray.length; i += 1){
//   if(skillsIdArray[i].length === textArray[i][0].length){
//     console.log('Arrays are Equal Length');
//   }
//   else {
//     let tempArr = [];
//     textArray[i][0].forEach(skillItem => tempArr.push(uuidv1()));
//     tempArr = JSON.stringify(tempArr)
//     // fs.writeFileSync(`../dynamoDB_mock_data_returns/${textArray[i][1]}`, tempArr, 'utf8')
//   }
// }
let typeOfArray = [];
function buildTypeOfArray(skillArray, type){
  
  for(let i = 0; i < skillArray.length; i += 1){
    let tempArr = [];
    tempArr.push(skillArray[i])
    tempArr.push(type)
    typeOfArray.push(tempArr)
  }
  
}
buildTypeOfArray(allSkillsLanguageArray, 'language')
buildTypeOfArray(allSkillsProfessionalArray, 'professional')
buildTypeOfArray(allSkillsSoftwareArray, 'software')

console.log('typeOfArray', typeOfArray)

function buildJSONStringForSkillOutput(skillIdArray, skillArray, skillTable){
    let string = {

    }
    string[skillTable] = []
    console.log('begin', string)
    let count = 1;
    for(let i = 0; i < skillArray.length; i += 1){
        // build an array of Users with Skill
        let usersWithSkillArr = [];
        let userIdArray = [...currentIdsForUsers];
        let questionsWithCategoryArr = [];
        let questionIdArray = [...currentIdsForInterviewQuestions]
        let loopLength = allFunctions.getRandomNumber(currentIdsForUsers.length)
        let createdByUser = userIdArray[allFunctions.getRandomIndexOfArray(userIdArray.length)]
        // start user skill array
        for(let i = 0; i < loopLength; i += 1){
          let randomIndex = allFunctions.getRandomIndexOfArray(userIdArray.length);
          let tempString = {
            "S": userIdArray[randomIndex]
          }
          usersWithSkillArr.push(tempString);
          userIdArray.splice(randomIndex, 1)
        }
        // end user skill array
        // make intquestwithcategory
        // questions have a categories array currentInterviewQuestions
        // look through each intquestion for current skill ID
        // console.log('skillId: ', skillIdArray[i], currentInterviewQuestions)
        currentInterviewQuestions.forEach(question => {
          if(question.categories.includes(skillIdArray[i])){
            let tempString = {
              "S": question.Id
            }
            questionsWithCategoryArr.push(tempString)
            // console.log('skillId: ', skillIdArray[i], 'question: ', question.Id, 'questionCat: ', question.categories, )
          }
        })
        // end intquestwithcategory
        // console.log('Id', skillIdArray[i])
        let tempObj = {
          PutRequest:{
            Item: { 
              Id: { S: skillIdArray[i] },
              name: { S: skillArray[i][0] },
              // type: { S: skillArray[i][1] },
              _usersWithSkill: { L: usersWithSkillArr },
              _interviewquestionsWithCategory: { L: questionsWithCategoryArr},
              _createdByUser: { S: createdByUser },
              createdAt: { "S": new Date().toString()},
              updatedAt: { "S": new Date().toString()}
            }
          }
        }
        string[skillTable].push(tempObj)
        // so write a file and reset if on the 25th
        console.log(i)
        if((i + 1) % 25 === 0){
          console.log('here', i, string)
          // console.log(JSONString);
          let JSONString = JSON.stringify(string)
          // console.log(JSONString);
          fs.writeFileSync(`../../recursive_thinking_server/db_fill/${skillTable}${count}.json`, JSONString, 'utf8')
          // read back the db fill file
          fs.writeFileSync(`../../recursive_thinking_server_react/db_fill/${skillTable}${count}.json`, JSONString, 'utf8')
          let tempReadArr = fs.readFileSync(`../../recursive_thinking_server_react/db_fill/${skillTable}${count}.json`, 'utf8');
          let parseTempReadObj = JSON.parse(tempReadArr);
          // // 
          let tempArr = []
          for(let i = 0; i < parseTempReadObj[skillTable].length; i += 1){
            let temp = AWS.DynamoDB.Converter.unmarshall(parseTempReadObj[skillTable][i]['PutRequest']['Item']);
            tempArr.push(temp)
          }
          tempArr = JSON.stringify(tempArr)
          fs.writeFileSync(`../dynamoDB_mock_data_returns/${skillTable}${count}.json`, tempArr, 'utf8');
          fs.writeFileSync(`../../recursive_thinking_website_react_sandbox/recursive_thinking_website_react/data_returns/${skillTable}${count}.json`, tempArr, 'utf8');
          count += 1
          string = {}
          string[skillTable] = []
        }
    }
    console.log('end', string)
    let JSONString = JSON.stringify(string)
    // console.log(JSONString);
    fs.writeFileSync(`../../recursive_thinking_server/db_fill/${skillTable}${count}.json`, JSONString, 'utf8')
    // read back the db fill file
    fs.writeFileSync(`../../recursive_thinking_server_react/db_fill/${skillTable}${count}.json`, JSONString, 'utf8')
    let tempReadArr = fs.readFileSync(`../../recursive_thinking_server_react/db_fill/${skillTable}${count}.json`, 'utf8');
    let parseTempReadObj = JSON.parse(tempReadArr);
    // // 
    let tempArr = []
    for(let i = 0; i < parseTempReadObj[skillTable].length; i += 1){
      let temp = AWS.DynamoDB.Converter.unmarshall(parseTempReadObj[skillTable][i]['PutRequest']['Item']);
      tempArr.push(temp)
    }
    tempArr = JSON.stringify(tempArr)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/${skillTable}${count}.json`, tempArr, 'utf8');
    fs.writeFileSync(`../../recursive_thinking_website_react_sandbox/recursive_thinking_website_react/data_returns/${skillTable}${count}.json`, tempArr, 'utf8');
}

buildJSONStringForSkillOutput(parseTempReadCont, typeOfArray, 'RecursiveThinkingProfileSkills')
// buildJSONStringForSkillOutput(currentIdsForSkillsLanguages, allSkillsLanguageArray, 'RecursiveThinkingProfileSkillsLanguage')
// buildJSONStringForSkillOutput(currentIdsForSkillsProfessional, allSkillsProfessionalArray, 'RecursiveThinkingProfileSkillsProfessional')
// buildJSONStringForSkillOutput(currentIdsForSkillsSoftware, allSkillsSoftwareArray, 'RecursiveThinkingProfileSkillsSoftware')
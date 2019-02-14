// let AWS = require('aws-sdk');
// let docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
let fs = require('fs');
let AWS = require('aws-sdk');
let util = require('util');
const uuidv1 = require('uuid/v1');

let allFunctions = require('../all_functions/all_functions.js');

let readJSONFromUserIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfilesIdArray.json', 'utf8');
let currentIdsForUsers = JSON.parse(readJSONFromUserIdFile)
console.log('AllUsers', currentIdsForUsers);

const allSkillsLanguageArray = [ 'JavaScript', 'HTML', 'HTML5', 'CSS', 'CSS3', 'jQuery', 'AngularJS', 'Angular', 'React', 'ReactJS', 'C#', '.NetCore', 'Nancy', 'Python', 'Django', 'Flask', 'Bootstrap', 'WebPack' ]

const allSkillsProfessionalArray = [ 'User Experience Design', 'User Research', 'Information Architecture', 'Visual Design', 'User Centered Design', 'Wireframing Design', 'Interaction Design', 'Front End Development']

const allSkillsSoftwareArray = [ 'Sketch', 'Balsamiq', 'OmniGraffle', 'Axure']

// =========================================================================
// Create the file
// =========================================================================
const textArray = [ 
  [allSkillsLanguageArray, 'RecursiveThinkingProfileSkillsLanguagesIdArray.json'],
  [allSkillsProfessionalArray, 'RecursiveThinkingProfileSkillsProfessionalIdArray.json'],
  [allSkillsSoftwareArray, 'RecursiveThinkingProfileSkillsSoftwareIdArray.json']
]
// console.log(allQuestionsArray.length);
// textArray.forEach(arrItem => {
//   let tempArr = [];
//   arrItem[0].forEach(skillItem => tempArr.push(uuidv1()));
//   tempArr = JSON.stringify(tempArr)
//   fs.writeFileSync(`../dynamoDB_mock_data_returns/${arrItem[1]}`, tempArr, 'utf8')
// })

// =========================================================================

// ref in each skill Id 
let currentIdsForSkillsLanguages = [];
let currentIdsForSkillsProfessional = [];
let currentIdsForSkillsSoftware = [];
let skillsIdArray = [ currentIdsForSkillsLanguages, currentIdsForSkillsProfessional, currentIdsForSkillsSoftware ]

for(let i = 0; i < skillsIdArray.length; i += 1){
  let tempReadCont = fs.readFileSync(`../dynamoDB_mock_data_returns/${textArray[i][1]}`, 'utf8');
  skillsIdArray[i] = JSON.parse(tempReadCont)
}

currentIdsForSkillsLanguages = skillsIdArray[0];
currentIdsForSkillsProfessional = skillsIdArray[1];
currentIdsForSkillsSoftware = skillsIdArray[2];

for(let i = 0; i < skillsIdArray.length; i += 1){
  if(skillsIdArray[i].length === textArray[i][0].length){
    console.log('Arrays are Equal Length');
  }
  else {
    let tempArr = [];
    textArray[i][0].forEach(skillItem => tempArr.push(uuidv1()));
    tempArr = JSON.stringify(tempArr)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/${textArray[i][1]}`, tempArr, 'utf8')
  }
}

function buildJSONStringForSkillOutput(skillIdArray, skillArray, skillTable){
    let string = {

    }
    string[skillTable] = []
    for(let i = 0; i < skillArray.length; i += 1){
        // build an array of Users with Skill
        let usersWithSkillArr = [];
        let userIdArray = [...currentIdsForUsers];
        let loopLength = allFunctions.getRandomNumber(currentIdsForUsers.length)
        
        for(let i = 0; i < loopLength; i += 1){
          let randomIndex = allFunctions.getRandomIndexOfArray(userIdArray.length);
          let tempString = {
            "S": userIdArray[randomIndex]
          }
          usersWithSkillArr.push(tempString);
          userIdArray.splice(randomIndex, 1)
        }
        let tempObj = {
          PutRequest:{
            Item: { 
              Id: { S: skillIdArray[i] },
              name: { S: skillArray[i] },
              _usersWithSkill: { L: usersWithSkillArr }
            }
          }
        }
        string[skillTable].push(tempObj)
    }
    // console.log(JSONString);
    let JSONString = JSON.stringify(string)
    console.log(JSONString);
    // fs.writeFileSync(`../../recursive_thinking_server/db_fill/${skillTable}.json`, JSONString, 'utf8')
    // read back the db fill file
    fs.writeFileSync(`../../recursive_thinking_server/db_fill/${skillTable}.json`, JSONString, 'utf8')
    let tempReadArr = fs.readFileSync(`../../recursive_thinking_server/db_fill/${skillTable}.json`, 'utf8');
    let parseTempReadObj = JSON.parse(tempReadArr);
    // console.log(parseTempReadObj);
    let tempArr = []
    for(let i = 0; i < parseTempReadObj[skillTable].length; i += 1){
      let temp = AWS.DynamoDB.Converter.unmarshall(parseTempReadObj[skillTable][i]['PutRequest']['Item']);
      tempArr.push(temp)
    }
    tempArr = JSON.stringify(tempArr)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/${skillTable}.json`, tempArr, 'utf8');
    fs.writeFileSync(`../../recursive_thinking_website_react_sandbox/recursive_thinking_website_react/data_returns/${skillTable}.json`, tempArr, 'utf8');
    
}

buildJSONStringForSkillOutput(currentIdsForSkillsLanguages, allSkillsLanguageArray, 'RecursiveThinkingProfileSkillsLanguage')
buildJSONStringForSkillOutput(currentIdsForSkillsProfessional, allSkillsProfessionalArray, 'RecursiveThinkingProfileSkillsProfessional')
buildJSONStringForSkillOutput(currentIdsForSkillsSoftware, allSkillsSoftwareArray, 'RecursiveThinkingProfileSkillsSoftware')

// let regexS = /("S")/gi;
// let regexL = /("L")/gi
// console.log(testRegex.test(JSONString1));
// JSONString1 = JSONString1.replace(regexS, 'S')
// JSONString1 = JSONString1.replace(regexL, 'L')
// console.log(JSONString1);
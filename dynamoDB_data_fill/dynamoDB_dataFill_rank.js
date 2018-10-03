let fs = require('fs');
let AWS = require('aws-sdk');
let util = require('util');
const uuidv1 = require('uuid/v1');

let allFunctions = require('../all_functions/all_functions.js');

let readJSONFromRankIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingRanksIdArray.json', 'utf8');
let currentIdsForRanks = JSON.parse(readJSONFromRankIdFile)
console.log(currentIdsForRanks.length);

const allRanksArray = [
    [
        // 01
        [ 'Id' ],
        [ 'rank', 'Youngling'],
        [ 'createdAt', new Date().toString() ],
        [ 'updatedAt' ],
        [ '_usersWithRank' , [] ]
    ],
    [
        // 02
        [ 'Id' ],
        [ 'rank', 'Adv Youngling'],
        [ 'createdAt', new Date().toString() ],
        [ 'updatedAt' ],
        [ '_usersWithRank' , [] ]
    ],
    [
        // 03
        [ 'Id' ],
        [ 'rank', 'Padawan'],
        [ 'createdAt', new Date().toString() ],
        [ 'updatedAt' ],
        [ '_usersWithRank' , [] ]
    ],
    [
        // 04
        [ 'Id' ],
        [ 'rank', 'Adv Padawan'],
        [ 'createdAt', new Date().toString() ],
        [ 'updatedAt' ],
        [ '_usersWithRank' , [] ]
    ],
    [
        // 05
        [ 'Id' ],
        [ 'rank', 'Jedi Initiate'],
        [ 'createdAt', new Date().toString() ],
        [ 'updatedAt' ],
        [ '_usersWithRank' , [] ]
    ],
    [
        // 06
        [ 'Id' ],
        [ 'rank', 'Jedi'],
        [ 'createdAt', new Date().toString() ],
        [ 'updatedAt' ],
        [ '_usersWithRank' , [] ]
    ],
    [
        // 07
        [ 'Id' ],
        [ 'rank', 'Jedi Knight'],
        [ 'createdAt', new Date().toString() ],
        [ 'updatedAt' ],
        [ '_usersWithRank' , [] ]
    ],
    [
        // 08
        [ 'Id' ],
        [ 'rank', 'Jedi Master'],
        [ 'createdAt', new Date().toString() ],
        [ 'updatedAt' ],
        [ '_usersWithRank' , [] ]
    ],
    [
        // 09
        [ 'Id' ],
        [ 'rank', 'Jedi Grand Master'],
        [ 'createdAt', new Date().toString() ],
        [ 'updatedAt' ],
        [ '_usersWithRank' , [] ]
    ]
]

// =========================================================================
// Create the file
// =========================================================================

// let ranksIdArray = []
// for(let i = 0; i < allRanksArray.length; i += 1){
//     ranksIdArray.push(uuidv1())
// }
// // console.log(ranksIdArray);
// ranksIdArray = JSON.stringify(ranksIdArray)
// fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingRanksIdArray.json`, ranksIdArray, 'utf8')

// =========================================================================

if(currentIdsForRanks.length === allRanksArray.length){
    console.log('Then it is true!');
}
else{
    let ranksIdArray = []
    for(let i = 0; i < allRanksArray.length; i += 1){
        ranksIdArray.push(uuidv1())
    }
    // console.log(ranksIdArray);
    ranksIdArray = JSON.stringify(ranksIdArray)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingRanksIdArray.json`, ranksIdArray, 'utf8')
    readJSONFromRankIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingRanksIdArray.json', 'utf8');
    currentIdsForRanks = JSON.parse(readJSONFromRankIdFile) 
}


function buildJSONStringForAnswerOutput(rankArray, rankTable){
    let string = {

    }
    string[rankTable] = []
    for(let i = 0; i < rankArray.length; i += 1){
        let tempObj = {
            PutRequest:{
                Item: {
                }
            }
        }
        // Id      
        tempObj['PutRequest']['Item'][rankArray[i][0][0]] = { "S": currentIdsForRanks[i]};
        // rank
        tempObj['PutRequest']['Item'][rankArray[i][1][0]] = { "S": rankArray[i][1][1]};       
        // createdAt
        tempObj['PutRequest']['Item'][rankArray[i][2][0]] = { "S": rankArray[i][2][1]};
        // updatedAt
        tempObj['PutRequest']['Item'][rankArray[i][3][0]] = { "S": rankArray[i][2][1]};               
        // users with Rank
        tempObj['PutRequest']['Item'][rankArray[i][4][0]] = { "L": rankArray[i][4][1]};
        string[rankTable].push(tempObj)
    }
    // console.log(string);
    let JSONString = JSON.stringify(string)
    console.log(JSONString);
    // fs.writeFileSync(`../../recursive_thinking_server/db_fill/${rankTable}.json`, JSONString, 'utf8')
    fs.writeFileSync(`../../recursive_thinking_server_react/db_fill/${rankTable}.json`, JSONString, 'utf8')
    let readRankObj = fs.readFileSync(`../../recursive_thinking_server_react/db_fill/${rankTable}.json`, 'utf8');
    let parseReadRankObj = JSON.parse(readRankObj)
    let rankObj = []
    for(let item = 0; item < parseReadRankObj['RecursiveThinkingRanks'].length; item += 1){
        let temp = AWS.DynamoDB.Converter.unmarshall(parseReadRankObj['RecursiveThinkingRanks'][item]['PutRequest']['Item']);
        rankObj.push(temp)
    }
    rankObj = JSON.stringify(rankObj)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/${rankTable}.json`, rankObj, 'utf8')
    fs.writeFileSync(`../../recursive_thinking_website_react_sandbox/recursive_thinking_website_react/data_returns/${rankTable}.json`, rankObj, 'utf8');
    
}

buildJSONStringForAnswerOutput(allRanksArray, 'RecursiveThinkingRanks')


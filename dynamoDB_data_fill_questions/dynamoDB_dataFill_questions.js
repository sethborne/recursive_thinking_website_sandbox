let fs = require('fs');
let AWS = require('aws-sdk');
let util = require('util');
const uuidv1 = require('uuid/v1');

let allFunctions = require('../all_functions/all_functions.js');
// console.log('in question', dateFunction.shiftDays('before', 45).toString());

let readJSONFromUserIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfilesIdArray.json', 'utf8');
let currentIdsForUsers = JSON.parse(readJSONFromUserIdFile)
console.log(currentIdsForUsers);

let readJSONFromInterviewQuestionsIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingInterviewQuestionsIdArray.json', 'utf8');
let currentIdsForInterviewQuestions = JSON.parse(readJSONFromInterviewQuestionsIdFile)
console.log(currentIdsForInterviewQuestions);

let readJSONFromInterviewQuestionsAnswersIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingInterviewQuestionsAnswersIdArray.json', 'utf8');
let currentIdsForInterviewQuestionsAnswers = JSON.parse(readJSONFromInterviewQuestionsAnswersIdFile)
console.log(currentIdsForInterviewQuestionsAnswers.length);

const allQuestionsArray = [
    [
        [ 'Id' ],
        [ 'title', 'Highlight Table Rows'] ,
        [ 'submitted', new Date('2018-08-14T12:00:00Z').toString() ],
        ['description', 'Diversify kpis. We need to socialize the comms with the wider stakeholder community even dead cats bounce. Core competencies not the long pole in my tent. We have got to manage that low hanging fruit show pony quick win I just wanted to give you a heads-up can we align on lunch orders. We need to touch base off-line before we fire the new ux experience drop-dead date, but strategic fit, yet thought shower lean into that problem high turnaround rate. Future-proof high turnaround rate today shall be a cloudy day, thanks to blue sky thinking, we can now deploy our new ui to the cloud , nor can I just chime in on that one.'],
        [ 'categories', [] ],
        [ 'answersToQuestion', []],
        [ 'createdAt', new Date('2018-08-14T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-08-14T12:00:00Z').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Build An Accordion'] ,
        [ 'submitted', new Date('2018-08-16T12:00:00Z').toString() ],
        ['description', 'Quarter killick gally reef sutler quarterdeck tack aye lookout Pieces of Eight. Heave down Yellow Jack scuttle league stern jack boatswain cog lee ahoy. Capstan Sea Legs lass booty strike colors spirits hardtack pink reef crack Jennys tea cup. Quarter deadlights pink yo-ho-ho fore run a rig overhaul lateen sail hogshead lookout. Lee fluke fathom Pieces of Eight sheet Sail ho ye six pounders pink pirate. Chase broadside cable reef sails gabion salmagundi cutlass fathom ho sheet. Scurvy Nelsons folly sheet tender cable American Main red ensign hogshead dance the hempen jig ahoy. Boom pressgang Sail ho reef sails coxswain piracy bilge water port sheet killick. Knave Jack Ketch deadlights clap of thunder scurvy crimp marooned fluke Buccaneer lee.'],
        [ 'categories', [] ],
        [ 'answersToQuestion', []],
        [ 'createdAt', new Date('2018-08-16T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-08-16T12:00:00Z').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Build a Modal'] ,
        [ 'submitted', new Date('2018-08-18T12:00:00Z').toString() ],
        ['description', 'Stirred by starlight. Corpus callosum great turbulent clouds, from which we spring brain is the seed of intelligence concept of the number one vastness is bearable only through love. Decipherment. Emerged into consciousness? Rings of Uranus courage of our questions white dwarf tesseract, Drake Equation Flatland, cosmos inconspicuous motes of rock and gas hearts of the stars the ash of stellar alchemy, emerged into consciousness. Made in the interiors of collapsing stars Sea of Tranquility realm of the galaxies. Of brilliant syntheses. Tingling of the spine with pretty stories for which there is little good evidence. Cosmic fugue at the edge of forever a billion trillion, across the centuries galaxies with pretty stories for which there is little good evidence, trillion, galaxies, the carbon in our apple pies quasar, permanence of the stars at the edge of forever billions upon billions rogue.'],
        [ 'categories', [] ],
        [ 'answersToQuestion', []],
        [ 'createdAt', new Date('2018-08-18T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-08-18T12:00:00Z').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Build a Gallery'] ,
        [ 'submitted', new Date('2018-08-20T12:00:00Z').toString() ],
        ['description', 'You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I do not know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I am breaking now. We said we would say it was the snow that killed the other two, but it was not. Nature is lethal but it does not hold a candle to man. Look, just because I do not be giving no man a foot massage do not make it right for Marsellus to throw Antwone into a glass motherfucking house, fucking up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, because I will kill the motherfucker, know what I am saying'],
        [ 'categories', [] ],
        [ 'answersToQuestion', []],
        [ 'createdAt', new Date('2018-08-20T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-08-20T12:00:00Z').toString() ],
        [ '_createdByUser' ]
    ]
]

// =========================================================================
// Create the file
// =========================================================================

// console.log(allQuestionsArray.length);
// let questionsIdArray = []
// for(let i = 0; i < allQuestionsArray.length; i += 1){
//     questionsIdArray.push(uuidv1())
// }
// // console.log(questionsIdArray);
// questionsIdArray = JSON.stringify(questionsIdArray)
// fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingInterviewQuestionsIdArray.json`, questionsIdArray, 'utf8')

// =========================================================================

if(currentIdsForInterviewQuestions.length === allQuestionsArray.length){
    console.log('Then it is true!');
}
else{
    let questionsIdArray = []
    for(let i = 0; i < allQuestionsArray.length; i += 1){
        questionsIdArray.push(uuidv1())
    }
    questionsIdArray = JSON.stringify(questionsIdArray)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingInterviewQuestionsIdArray.json`, questionsIdArray, 'utf8')
}

function buildJSONStringForLessonOutput(questionArray, questionTable){
    let string = {

    }
    string[questionTable] = []
    for(let i = 0; i < questionArray.length; i += 1){
        let tempObj = {
            PutRequest:{
                Item: {
                }
            }
        }
        // ID      
        tempObj['PutRequest']['Item'][questionArray[i][0][0]] = { "S": currentIdsForInterviewQuestions[i] };
        // Title
        tempObj['PutRequest']['Item'][questionArray[i][1][0]] = { "S": questionArray[i][1][1]};
        // Submitted
        tempObj['PutRequest']['Item'][questionArray[i][2][0]] = { "S": questionArray[i][2][1]};
        // Description
        tempObj['PutRequest']['Item'][questionArray[i][3][0]] = { "S": questionArray[i][3][1]};
        // Categories
        tempObj['PutRequest']['Item'][questionArray[i][4][0]] = { "L": questionArray[i][4][1]};
        // AnswersToQuestion
        // need to return an array
        let answersToQuestionArray = allFunctions.getArrayOfValuesAtAFixedLength(currentIdsForInterviewQuestionsAnswers, 2);
        let answersToPushArray = []
        for(let a = 0; a < answersToQuestionArray.length; a += 1){
            // console.log(t);
            let tempString = {
                "S": answersToQuestionArray[a]
            }
            // console.log(tempString);
            answersToPushArray.push(tempString)
        }
        console.log(answersToPushArray);
        tempObj['PutRequest']['Item'][questionArray[i][5][0]] = { "L": answersToPushArray};
        // createdAt
        tempObj['PutRequest']['Item'][questionArray[i][6][0]] = { "S": questionArray[i][6][1]};
        // updatedAt
        tempObj['PutRequest']['Item'][questionArray[i][7][0]] = { "S": questionArray[i][7][1]};        
        // _createdByUser
        // need a random index, then push that index to the value
        let randomIndexCreatedBy = allFunctions.getRandomIndexOfArray(currentIdsForUsers.length);
        // console.log(currentIdsForUsers);
        // console.log("hi", randomIndexCreatedBy);
        tempObj['PutRequest']['Item'][questionArray[i][8][0]] = { "S": currentIdsForUsers[randomIndexCreatedBy]};           
        string[questionTable].push(tempObj)
    }
    // console.log(string);
    let JSONString = JSON.stringify(string)
    console.log(JSONString);
    fs.writeFileSync(`../../recursive_thinking_server/db_fill/${questionTable}.json`, JSONString, 'utf8')
    let readQuestionObj = fs.readFileSync(`../../recursive_thinking_server/db_fill/${questionTable}.json`, 'utf8');
    let parseReadQuestionObj = JSON.parse(readQuestionObj)
    let questionObj = []
    for(let item = 0; item < parseReadQuestionObj['RecursiveThinkingInterviewQuestions'].length; item += 1){
        let temp = AWS.DynamoDB.Converter.unmarshall(parseReadQuestionObj['RecursiveThinkingInterviewQuestions'][item]['PutRequest']['Item']);
        questionObj.push(temp)
    }
    questionObj = JSON.stringify(questionObj)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/${questionTable}.json`, questionObj, 'utf8')
}

buildJSONStringForLessonOutput(allQuestionsArray, 'RecursiveThinkingInterviewQuestions')


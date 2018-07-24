let fs = require('fs');
let AWS = require('aws-sdk');
let util = require('util');
const uuidv1 = require('uuid/v1');

let allFunctions = require('../all_functions/all_functions.js');

let readJSONFromUserIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfilesIdArray.json', 'utf8');
let currentIdsForUsers = JSON.parse(readJSONFromUserIdFile)
console.log(currentIdsForUsers.length);

let readJSONFromInterviewQuestionsIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingInterviewQuestionsIdArray.json', 'utf8');
let currentIdsForInterviewQuestions = JSON.parse(readJSONFromInterviewQuestionsIdFile)
console.log(currentIdsForInterviewQuestions.length);

let readJSONFromInterviewQuestionsAnswersIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingInterviewQuestionsAnswersIdArray.json', 'utf8');
let currentIdsForInterviewQuestionsAnswers = JSON.parse(readJSONFromInterviewQuestionsAnswersIdFile)
console.log(currentIdsForInterviewQuestionsAnswers.length);

const allAnswersArray = [
    [
        [ 'Id' ],
        [ 'title', 'First Answer to Question'],
        [ 'submitted', new Date('2018-08-22T12:00:00Z').toString() ],
        ['description', 'Yeah, but you\'re uh, you\'re so, you\'re so thin. That\'s a Florence Nightingale effect. It happens in hospitals when nurses fall in love with their patients. Go to it, kid. I\'m telling the truth, Doc, you gotta believe me. George. George. What do you mean you\'ve seen this, it\'s brand new. Marty, one rejection isn\'t the end of the world. Breakfast. Okay, that\'s enough. Now stop the microphone. I\'m sorry fellas. I\'m afraid you\'re just too darn loud. Next, please. Where\'s the next group, please. It\'s about the future, isn\'t it? There, there, now, just relax. You\'ve been asleep for almost nine hours now.'],
        [ 'categories', [] ],
        [ 'createdAt', new Date('2018-08-22T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-08-22T12:00:00Z').toString() ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Second Answer to Question'] ,
        [ 'submitted', new Date('2018-08-24T12:00:00Z').toString() ],
        ['description', 'It\'s OK to get Rib-grease on your face, because you\'re allowing people to see that you\'re proud of these ribs.The magic Indian is a mysterious spiritual force, and we\'re going to Cathedral Rock, and that\'s the vortex of the heart.Have you urinated? Have you drained your bladder? Are you free? Because if you haven\'t it will only come out later. I\'m giving you some information that your bodily fluids may penetrate your clothing fibre\'s without warning. When you get lost in your imaginatory vagueness, your foresight will become a nimble vagrant.Did you feel that?'],
        [ 'categories', [] ],
        [ 'createdAt', new Date('2018-08-24T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-08-24T12:00:00Z').toString() ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Third Answer to Question'] ,
        [ 'submitted', new Date('2018-08-26T12:00:00Z').toString() ],
        ['description', 'Soko radicchio bunya nuts gram dulse silver beet parsnip napa cabbage lotus root sea lettuce brussels sprout cabbage. Catsear cauliflower garbanzo yarrow salsify chicory garlic bell pepper napa cabbage lettuce tomato kale arugula melon sierra leone bologi rutabaga tigernut. Sea lettuce gumbo grape kale kombu cauliflower salsify kohlrabi okra sea lettuce broccoli celery lotus root carrot winter purslane turnip greens garlic. Jícama garlic courgette coriander radicchio plantain scallion cauliflower fava bean desert raisin spring onion chicory bunya nuts. Sea lettuce water spinach gram fava bean leek dandelion silver beet eggplant bush tomato.'],
        [ 'categories', [] ],
        [ 'createdAt', new Date('2018-08-26T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-08-26T12:00:00Z').toString() ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Fourth Answer to Question'] ,
        [ 'submitted', new Date('2018-08-28T12:00:00Z').toString() ],
        ['description', 'Stoked first tracks big ring, berm white room ride fatty hellflip back country gorby rail backside gear jammer smear. Yard sale huck hurl carcass drop, grunt huck table top carve Snowboard dirtbag. Manny death cookies flow switch afterbang twister OTB taco glove pillow popping ride around first tracks ripping trucks. Bomb hole flow pipe chain ring 180 Whistler. Afterbang glades 180 huckfest death cookies. 180 first tracks euro laps avie, brain bucket huck acro sucker hole fatty spin betty wheelie drop pinner. Bomb hole epic line pillow popping wheels frontside free ride air method hellflip glades titanium sucker hole bomb T-bar.'],
        [ 'categories', [] ],
        [ 'createdAt', new Date('2018-08-28T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-08-28T12:00:00Z').toString() ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ]
]

// =========================================================================
// Create the file
// =========================================================================

// console.log(allAnswersArray.length);
// let answersIdArray = []
// for(let i = 0; i < allAnswersArray.length; i += 1){
//     answersIdArray.push(uuidv1())
// }
// // console.log(answersIdArray);
// answersIdArray = JSON.stringify(answersIdArray)
// fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingInterviewQuestionsAnswersIdArray.json`, answersIdArray, 'utf8')

// =========================================================================

if(currentIdsForInterviewQuestionsAnswers.length === allAnswersArray.length){
    console.log('Then it is true!');
}
else{
    let answersIdArray = []
    for(let i = 0; i < allAnswersArray.length; i += 1){
        answersIdArray.push(uuidv1())
    }
    // console.log(answersIdArray);
    answersIdArray = JSON.stringify(answersIdArray)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingInterviewQuestionsAnswersIdArray.json`, answersIdArray, 'utf8')
}


function buildJSONStringForAnswerOutput(answerArray, answerTable){
    let string = {

    }
    string[answerTable] = []
    for(let i = 0; i < answerArray.length; i += 1){
        let tempObj = {
            PutRequest:{
                Item: {
                }
            }
        }
        // Id      
        tempObj['PutRequest']['Item'][answerArray[i][0][0]] = { "S": currentIdsForInterviewQuestionsAnswers[i]};
        // title
        tempObj['PutRequest']['Item'][answerArray[i][1][0]] = { "S": answerArray[i][1][1]};
        // date submitted
        tempObj['PutRequest']['Item'][answerArray[i][2][0]] = { "S": answerArray[i][2][1]};
        // description
        tempObj['PutRequest']['Item'][answerArray[i][3][0]] = { "S": answerArray[i][3][1]};
        // Categories
        tempObj['PutRequest']['Item'][answerArray[i][4][0]] = { "L": answerArray[i][4][1]};        
        // createdAt
        tempObj['PutRequest']['Item'][answerArray[i][6][0]] = { "S": answerArray[i][6][1]};
        // updatedAt
        tempObj['PutRequest']['Item'][answerArray[i][7][0]] = { "S": answerArray[i][7][1]};        
        // _createdByUser
        tempObj['PutRequest']['Item'][answerArray[i][8][0]] = { "S": " "};              
        // answersQuestion
        // tempObj['PutRequest']['Item'][answerArray[i][5][0]] = { "L": answerArray[i][5][1]};
        string[answerTable].push(tempObj)
    }
    // console.log(string);
    let JSONString = JSON.stringify(string)
    console.log(JSONString);
    fs.writeFileSync(`../../recursive_thinking_server/db_fill/${answerTable}.json`, JSONString, 'utf8')
    let readAnswerObj = fs.readFileSync(`../../recursive_thinking_server/db_fill/${answerTable}.json`, 'utf8');
    let parseReadAnswerObj = JSON.parse(readAnswerObj)
    let answerObj = []
    for(let item = 0; item < parseReadAnswerObj['RecursiveThinkingInterviewQuestionsAnswers'].length; item += 1){
        let temp = AWS.DynamoDB.Converter.unmarshall(parseReadAnswerObj['RecursiveThinkingInterviewQuestionsAnswers'][item]['PutRequest']['Item']);
        answerObj.push(temp)
    }
    answerObj = JSON.stringify(answerObj)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/${answerTable}.json`, answerObj, 'utf8')
}

buildJSONStringForAnswerOutput(allAnswersArray, 'RecursiveThinkingInterviewQuestionsAnswers')


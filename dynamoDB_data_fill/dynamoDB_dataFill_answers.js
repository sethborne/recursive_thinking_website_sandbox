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
        [ 'title', 'First Answer to a Question'],
        [ 'submitted', new Date('2018-08-22T12:00:00Z').toString() ],
        ['description', 'Yeah, but you\'re uh, you\'re so, you\'re so thin. That\'s a Florence Nightingale effect. It happens in hospitals when nurses fall in love with their patients. Go to it, kid. I\'m telling the truth, Doc, you gotta believe me. George. George. What do you mean you\'ve seen this, it\'s brand new. Marty, one rejection isn\'t the end of the world. Breakfast. Okay, that\'s enough. Now stop the microphone. I\'m sorry fellas. I\'m afraid you\'re just too darn loud. Next, please. Where\'s the next group, please. It\'s about the future, isn\'t it? There, there, now, just relax. You\'ve been asleep for almost nine hours now.'],
        [ 'categories', [] ],
        [ 'createdAt' ],
        [ 'updatedAt' ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Second Answer to a Question'] ,
        [ 'submitted', new Date('2018-08-24T12:00:00Z').toString() ],
        ['description', 'It\'s OK to get Rib-grease on your face, because you\'re allowing people to see that you\'re proud of these ribs.The magic Indian is a mysterious spiritual force, and we\'re going to Cathedral Rock, and that\'s the vortex of the heart.Have you urinated? Have you drained your bladder? Are you free? Because if you haven\'t it will only come out later. I\'m giving you some information that your bodily fluids may penetrate your clothing fibre\'s without warning. When you get lost in your imaginatory vagueness, your foresight will become a nimble vagrant.Did you feel that?'],
        [ 'categories', [] ],
        [ 'createdAt' ],
        [ 'updatedAt' ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Third Answer to a Question'] ,
        [ 'submitted', new Date('2018-08-26T12:00:00Z').toString() ],
        ['description', 'Soko radicchio bunya nuts gram dulse silver beet parsnip napa cabbage lotus root sea lettuce brussels sprout cabbage. Catsear cauliflower garbanzo yarrow salsify chicory garlic bell pepper napa cabbage lettuce tomato kale arugula melon sierra leone bologi rutabaga tigernut. Sea lettuce gumbo grape kale kombu cauliflower salsify kohlrabi okra sea lettuce broccoli celery lotus root carrot winter purslane turnip greens garlic. Jícama garlic courgette coriander radicchio plantain scallion cauliflower fava bean desert raisin spring onion chicory bunya nuts. Sea lettuce water spinach gram fava bean leek dandelion silver beet eggplant bush tomato.'],
        [ 'categories', [] ],
        [ 'createdAt' ],
        [ 'updatedAt' ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Fourth Answer to a Question'] ,
        [ 'submitted', new Date('2018-08-28T12:00:00Z').toString() ],
        ['description', 'Stoked first tracks big ring, berm white room ride fatty hellflip back country gorby rail backside gear jammer smear. Yard sale huck hurl carcass drop, grunt huck table top carve Snowboard dirtbag. Manny death cookies flow switch afterbang twister OTB taco glove pillow popping ride around first tracks ripping trucks. Bomb hole flow pipe chain ring 180 Whistler. Afterbang glades 180 huckfest death cookies. 180 first tracks euro laps avie, brain bucket huck acro sucker hole fatty spin betty wheelie drop pinner. Bomb hole epic line pillow popping wheels frontside free ride air method hellflip glades titanium sucker hole bomb T-bar.'],
        [ 'categories', [] ],
        [ 'createdAt' ],
        [ 'updatedAt' ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ],[
        [ 'Id' ],
        [ 'title', 'Fifth Answer to a Question'],
        [ 'submitted', new Date('2018-08-30T12:00:00Z').toString() ],
        ['description', 'Chuck ipsum. Chuck Norris doesn’t need to swallow when eating food. Chuck Norris once kicked a baby elephant into puberty. Chuck Norris’ roundhouse kick is so powerful, it can be seen from outer space by the naked eye. Chuck Norris does not hunt because the word hunting infers the probability of failure. Chuck Norris goes killing.'],
        [ 'categories', [] ],
        [ 'createdAt' ],
        [ 'updatedAt' ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Sixth Answer to a Question'] ,
        [ 'submitted', new Date('2018-09-02T12:00:00Z').toString() ],
        ['description', 'You ever seen a UFO in these parts? Before anyone passes judgement, may I remind you, we are in the Artic. Hey, Scully, do you think you could ever cannibalize someone? Well, not if drawsting pants come back into style. I think it\'s remotely plausible that someone might think you\'re hot. We found out you used to be a dog-faced boy. Scully, your\'re not going to believe this. Something Weird. A UFO Party. I have a life. I saw Elvis in a potato chip once. Whatever tape you found in that VCR, it isn\'t mine. I scream, you scream, we all scream for nonfat Tofutti rice dreamsicles. '],
        [ 'categories', [] ],
        [ 'createdAt' ],
        [ 'updatedAt' ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Seventh Answer to a Question'] ,
        [ 'submitted', new Date('2018-09-04T12:00:00Z').toString() ],
        ['description', 'Hodor hodor... Hodor hodor hodor. Hodor hodor hodor? Hodor! Hodor; hodor hodor hodor hodor? Hodor! Hodor hodor, hodor hodor hodor? Hodor! HODOR! Hodor hodor, hodor hodor hodor? Hodor! Hodor hodor, hodor; hodor hodor hodor hodor? HODOR! Hodor, hodor... Hodor hodor. HODOR! Hodor, hodor hodor, hodor? Hodor, hodor!?! Hodor hodor hodor!'],
        [ 'categories', [] ],
        [ 'createdAt' ],
        [ 'updatedAt' ],
        [ 'answersQuestion'],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Eigth Answer to a Question'] ,
        [ 'submitted', new Date('2018-09-06T12:00:00Z').toString() ],
        ['description', 'Your filthy drug money has been transformed into nice clean taxable income brought to you by a savvy investment in a thriving business. Yeah and if you wanna stay a criminal and not become say a convict, then maybe you should grow up and listen to your lawyer. They take every penny and you go in the can for felony tax evasion. Ouch! What was your mistake? You didn\'t launder your money! Now, you give me your money, okay that\'s called placement. Hand me that little thing, bin. This is the nail salon, right. I take your dirty money and I slip it into the salon\'s nice clean cash flow - that\'s called layering. Final step - integration. The revenues from the salon go to the owner - that\'s you!'],
        [ 'categories', [] ],
        [ 'createdAt' ],
        [ 'updatedAt' ],
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
        tempObj['PutRequest']['Item'][answerArray[i][5][0]] = { "S": answerArray[i][2][1]};
        // updatedAt
        tempObj['PutRequest']['Item'][answerArray[i][6][0]] = { "S": answerArray[i][2][1]};        
        // _createdByUser
        let randomIndexCreatedBy = allFunctions.getRandomIndexOfArray(currentIdsForUsers.length);
        tempObj['PutRequest']['Item'][answerArray[i][8][0]] = { "S": currentIdsForUsers[randomIndexCreatedBy]};              
        // answersQuestion
        // tempObj['PutRequest']['Item'][answerArray[i][5][0]] = { "L": answerArray[i][5][1]};
        string[answerTable].push(tempObj)
    }
    // console.log(string);
    let JSONString = JSON.stringify(string)
    console.log(JSONString);
    // fs.writeFileSync(`../../recursive_thinking_server/db_fill/${answerTable}.json`, JSONString, 'utf8')
    fs.writeFileSync(`../../recursive_thinking_server_react/db_fill/${answerTable}.json`, JSONString, 'utf8')
    let readAnswerObj = fs.readFileSync(`../../recursive_thinking_server_react/db_fill/${answerTable}.json`, 'utf8');
    let parseReadAnswerObj = JSON.parse(readAnswerObj)
    let answerObj = []
    for(let item = 0; item < parseReadAnswerObj['RecursiveThinkingInterviewQuestionsAnswers'].length; item += 1){
        let temp = AWS.DynamoDB.Converter.unmarshall(parseReadAnswerObj['RecursiveThinkingInterviewQuestionsAnswers'][item]['PutRequest']['Item']);
        answerObj.push(temp)
    }
    answerObj = JSON.stringify(answerObj)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/${answerTable}.json`, answerObj, 'utf8')
    fs.writeFileSync(`../../recursive_thinking_website_react_sandbox/recursive_thinking_website_react/data_returns/${answerTable}.json`, answerObj, 'utf8');
    
}

buildJSONStringForAnswerOutput(allAnswersArray, 'RecursiveThinkingInterviewQuestionsAnswers')


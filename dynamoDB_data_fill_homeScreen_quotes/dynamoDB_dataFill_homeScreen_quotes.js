let fs = require('fs');
const uuidv1 = require('uuid/v1');

let readJSONFromUserIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfilesIdArray.json', 'utf8');
let currentIdsForUsers = JSON.parse(readJSONFromUserIdFile)

const allHomeScreenQuotesArray = [
    [
        [ 'Id' ],
        [ 'quote', 'Bacon ipsum dolor amet porchetta bacon shank, tri-tip pancetta ground round sausage t-bone. Venison bacon short ribs pastrami. Porchetta jerky doner frankfurter beef ribs. Spare ribs tail cupim t-bone kevin ribeye alcatra shankle bacon meatball bresaola.'],
        [ 'createdAt', new Date('2018-06-14T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-07-14T12:00:00Z').toString() ],
        [ '_createdByUser', currentIdsForUsers[0] ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Stick butt in face. My left donut is missing, as is my right run outside as soon as door open for eat and than sleep on your face and then cats take over the world. Drool i could pee on this if i had the energy instead of drinking water from the cat bowl, make sure to steal water from the toilet yet cough hairball on conveniently placed pants so attack feet. What a cat-ass-trophy!'],
        [ 'createdAt', new Date('2018-06-16T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-07-16T12:00:00Z').toString() ],
        [ '_createdByUser', currentIdsForUsers[1] ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'You could sit here for weeks with your one hair brush trying to do that - or you could do it with one stroke with an almighty brush. Now let\'s put some happy little clouds in here. You\'re meant to have fun in life. Maybe there was an old trapper that lived out here and maybe one day he went to check his beaver traps, and maybe he fell into the river and drowned.'],
        [ 'createdAt', new Date('2018-06-18T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-07-18T12:00:00Z').toString() ],
        [ '_createdByUser', currentIdsForUsers[4] ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to. Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow\'s nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits.'],
        [ 'createdAt', new Date('2018-06-20T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-07-20T12:00:00Z').toString() ],
        [ '_createdByUser', currentIdsForUsers[7] ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Now that we know who you are, I know who I am. I\'m not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain\'s going to be? He\'s the exact opposite of the hero. And most times they\'re friends, like you and me! I should\'ve known way back when... You know why, David? Because of the kids. They called me Mr Glass.'],
        [ 'createdAt', new Date('2018-06-22T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-07-22T12:00:00Z').toString() ],
        [ '_createdByUser', currentIdsForUsers[9] ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'I think you\'ve let your personal feelings cloud your judgement. Why don\'t we just give everybody a promotion and call it a night - \'Commander\'? Yesterday I did not know how to eat gagh. Sure. You\'d be surprised how far a hug goes with Geordi, or Worf. Your shields were failing, sir. About four years. I got tired of hearing how young I looked. Besides, you look good in a dress.'],
        [ 'createdAt', new Date('2018-06-24T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-07-24T12:00:00Z').toString() ],
        [ '_createdByUser', currentIdsForUsers[11] ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'We\'re both adults. I can\'t pretend I don\'t know that person is you. I want there to be no confusion. I know I owe you my life. And more than that, I respect the strategy. In your position, I would have done the same. One issue, which troubles me, I don\'t know what happens when our three-month contract ends. You know why I do this. I want security for my family.'],
        [ 'createdAt', new Date('2018-06-26T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-07-26T12:00:00Z').toString() ],
        [ '_createdByUser', currentIdsForUsers[13] ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Hodor, hodor... Hodor hodor hodor. Hodor hodor hodor? Hodor! Hodor; hodor hodor hodor hodor? Hodor hodor hodor? Hodor! Hodor hodor. HODOR! Hodor, hodor hodor, hodor? Hodor! Hodor hodor, hodor hodor hodor? Hodor! HODOR!'],
        [ 'createdAt', new Date('2018-06-28T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-07-28T12:00:00Z').toString() ],
        [ '_createdByUser', currentIdsForUsers[15] ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'We found out you used to be a dog-faced boy. I scream, you scream, we all scream for nonfat Tofutti rice dreamsicles. You ever seen a UFO in these parts? Scully, you\'re not going to believe this. Something Weird. A UFO Party. I have a life. I saw Elvis in a potato chip once. Whatever tape you found in that VCR, it isn\'t mine.'],
        [ 'createdAt', new Date('2018-06-30T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-07-30T12:00:00Z').toString() ],
        [ '_createdByUser', currentIdsForUsers[16] ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'When Chuck Norris does a pushup, he isn\'t lifting himself up, he\'s pushing the Earth down, Contrary to popular belief, America is not a democracy, it is a Chucktatorship The chief export of Chuck Norris is Pain Chuck Norris doesn\'t read books. He stares them down until he gets the information he wants.'],
        [ 'createdAt', new Date('2018-07-02T12:00:00Z').toString() ],
        [ 'updatedAt', new Date('2018-08-02T12:00:00Z').toString() ],
        [ '_createdByUser', currentIdsForUsers[19] ]
    ]
]

function buildJSONStringForHomeScreenQuotesOutput(homeScreenQuotesArray, homeScreenQuotesTable){
    let string = {

    }
    string[homeScreenQuotesTable] = []
    for(let i = 0; i < homeScreenQuotesArray.length; i += 1){
        
        let tempObj = {
            PutRequest:{
                Item: {
                }
            }
        }
        // ID      
        tempObj['PutRequest']['Item'][homeScreenQuotesArray[i][0][0]] = { "S": uuidv1()};
        // quote
        tempObj['PutRequest']['Item'][homeScreenQuotesArray[i][1][0]] = { "S": homeScreenQuotesArray[i][1][1]};
        // createdAt
        tempObj['PutRequest']['Item'][homeScreenQuotesArray[i][2][0]] = { "S": homeScreenQuotesArray[i][2][1]};
        // updatedAt
        tempObj['PutRequest']['Item'][homeScreenQuotesArray[i][3][0]] = { "S": homeScreenQuotesArray[i][3][1]};
        // _createdByUser
        tempObj['PutRequest']['Item'][homeScreenQuotesArray[i][4][0]] = { "S": homeScreenQuotesArray[i][4][1]};               
        string[homeScreenQuotesTable].push(tempObj)
    }
    // console.log(string);
    let JSONString = JSON.stringify(string)
    console.log(JSONString);
    fs.writeFileSync(`../../recursive_thinking_server/db_fill/${homeScreenQuotesTable}.json`, JSONString, 'utf8')
    // let readHomeScreenQuotesObj = fs.readFileSync(`../../recursive_thinking_server/db_fill/${homeScreenQuotesTable}.json`, 'utf8');
}

buildJSONStringForHomeScreenQuotesOutput(allHomeScreenQuotesArray, 'RecursiveThinkingHomeScreenQuotes')


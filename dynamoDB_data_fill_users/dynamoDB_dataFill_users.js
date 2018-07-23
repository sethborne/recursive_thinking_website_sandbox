let fs = require('fs');
let AWS = require('aws-sdk');
let util = require('util');
const uuidv1 = require('uuid/v1');

let dateFunction = require('../all_functions/all_functions.js');
// console.log('in question', dateFunction.shiftDays('before', 45).toString());

let readJSONFromLessonFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingLessons.json', 'utf8');
// console.log(readJSONFromLessonFile);
let allLessons = JSON.parse(readJSONFromLessonFile);
console.log('allLessons', allLessons);

let readJSONFromUserIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfilesIdArray.json', 'utf8');
let currentIdsForUsers = JSON.parse(readJSONFromUserIdFile)

// 1 yr -  365
// 2 yr -  760
// 3 yr - 1095
// 4 yr - 1460
// 5 yr - 1825

const allUsersArray = [
    // Should not show on either Lessons or Upcoming Lessons
    [
        // Kevin Bacon - 1
        [ 'userId' ],
        [ 'username', 'onlySixPeopleAway'] ,
        [ 'picture',  '../images/avatar2.png'],
        [ 'name', 'Kevin Norwood Bacon' ],
        [ 'city', 'Philadelphia' ],
        [ 'state', 'PA' ],
        [ 'employer', 'Bacon Bros, Inc.' ],
        [ 'title', 'Dancer' ],
        [ 'github', ' ' ],
        [ 'codepen', ' ' ],
        [ 'linkedin', ' ' ],
        [ 'portfolioWebsite', 'http://www.baconbros.com' ],
        [ 'resume', ' ' ],
        [ 'bio', 'Bacon ipsum dolor amet doner brisket jowl ground round bacon burgdoggen. Prosciutto short loin sirloin, filet mignon meatball capicola picanha rump pork belly ground round t-bone buffalo sausage swine. Ham hock jowl leberkas, bresaola chuck shoulder short loin landjaeger brisket ground round strip steak prosciutto sirloin. Shank t-bone pork belly, picanha meatloaf short ribs jerky swine turkey kevin ham hock. Sirloin hamburger short loin chicken jerky beef ribs swine shank landjaeger bacon cow.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewGithub', '0' ],
        [ 'profileStatsViewCodePen', '0' ],
        [ 'profileStatsViewPortfolio', '0' ],
        [ 'profileStatsViewLinkedIn', '0' ],
        [ 'profileStatsViewResume', '0' ],
        [ 'experience', dateFunction.shiftDays('before', 1825).toString()],
        [ 'timeWithRT' ],
        [ 'rank', 'Chief' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonsAttending', [] ],
        [ 'createdAt', dateFunction.shiftDays('before', 240).toString() ],
        [ 'updatedAt' ]
    ], 
    [
        // Cat Lady - 2
        [ 'userId' ],
        [ 'username', 'meowmeow'] ,
        [ 'picture',  '../images/avatar4.png'],
        [ 'name', 'Selina Kyle' ],
        [ 'city', 'Gotham' ],
        [ 'state', 'NY' ],
        [ 'employer', 'DC Comics' ],
        [ 'title', 'President of Me-ow' ],
        [ 'github', ' ' ],
        [ 'codepen', ' ' ],
        [ 'linkedin', ' ' ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Catwoman' ],
        [ 'resume', ' ' ],
        [ 'bio', 'Bring your owner a dead bird hide when guests come over always ensure to lay down in such a manner that tail can lightly brush human\'s nose . Meeeeouw stand with legs in litter box, but poop outside so trip on catnip have a lot of grump in yourself because you can\'t forget to be grumpy and not be like king grumpy cat but chase imaginary bugs. Take a big fluffing crap headbutt owner\'s knee and take a big fluffing crap 💩 mice meowzer yet slap owner\'s face at 5am until human fills food dish use lap as chair. Stuff and things. Intently sniff hand. Lick left leg for ninety minutes, still dirty russian blue. ' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewGithub', '0' ],
        [ 'profileStatsViewCodePen', '0' ],
        [ 'profileStatsViewPortfolio', '0' ],
        [ 'profileStatsViewLinkedIn', '0' ],
        [ 'profileStatsViewResume', '0' ],
        [ 'experience', dateFunction.shiftDays('before', 900).toString()],
        [ 'timeWithRT' ],
        [ 'rank', 'Presidente' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonsAttending', [] ],
        [ 'createdAt', dateFunction.shiftDays('before', 240).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Cupcakes - 3
        [ 'userId' ],
        [ 'username', 'letThemEatCake'] ,
        [ 'picture',  '../images/avatar5.png'],
        [ 'name', 'Amelia Simmons' ],
        [ 'city', 'Hartford' ],
        [ 'state', 'CT' ],
        [ 'employer', 'American Cookery' ],
        [ 'title', 'Yes, Chef' ],
        [ 'github', ' ' ],
        [ 'codepen', ' ' ],
        [ 'linkedin', ' ' ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/American_Cookery' ],
        [ 'resume', ' ' ],
        [ 'bio', 'Cupcake ipsum dolor sit amet. Gummies brownie halvah donut. Oat cake soufflé pastry. Gingerbread bonbon marshmallow. Danish toffee pastry. Halvah cake candy icing powder chocolate bar marzipan. Carrot cake bonbon candy canes jelly-o danish. Pudding wafer powder marshmallow. Jelly chupa chups pie pudding toffee icing gummies sweet jujubes. Powder tootsie roll tootsie roll topping bonbon bear claw chocolate. Pudding wafer powder jelly-o. Sesame snaps jelly beans cake danish jujubes chocolate bear claw bonbon sweet.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewGithub', '0' ],
        [ 'profileStatsViewCodePen', '0' ],
        [ 'profileStatsViewPortfolio', '0' ],
        [ 'profileStatsViewLinkedIn', '0' ],
        [ 'profileStatsViewResume', '0' ],
        [ 'experience', dateFunction.shiftDays('before', 1500).toString()],
        [ 'timeWithRT' ],
        [ 'rank', 'Presidente' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonsAttending', [] ],
        [ 'createdAt', dateFunction.shiftDays('before', 500).toString() ],
        [ 'updatedAt' ]
    ], [
        // Cupcakes - 4
        [ 'userId' ],
        [ 'username', 'tablesShallBeRound'] ,
        [ 'picture',  '../images/avatar1.png'],
        [ 'name', 'King Authur' ],
        [ 'city', 'Camelot' ],
        [ 'state', 'WA' ],
        [ 'employer', 'United Kingdom' ],
        [ 'title', 'King of the Britains' ],
        [ 'github', ' ' ],
        [ 'codepen', ' ' ],
        [ 'linkedin', ' ' ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Monty_Python_and_the_Holy_Grail' ],
        [ 'resume', ' ' ],
        [ 'bio', 'Well, how\'d you become king, then? Listen. Strange women lying in ponds distributing swords is no basis for a system of government. Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony. You can\'t expect to wield supreme power just \'cause some watery tart threw a sword at you! I don\'t want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time!' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewGithub', '0' ],
        [ 'profileStatsViewCodePen', '0' ],
        [ 'profileStatsViewPortfolio', '0' ],
        [ 'profileStatsViewLinkedIn', '0' ],
        [ 'profileStatsViewResume', '0' ],
        [ 'experience', dateFunction.shiftDays('before', 1250).toString()],
        [ 'timeWithRT' ],
        [ 'rank', 'King' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonsAttending', [] ],
        [ 'createdAt', dateFunction.shiftDays('before', 600).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Rob Ross - 5
        [ 'userId' ],
        [ 'username', 'happyTrees4All'] ,
        [ 'picture',  '../images/avatar2.png'],
        [ 'name', 'Robert Ross' ],
        [ 'city', 'Daytona Beach' ],
        [ 'state', 'FL' ],
        [ 'employer', 'Happy Tree Co.' ],
        [ 'title', 'Sir Paints-a-Lot' ],
        [ 'github', ' ' ],
        [ 'codepen', ' ' ],
        [ 'linkedin', ' ' ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Bob_Ross' ],
        [ 'resume', ' ' ],
        [ 'bio', 'We\'ll put all the little clouds in and let them dance around and have fun. Trees cover up a multitude of sins. Let\'s put some happy trees and bushes back in here. We don\'t have anything but happy trees here. Nice little fluffy clouds laying around in the sky being lazy. Just take out whatever you don\'t want. It\'ll change your entire perspective. You can create beautiful things - but you have to see them in your mind first. There\'s nothing wrong with having a tree as a friend. Just let go - and fall like a little waterfall.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewGithub', '0' ],
        [ 'profileStatsViewCodePen', '0' ],
        [ 'profileStatsViewPortfolio', '0' ],
        [ 'profileStatsViewLinkedIn', '0' ],
        [ 'profileStatsViewResume', '0' ],
        [ 'experience', dateFunction.shiftDays('before', 1600).toString()],
        [ 'timeWithRT' ],
        [ 'rank', 'Maestro' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonsAttending', [] ],
        [ 'createdAt', dateFunction.shiftDays('before', 400).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Hipster - 6
        [ 'userId' ],
        [ 'username', 'oneTallBoyToRuleThemAll'] ,
        [ 'picture',  '../images/avatar_default.png'],
        [ 'name', 'Sir Von Douchebag' ],
        [ 'city', 'Brooklyn' ],
        [ 'state', 'NY' ],
        [ 'employer', 'Pabst Blue Ribbion Brewing' ],
        [ 'title', 'Annoying Asshat' ],
        [ 'github', ' ' ],
        [ 'codepen', ' ' ],
        [ 'linkedin', ' ' ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Hipster_(contemporary_subculture)' ],
        [ 'resume', ' ' ],
        [ 'bio', 'Paleo ugh selfies, pork belly meh sartorial narwhal cornhole offal. Quinoa distillery subway tile 90\'s green juice, bushwick shoreditch slow-carb messenger bag. Kale chips man braid church-key yuccie distillery chartreuse. Shoreditch meh heirloom echo park tumeric adaptogen literally helvetica gentrify la croix tattooed affogato roof party bushwick. Blue bottle microdosing food truck green juice keytar fashion axe vice shabby chic literally taxidermy succulents PBR&B listicle. Seitan cloud bread bicycle rights portland. Letterpress hoodie irony, pabst af pickled plaid wayfarers narwhal gastropub sriracha.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewGithub', '0' ],
        [ 'profileStatsViewCodePen', '0' ],
        [ 'profileStatsViewPortfolio', '0' ],
        [ 'profileStatsViewLinkedIn', '0' ],
        [ 'profileStatsViewResume', '0' ],
        [ 'experience', dateFunction.shiftDays('before', 100).toString()],
        [ 'timeWithRT' ],
        [ 'rank', 'Maestro' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonsAttending', [] ],
        [ 'createdAt', dateFunction.shiftDays('before', 50).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Office Boss - 7
        [ 'userId' ],
        [ 'username', 'yeahImGonnaNeed'] ,
        [ 'picture',  '../images/avatar3.png'],
        [ 'name', 'Bill Lumbergh' ],
        [ 'city', 'Austin' ],
        [ 'state', 'TX' ],
        [ 'employer', 'Initech' ],
        [ 'title', 'Vice President' ],
        [ 'github', ' ' ],
        [ 'codepen', ' ' ],
        [ 'linkedin', ' ' ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Office_Space' ],
        [ 'resume', ' ' ],
        [ 'bio', 'Push back take five, punch the tree, and come back in here with a clear head killing it. Please advise soonest run it up the flagpole, ping the boss and circle back forcing function prairie dogging, for pig in a python. What do you feel you would bring to the table if you were hired for this position knowledge is power so draw a line in the sand quick win. Baseline the procedure and samepage your department today shall be a cloudy day, thanks to blue sky thinking, we can now deploy our new ui to the cloud but productize. Upstream selling. Highlights . Table the discussion high turnaround rate but shoot me an email or streamline, yet minimize backwards overflow nor we need to start advertising on social media, optimize for search. Synergize productive mindfulness when does this sunset?' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewGithub', '0' ],
        [ 'profileStatsViewCodePen', '0' ],
        [ 'profileStatsViewPortfolio', '0' ],
        [ 'profileStatsViewLinkedIn', '0' ],
        [ 'profileStatsViewResume', '0' ],
        [ 'experience', dateFunction.shiftDays('before', 1250).toString()],
        [ 'timeWithRT' ],
        [ 'rank', 'Rookie' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonsAttending', [] ],
        [ 'createdAt', dateFunction.shiftDays('before', 250).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Dread Pirate Roberts - 8
        [ 'userId' ],
        [ 'username', 'blackbart'] ,
        [ 'picture',  '../images/avatar_default.png'],
        [ 'name', 'One Eyed Willy' ],
        [ 'city', 'Astoria' ],
        [ 'state', 'OR' ],
        [ 'employer', 'The Inferno, Inc.' ],
        [ 'title', 'Captain' ],
        [ 'github', ' ' ],
        [ 'codepen', ' ' ],
        [ 'linkedin', ' ' ],
        [ 'portfolioWebsite', 'http://goonies.wikia.com/wiki/One-Eyed_Willy' ],
        [ 'resume', ' ' ],
        [ 'bio', 'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow\'s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.<br><br>Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewGithub', '0' ],
        [ 'profileStatsViewCodePen', '0' ],
        [ 'profileStatsViewPortfolio', '0' ],
        [ 'profileStatsViewLinkedIn', '0' ],
        [ 'profileStatsViewResume', '0' ],
        [ 'experience', dateFunction.shiftDays('before', 1200).toString()],
        [ 'timeWithRT' ],
        [ 'rank', 'Captain' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonsAttending', [] ],
        [ 'createdAt', dateFunction.shiftDays('before', 120).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Carl - 9
        [ 'userId' ],
        [ 'username', 'theCosmostist'] ,
        [ 'picture',  '../images/avatar1.png'],
        [ 'name', 'Carl Sagan' ],
        [ 'city', 'Brooklyn' ],
        [ 'state', 'NY' ],
        [ 'employer', 'SETI' ],
        [ 'title', 'Chief Ear' ],
        [ 'github', ' ' ],
        [ 'codepen', ' ' ],
        [ 'linkedin', ' ' ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Carl_Sagan' ],
        [ 'resume', ' ' ],
        [ 'bio', 'Not a sunrise but a galaxyrise prime number! Vangelis. Hundreds of thousands. Billions upon billions. Great turbulent clouds Rig Veda. Radio telescope bits of moving fluff take root and flourish, astonishment. Descended from astronomers dream of the mind\'s eye descended from astronomers courage of our questions, preserve and cherish that pale blue dot realm of the galaxies, emerged into consciousness, Drake Equation take root and flourish two ghostly white figures in coveralls and helmets are soflty dancing brain is the seed of intelligence at the edge of forever, Cambrian explosion cosmic ocean, ship of the imagination astonishment.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewGithub', '0' ],
        [ 'profileStatsViewCodePen', '0' ],
        [ 'profileStatsViewPortfolio', '0' ],
        [ 'profileStatsViewLinkedIn', '0' ],
        [ 'profileStatsViewResume', '0' ],
        [ 'experience', dateFunction.shiftDays('before', 2000).toString()],
        [ 'timeWithRT' ],
        [ 'rank', 'My Captain' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonsAttending', [] ],
        [ 'createdAt', dateFunction.shiftDays('before', 600).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Sam - 10
        [ 'userId' ],
        [ 'username', 'badassMofo'] ,
        [ 'picture',  '../images/avatar2.png'],
        [ 'name', 'Samuel L. Jackson' ],
        [ 'city', 'Washington' ],
        [ 'state', 'D.C.' ],
        [ 'employer', 'Wallace Enterprises' ],
        [ 'title', 'Fixer' ],
        [ 'github', ' ' ],
        [ 'codepen', ' ' ],
        [ 'linkedin', ' ' ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Samuel_L._Jackson' ],
        [ 'resume', ' ' ],
        [ 'bio', 'Well, the way they make shows is, they make one show. That show\'s called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they\'re going to make more shows. Some pilots get picked and become television programs. Some don\'t, become nothing. She starred in one of the ones that became nothing. Your bones don\'t break, mine do. That\'s clear. Your cells react to bacteria and viruses differently than mine. You don\'t get sick, I do.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewGithub', '0' ],
        [ 'profileStatsViewCodePen', '0' ],
        [ 'profileStatsViewPortfolio', '0' ],
        [ 'profileStatsViewLinkedIn', '0' ],
        [ 'profileStatsViewResume', '0' ],
        [ 'experience', dateFunction.shiftDays('before', 800).toString()],
        [ 'timeWithRT' ],
        [ 'rank', 'My Captain' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonsAttending', [] ],
        [ 'createdAt', dateFunction.shiftDays('before', 230).toString() ],
        [ 'updatedAt' ]
    ]
]

// =========================================================================
// Create the file
// =========================================================================

// console.log(allUsersArray.length);
// let usersIdArray = []
// for(let i = 0; i < allUsersArray.length; i += 1){
//     usersIdArray.push(uuidv1())
// }
// // console.log(lessonIdArray);
// usersIdArray = JSON.stringify(usersIdArray)
// fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfilesIdArray.json`, usersIdArray, 'utf8')

// =========================================================================

if(currentIdsForUsers.length === allUsersArray.length){
    console.log('Then it is true!');
}
else{
    let usersIdArray = []
    for(let i = 0; i < allUsersArray.length; i += 1){
        usersIdArray.push(uuidv1())
    }
    // console.log(lessonIdArray);
    usersIdArray = JSON.stringify(usersIdArray)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfilesIdArray.json`, usersIdArray, 'utf8')
}

// console.log(allUsersArray.length);

function buildJSONStringForUserOutput(userArray, userTable){
    let string = {

    }
    string[userTable] = []
    for(let i = 0; i < userArray.length; i += 1){
        
        let tempObj = {
            PutRequest:{
                Item: {
                }
            }
        }
        // userId      
        tempObj['PutRequest']['Item'][userArray[i][0][0]] = { "S": currentIdsForUsers[i]};
        // username
        tempObj['PutRequest']['Item'][userArray[i][1][0]] = { "S": userArray[i][1][1]};
        // picture
        tempObj['PutRequest']['Item'][userArray[i][2][0]] = { "S": userArray[i][2][1]};
        // name
        tempObj['PutRequest']['Item'][userArray[i][3][0]] = { "S": userArray[i][3][1]};
        // city - 5 [4]
        tempObj['PutRequest']['Item'][userArray[i][4][0]] = { "S": userArray[i][4][1]};        
        // state
        tempObj['PutRequest']['Item'][userArray[i][5][0]] = { "S": userArray[i][5][1]};
        // employer
        tempObj['PutRequest']['Item'][userArray[i][6][0]] = { "S": userArray[i][6][1]};
        // title
        tempObj['PutRequest']['Item'][userArray[i][7][0]] = { "S": userArray[i][7][1]};
        // github
        tempObj['PutRequest']['Item'][userArray[i][8][0]] = { "S": userArray[i][8][1]};
        // codepen - 10 [9]
        tempObj['PutRequest']['Item'][userArray[i][9][0]] = { "S": userArray[i][9][1]};        
        // linkedin
        tempObj['PutRequest']['Item'][userArray[i][10][0]] = { "S": userArray[i][10][1]};
        // portfolioWebsite        
        tempObj['PutRequest']['Item'][userArray[i][11][0]] = { "S": userArray[i][11][1]};
        // resume
        tempObj['PutRequest']['Item'][userArray[i][12][0]] = { "S": userArray[i][12][1]};
        // bio        
        tempObj['PutRequest']['Item'][userArray[i][13][0]] = { "S": userArray[i][13][1]};
        // profileStatsVisits - 15 [14]
        tempObj['PutRequest']['Item'][userArray[i][14][0]] = { "N": userArray[i][14][1]};
        // profileStatsViewGithub
        tempObj['PutRequest']['Item'][userArray[i][15][0]] = { "N": userArray[i][15][1]};
        // profileStatsViewCodePen
        tempObj['PutRequest']['Item'][userArray[i][16][0]] = { "N": userArray[i][16][1]};
        // profileStatsViewPortfolio
        tempObj['PutRequest']['Item'][userArray[i][17][0]] = { "N": userArray[i][17][1]};        
        // profileStatsViewLinkedIn
        tempObj['PutRequest']['Item'][userArray[i][18][0]] = { "N": userArray[i][18][1]};
        // profileStatsViewResume - 20 [19]
        tempObj['PutRequest']['Item'][userArray[i][19][0]] = { "N": userArray[i][19][1]};
        // experience
        tempObj['PutRequest']['Item'][userArray[i][20][0]] = { "S": userArray[i][20][1]};
        // timeWithRT
        tempObj['PutRequest']['Item'][userArray[i][21][0]] = { "S": userArray[i][27][1]};
        // rank
        tempObj['PutRequest']['Item'][userArray[i][22][0]] = { "S": userArray[i][22][1]};        
        // skillsProfessional
        tempObj['PutRequest']['Item'][userArray[i][23][0]] = { "L": userArray[i][23][1]};
        // skillsSoftware - 25 [24]
        tempObj['PutRequest']['Item'][userArray[i][24][0]] = { "L": userArray[i][24][1]};
        // skillsLanguages
        tempObj['PutRequest']['Item'][userArray[i][25][0]] = { "L": userArray[i][25][1]};
        // lessonsAttending
        tempObj['PutRequest']['Item'][userArray[i][26][0]] = { "L": userArray[i][26][1]};        
        // createdAt
        tempObj['PutRequest']['Item'][userArray[i][27][0]] = { "S": userArray[i][27][1]};
        // updatedAt - 29 [28]
        tempObj['PutRequest']['Item'][userArray[i][28][0]] = { "S": userArray[i][27][1]};        
        string[userTable].push(tempObj)
        
        // let lessonVotesArray = [];
        // // console.log(lessonArray[i][6][1].length);
        // for(let v = 0; v < userArray[i][6][1].length; v += 1){
        //     let tempObj = {
        //         "S": `${userArray[i][6][1][v]}`
        //     }
        //     // console.log(tempObj);
        //     lessonVotesArray.push(tempObj)
        // }
        // // console.log(lessonVotesArray);
        // tempObj['PutRequest']['Item'][userArray[i][6][0]] = { "L": lessonVotesArray};
    }
    // console.log(JSONString);
    JSONString = JSON.stringify(string)
    console.log(JSONString);
    fs.writeFileSync(`../../recursive_thinking_server/db_fill/${userTable}.json`, JSONString, 'utf8')
    let readUserObj = fs.readFileSync(`../../recursive_thinking_server/db_fill/${userTable}.json`, 'utf8');
    let parseReadUserObj = JSON.parse(readUserObj)
    // console.log(parseRead['RecursiveThinkingLessons'][0]['PutRequest']['Item']);
    let userObj = []
    for(let item = 0; item < parseReadUserObj['RecursiveThinkingDeveloperProfiles'].length; item += 1){
        let temp = AWS.DynamoDB.Converter.unmarshall(parseReadUserObj['RecursiveThinkingDeveloperProfiles'][item]['PutRequest']['Item'])
        userObj.push(temp)
    }
    userObj = JSON.stringify(userObj)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/${userTable}.json`, userObj, 'utf8')
}

buildJSONStringForUserOutput(allUsersArray, 'RecursiveThinkingDeveloperProfiles')


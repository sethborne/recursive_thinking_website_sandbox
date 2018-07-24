let fs = require('fs');
let AWS = require('aws-sdk');
let util = require('util');
const uuidv1 = require('uuid/v1');

let allFunctions = require('../all_functions/all_functions.js');
// console.log('in question', dateFunction.shiftDays('before', 45).toString());

let readJSONFromUserFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfiles.json', 'utf8');
let allUsers = JSON.parse(readJSONFromUserFile)
// console.log(allUsers);
// this is an array

let readJSONFromUserIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfilesIdArray.json', 'utf8');
let currentIdsForUsers = JSON.parse(readJSONFromUserIdFile)

let readJSONFromLessonIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingLessonsIdArray.json', 'utf8');
let currentIdsForLessons = JSON.parse(readJSONFromLessonIdFile)

// let arrayOfUserIDs = allFunctions.makeArrayFromObjectKey(allUsers, 'userId');
// let randomIndex = allFunctions.getRandomIndexOfArray(arrayOfUserIDs.length);

const allLessonsArray = [
    // Should not show on either Lessons or Upcoming Lessons
    [
        [ 'Id' ],
        [ 'title', 'Should not show on either Lessons or Upcoming Lessons'] ,
        [ 'date',  ' '],
        ['description', 'Of brilliant syntheses Apollonius of Perga astonishment brain is the seed of intelligence, tendrils of gossamer clouds extraplanetary consciousness, hearts of the stars trillion dream of the mind\'s eye, are creatures of the cosmos the sky calls to us muse about. Bits of moving fluff stirred by starlight Euclid, preserve and cherish that pale blue dot venture emerged into consciousness intelligent beings rich in mystery galaxies are creatures of the cosmos, encyclopaedia galactica, astonishment shores of the cosmic ocean Sea of Tranquility light years extraordinary claims require extraordinary evidence white dwarf, worldlets laws of physics and billions upon billions upon billions upon billions upon billions upon billions upon billions.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'a', 'b', 'c' ] ],
        [ 'scheduled', false ],
        [ 'createdAt', allFunctions.shiftDays('before', 45).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ],
    [
        [ 'Id' ],
        [ 'title', 'Designing with A-Frame VR'] ,
        [ 'date',  allFunctions.shiftDays('after', 1).toString() ],
        ['description', 'Bacon ipsum dolor amet beef ribs meatloaf filet mignon tail doner. Kevin corned beef pork salami prosciutto t-bone. Tri-tip cow shank beef ball tip. Rump turducken shank, drumstick biltong tenderloin shoulder t-bone. Pork belly ball tip beef ribs swine shoulder tri-tip flank biltong. Landjaeger cow meatball bacon shank, kevin jowl turkey sausage pork chop doner. Ground round beef filet mignon, fatback bresaola ribeye shank ham hock pork loin burgdoggen strip steak sausage pork belly. Burgdoggen pastrami beef ribs brisket frankfurter chicken. Cupim beef pork sirloin pancetta strip steak, shoulder hamburger filet mignon shank chuck pastrami boudin drumstick.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'z', 'y', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm' ] ],
        [ 'scheduled', true ],
        [ 'createdAt', allFunctions.shiftDays('before', 35).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a city with HTML & CSS'] ,
        [ 'date', allFunctions.shiftDays('after', 8).toString() ],
        ['description', 'Lies down . Eat a rug and furry furry hairs everywhere oh no human coming lie on counter do not get off counter demand to have some of whatever the human is cooking, then sniff the offering and walk away friends are not food the door is opening! how exciting oh, it is you, meh sleep head nudges for meow and walk away. That box? i can fit in that box if it smells like fish eat as much as you wish or meow and walk away, and sleep. Lounge in doorway. Cereal boxes make for five star accommodation lie in the sink all day. Spill litter box, scratch at owner, destroy all furniture, especially couch going to catch the red dot today going to catch the red dot today take a big fluffing crap and spill litter box, scratch at owner, destroy all furniture, especially couch leave hair on clothes.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'z', 'y', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l'] ],
        [ 'scheduled', true ],
        [ 'createdAt', allFunctions.shiftDays('before', 20).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a calculator with HTML, CSS & JavaScript'] ,
        [ 'date', allFunctions.shiftDays('after', 15).toString() ],
        ['description', 'Ice cream biscuit chocolate. Gingerbread gummi bears macaroon marshmallow topping. Gummies tiramisu croissant cupcake cake sweet roll oat cake oat cake gummies. Topping carrot cake marzipan soufflé. Cookie bonbon chocolate bar powder macaroon cheesecake. Jujubes gingerbread powder topping caramels toffee lollipop. Croissant cupcake cake cotton candy cheesecake soufflé. Powder tart halvah. Marshmallow tiramisu oat cake gummi bears halvah halvah. Lollipop lollipop marshmallow. Jelly oat cake candy croissant cupcake jujubes topping. Biscuit tootsie roll sweet. Croissant sugar plum donut marzipan. Pudding danish donut chocolate marzipan croissant wafer pastry danish. Pie fruitcake fruitcake oat cake sugar plum. Cake cake jelly-o'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'z', 'y', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o' ] ],
        [ 'scheduled', true ],
        [ 'createdAt', allFunctions.shiftDays('before', 5).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a timer with HTML, CSS & JavaScript'] ,
        [ 'date', allFunctions.shiftDays('after', 22).toString() ],
        ['description', 'You do not frighten us, English pig-dogs! Go and boil your bottoms, sons of a silly person! I blow my nose at you, so-called Ah-thoor Keeng, you and all your silly English K-n-n-n-n-n-n-n-niggits! Camelot! I do not want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time! Why do you think that she is a witch? Shut up! Will you shut up?! Now, look here, my good man. Listen. Strange women lying in ponds distributing swords is no basis for a system of government. Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony. You can not expect to wield supreme power just because some watery tart threw a sword at you!'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'z', 'y', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n'] ],
        [ 'scheduled', true ],
        [ 'createdAt', allFunctions.shiftDays('before', 15).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a website with HTML, CSS & JavaScript'] ,
        [ 'date', allFunctions.shiftDays('after', 29).toString() ],
        ['description', 'Anytime you learn something your time and energy are not wasted. There are no mistakes. You can fix anything that happens. Let your imagination be your guide. Almost everything is going to happen for you automatically - you do not have to spend any time working or worrying. How do you make a round circle with a square knife? That is your challenge for the day. Every day I learn. Let us make a nice big leafy tree. And just raise cain. I sincerely wish for you every possible joy life could bring. Every single thing in the world has its own personality - and it is up to you to make friends with the little rascals. We do not really know where this goes - and I am not sure we really care. Use what happens naturally, do not fight it.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'z', 'y', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p' ] ],
        [ 'scheduled', true ],
        [ 'createdAt', allFunctions.shiftDays('before', 10).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a web application with HTML, CSS & JavaScript'] ,
        [ 'date', allFunctions.shiftDays('after', 36).toString() ],
        ['description', 'Bicycle rights pug offal waistcoat iceland meggings affogato jianbing microdosing VHS shaman cold-pressed pop-up. Asymmetrical yr authentic distillery. Hexagon small batch jean shorts, wayfarers DIY cray pickled brooklyn shabby chic literally. Pug fam put a bird on it, drinking vinegar synth tacos plaid man braid leggings. Waistcoat pinterest skateboard street art tousled pok pok trust fund, dreamcatcher affogato. Pabst whatever swag cred, pug tbh humblebrag meditation pok pok. Cardigan small batch vape taxidermy. Raw denim prism stumptown direct trade keffiyeh dreamcatcher messenger bag brunch vexillologist truffaut salvia actually artisan viral. Meh banh mi squid copper mug. Readymade live-edge keytar meditation shaman umami fashion axe godard tacos everyday carry you probably have not heard of them gastropub 90s mixtape organic.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'z', 'y', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l' ] ],
        [ 'scheduled', true ],
        [ 'createdAt', allFunctions.shiftDays('before', 25).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ],
    [
        [ 'Id' ],
        [ 'title', 'Build a JavaScript Jukebox - LV6'] ,
        [ 'date', ' ' ],
        ['description', 'Pommy ipsum Sherlock a cuppa scrumpy terribly bit of a Jack the lad it\'s nicked beefeater, old girl cobbles damn Time Lord nutter double dutch nose rag. Horses for courses off the hook I\'m off to Bedfordshire chips not some sort of dosshouse roast beef, therewith goggledegook old girl. Time Lord curtain twitching getting on my wick bottled it a week on Sunday, black cab jellied eels full English breakast. Sweets picalilly cheesed off up North have a bash alright geezer warts and all, it\'s the bees knees and thus brainbox well fit in the jacksy, doolally ended up brown bread Dalek full English breakast jammy git.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'a', 'b', 'c', 'd', 'e', 'f' ] ],
        [ 'scheduled', false ],
        [ 'createdAt', allFunctions.shiftDays('before', 5).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ],
    [
        [ 'Id' ],
        [ 'title', 'Build a Clock with JavaScript/CSS - LV4'] ,
        [ 'date', ' ' ],
        ['description', 'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow\'s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters. Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'a', 'b', 'c', 'd' ] ],
        [ 'scheduled', false ],
        [ 'createdAt', allFunctions.shiftDays('before', 10).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building an Image Gallery - LV9'] ,
        [ 'date', ' ' ],
        ['description', 'It just needs more cowbell product management breakout fastworks but this is meaningless. Close the loop. Can I just chime in on that one. Paddle on both sides. Move the needle anti-pattern out of scope, yet i\'ll book a meeting so we can solution this before the sprint is over anti-pattern. Today shall be a cloudy day, thanks to blue sky thinking, we can now deploy our new ui to the cloud . Productize can we take this offline get six alpha pups in here for a focus group take five, punch the tree, and come back in here with a clear head gain traction, but face time. Let\'s not solutionize this right now parking lot it goalposts going forward, or design thinking i don\'t want to drain the whole swamp, i just want to shoot some alligators.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ] ],
        [ 'scheduled', false ],
        [ 'createdAt', allFunctions.shiftDays('before', 15).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a Countdown Clock with Javascript - LV7'] ,
        [ 'date', ' ' ],
        ['description', 'Just do what you think. I trust you can we try some other colours maybe I know somebody who can do this for a reasonable cost, yet can you use a high definition screenshot. Im not sure, try something else that\'s great, but can you make it work for ie 2 please, we don\'t need a backup, it never goes down! make it look like Apple. There are more projects lined up charge extra the next time the hair is just too polarising, but im not sure, try something else, nor i love it, but can you invert all colors? so can you lower the price for the website? make it high quality and please use html can you make the font a bit bigger and change it to times new roman? jazz it up a little bit make the picture of the cupcake look delicious make the purple more well, purple-er it looks so empty add some more hearts can you add a bit of pastel pink and baby blue because the purple alone looks too fancy okay can you put a cute quote on the right side of the site?'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ] ],
        [ 'scheduled', false ],
        [ 'createdAt', allFunctions.shiftDays('before', 20).toString() ],
        [ 'updatedAt' ],
        [ '_lessonCreatedBy']
    ]
]

// =========================================================================
// Create the file
// =========================================================================

// console.log(allLessonsArray.length);
// let lessonsIdArray = []
// for(let i = 0; i < allLessonsArray.length; i += 1){
//     lessonsIdArray.push(uuidv1())
// }
// // console.log(lessonIdArray);
// lessonsIdArray = JSON.stringify(lessonsIdArray)
// fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingLessonsIdArray.json`, lessonsIdArray, 'utf8')

// =========================================================================


if(currentIdsForLessons.length === allLessonsArray.length){
    console.log('Then it is true!');
}
else{
    let lessonsIdArray = []
    for(let i = 0; i < allLessonsArray.length; i += 1){
        lessonsIdArray.push(uuidv1())
    }
    lessonsIdArray = JSON.stringify(lessonsIdArray)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/RecursiveThinkingLessonsIdArray.json`, lessonsIdArray, 'utf8')
}

function buildJSONStringForLessonOutput(lessonArray, lessonTable){
    let JSONString = {

    }
    JSONString[lessonTable] = []
    for(let i = 0; i < lessonArray.length; i += 1){
        
        let tempObj = {
            PutRequest:{
                Item: {
                }
            }
        }
        // _lessonCreatedBy - 10
        // what if we set it to the value of a random index of the allUser
        // let arrayOfUserIDs = allFunctions.makeArrayFromObjectKey(allUsers, 'userId');
        let randomIndexCreatedBy = allFunctions.getRandomIndexOfArray(currentIdsForUsers.length);
        tempObj['PutRequest']['Item'][lessonArray[i][10][0]] = { "S": currentIdsForUsers[randomIndexCreatedBy]};
        // ID
        // tempObj['PutRequest']['Item'][lessonArray[i][0][0]] = { "S": lessonArray[i][0][1]};       
        tempObj['PutRequest']['Item'][lessonArray[i][0][0]] = { "S": currentIdsForLessons[i]};
        // console.log('GenId', uuidv1());
        // Title
        tempObj['PutRequest']['Item'][lessonArray[i][1][0]] = { "S": lessonArray[i][1][1]};
        // Date
        tempObj['PutRequest']['Item'][lessonArray[i][2][0]] = { "S": lessonArray[i][2][1]};
        // Description
        tempObj['PutRequest']['Item'][lessonArray[i][3][0]] = { "S": lessonArray[i][3][1]};
        // lessonTaughtByArray
        // This can not be the user who made the lesson
        let filteredPotentialTeachers = allUsers.filter(user => user.userId !== allUsers[randomIndexCreatedBy]['userId'])
        // make array of just user ids
        let filteredPotentialTeachersIds = allFunctions.makeArrayFromObjectKey(filteredPotentialTeachers, 'userId')
        // get array of unique users
        let taughtByArray = allFunctions.getArrayOfValuesAtAFixedLength(filteredPotentialTeachersIds, 2)
        // console.log('taughtbyArray', taughtByArray);
        // from this array - format it for Dynamo
        let taughtByUserArray = [];
        for(let t = 0; t < taughtByArray.length; t += 1){
            // console.log(t);
            let tempString = {
                "S": taughtByArray[t]
            }
            // console.log(tempString);
            taughtByUserArray.push(tempString)
        }
        // console.log('push', taughtByUserArray.length);
        tempObj['PutRequest']['Item'][lessonArray[i][4][0]] = { "L": taughtByUserArray};        
        // lessonAttendees
        // from all users filter out the 
        let lessonAttendeesArray = [...taughtByArray];
        // still need to put random amount here
        tempObj['PutRequest']['Item'][lessonArray[i][5][0]] = { "L": lessonArray[i][5][1]};              
        // lessonVotes
        let lessonVotesArray = [];
        // console.log(lessonArray[i][6][1].length);
        for(let v = 0; v < lessonArray[i][6][1].length; v += 1){
            let tempObj = {
                "S": `${lessonArray[i][6][1][v]}`
            }
            lessonVotesArray.push(tempObj)
        }
        // tempObj['PutRequest']['Item'][lessonArray[i][6][0]] = { "L": lessonArray[i][6][1]};
        tempObj['PutRequest']['Item'][lessonArray[i][6][0]] = { "L": lessonVotesArray};
        // scheduled
        tempObj['PutRequest']['Item'][lessonArray[i][7][0]] = { "BOOL": lessonArray[i][7][1]}
        // createdAt
        tempObj['PutRequest']['Item'][lessonArray[i][8][0]] = { "S": lessonArray[i][8][1]};
        // updatedAt
        tempObj['PutRequest']['Item'][lessonArray[i][9][0]] = { "S": lessonArray[i][8][1]}; 
        
        JSONString[lessonTable].push(tempObj)
    }
    // console.log(JSONString);
    JSONString = JSON.stringify(JSONString)
    // console.log(JSONString);
    fs.writeFileSync(`../../recursive_thinking_server/db_fill/${lessonTable}.json`, JSONString, 'utf8')
    let readLessonObj = fs.readFileSync(`../../recursive_thinking_server/db_fill/${lessonTable}.json`, 'utf8');
    let parseReadLessonObj = JSON.parse(readLessonObj)
    // console.log(parseRead['RecursiveThinkingLessons'][0]['PutRequest']['Item']);
    let lessonObj = []
    for(let item = 0; item < parseReadLessonObj['RecursiveThinkingLessons'].length; item += 1){
        let temp = AWS.DynamoDB.Converter.unmarshall(parseReadLessonObj['RecursiveThinkingLessons'][item]['PutRequest']['Item'])
        lessonObj.push(temp)
    }
    lessonObj = JSON.stringify(lessonObj)
    fs.writeFileSync(`../dynamoDB_mock_data_returns/${lessonTable}.json`, lessonObj, 'utf8')
}

buildJSONStringForLessonOutput(allLessonsArray, 'RecursiveThinkingLessons')


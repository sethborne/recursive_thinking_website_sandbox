// let AWS = require('aws-sdk');
// let docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
let fs = require('fs');
const uuidv1 = require('uuid/v1');

const allLessonsArray = [
    [
        [ 'Id' ],
        [ 'title', 'Designing with A-Frame VR'] ,
        [ 'date', new Date('08/08/2018').toString() ],
        ['description', 'Bacon ipsum dolor amet beef ribs meatloaf filet mignon tail doner. Kevin corned beef pork salami prosciutto t-bone. Tri-tip cow shank beef ball tip. Rump turducken shank, drumstick biltong tenderloin shoulder t-bone. Pork belly ball tip beef ribs swine shoulder tri-tip flank biltong. Landjaeger cow meatball bacon shank, kevin jowl turkey sausage pork chop doner. Ground round beef filet mignon, fatback bresaola ribeye shank ham hock pork loin burgdoggen strip steak sausage pork belly. Burgdoggen pastrami beef ribs brisket frankfurter chicken. Cupim beef pork sirloin pancetta strip steak, shoulder hamburger filet mignon shank chuck pastrami boudin drumstick.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [] ],
        [ 'createdAt', new Date('06/08/2018').toString() ],
        [ 'updatedAt', new Date('07/08/2018').toString() ],
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a city with HTML & CSS'] ,
        [ 'date', new Date('08/10/2018').toString() ],
        ['description', 'Lies down . Eat a rug and furry furry hairs everywhere oh no human coming lie on counter do not get off counter demand to have some of whatever the human is cooking, then sniff the offering and walk away friends are not food the door is opening! how exciting oh, it is you, meh sleep head nudges for meow and walk away. That box? i can fit in that box if it smells like fish eat as much as you wish or meow and walk away, and sleep. Lounge in doorway. Cereal boxes make for five star accommodation lie in the sink all day. Spill litter box, scratch at owner, destroy all furniture, especially couch going to catch the red dot today going to catch the red dot today take a big fluffing crap and spill litter box, scratch at owner, destroy all furniture, especially couch leave hair on clothes.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [] ],
        [ 'createdAt', new Date('06/10/2018').toString() ],
        [ 'updatedAt', new Date('07/10/2018').toString() ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a calculator with HTML, CSS & JavaScript'] ,
        [ 'date', new Date('08/12/2018').toString() ],
        ['description', 'Ice cream biscuit chocolate. Gingerbread gummi bears macaroon marshmallow topping. Gummies tiramisu croissant cupcake cake sweet roll oat cake oat cake gummies. Topping carrot cake marzipan soufflé. Cookie bonbon chocolate bar powder macaroon cheesecake. Jujubes gingerbread powder topping caramels toffee lollipop. Croissant cupcake cake cotton candy cheesecake soufflé. Powder tart halvah. Marshmallow tiramisu oat cake gummi bears halvah halvah. Lollipop lollipop marshmallow. Jelly oat cake candy croissant cupcake jujubes topping. Biscuit tootsie roll sweet. Croissant sugar plum donut marzipan. Pudding danish donut chocolate marzipan croissant wafer pastry danish. Pie fruitcake fruitcake oat cake sugar plum. Cake cake jelly-o'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [] ],
        [ 'createdAt', new Date('06/12/2018').toString() ],
        [ 'updatedAt', new Date('07/12/2018').toString() ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a timer with HTML, CSS & JavaScript'] ,
        [ 'date', new Date('08/12/2018').toString() ],
        ['description', 'You do not frighten us, English pig-dogs! Go and boil your bottoms, sons of a silly person! I blow my nose at you, so-called Ah-thoor Keeng, you and all your silly English K-n-n-n-n-n-n-n-niggits! Camelot! I do not want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time! Why do you think that she is a witch? Shut up! Will you shut up?! Now, look here, my good man. Listen. Strange women lying in ponds distributing swords is no basis for a system of government. Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony. You can not expect to wield supreme power just because some watery tart threw a sword at you!'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [] ],
        [ 'createdAt', new Date('06/12/2018').toString() ],
        [ 'updatedAt', new Date('07/12/2018').toString() ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a website with HTML, CSS & JavaScript'] ,
        [ 'date', new Date('08/14/2018').toString() ],
        ['description', 'Anytime you learn something your time and energy are not wasted. There are no mistakes. You can fix anything that happens. Let your imagination be your guide. Almost everything is going to happen for you automatically - you do not have to spend any time working or worrying. How do you make a round circle with a square knife? That is your challenge for the day. Every day I learn. Let us make a nice big leafy tree. And just raise cain. I sincerely wish for you every possible joy life could bring. Every single thing in the world has its own personality - and it is up to you to make friends with the little rascals. We do not really know where this goes - and I am not sure we really care. Use what happens naturally, do not fight it.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [] ],
        [ 'createdAt', new Date('06/14/2018').toString() ],
        [ 'updatedAt', new Date('07/14/2018').toString() ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Building a web application with HTML, CSS & JavaScript'] ,
        [ 'date', new Date('08/16/2018').toString() ],
        ['description', 'Bicycle rights pug offal waistcoat iceland meggings affogato jianbing microdosing VHS shaman cold-pressed pop-up. Asymmetrical yr authentic distillery. Hexagon small batch jean shorts, wayfarers DIY cray pickled brooklyn shabby chic literally. Pug fam put a bird on it, drinking vinegar synth tacos plaid man braid leggings. Waistcoat pinterest skateboard street art tousled pok pok trust fund, dreamcatcher affogato. Pabst whatever swag cred, pug tbh humblebrag meditation pok pok. Cardigan small batch vape taxidermy. Raw denim prism stumptown direct trade keffiyeh dreamcatcher messenger bag brunch vexillologist truffaut salvia actually artisan viral. Meh banh mi squid copper mug. Readymade live-edge keytar meditation shaman umami fashion axe godard tacos everyday carry you probably have not heard of them gastropub 90s mixtape organic.'],
        [ 'lessonTaughtBy', [] ],
        [ 'lessonAttendees', []],
        [ 'lessonVotes', [] ],
        [ 'createdAt', new Date('06/16/2018').toString() ],
        [ 'updatedAt', new Date('07/16/2018').toString() ]
    ]
]

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
        // ID
        // tempObj['PutRequest']['Item'][lessonArray[i][0][0]] = { "S": lessonArray[i][0][1]};       
        tempObj['PutRequest']['Item'][lessonArray[i][0][0]] = { "S": uuidv1()};
        // console.log('GenId', uuidv1());
        // Title
        tempObj['PutRequest']['Item'][lessonArray[i][1][0]] = { "S": lessonArray[i][1][1]};
        // Date
        tempObj['PutRequest']['Item'][lessonArray[i][2][0]] = { "S": lessonArray[i][2][1]};
        // Description
        tempObj['PutRequest']['Item'][lessonArray[i][3][0]] = { "S": lessonArray[i][3][1]};
        // lessonTaughtByArray
        tempObj['PutRequest']['Item'][lessonArray[i][4][0]] = { "L": lessonArray[i][4][1]};        
        // lessonAttendees
        tempObj['PutRequest']['Item'][lessonArray[i][5][0]] = { "L": lessonArray[i][5][1]};              
        // lessonVotes
        tempObj['PutRequest']['Item'][lessonArray[i][6][0]] = { "L": lessonArray[i][6][1]};              
        // createdAt
        tempObj['PutRequest']['Item'][lessonArray[i][7][0]] = { "S": lessonArray[i][7][1]};
        // updatedAt
        tempObj['PutRequest']['Item'][lessonArray[i][8][0]] = { "S": lessonArray[i][8][1]};        
        JSONString[lessonTable].push(tempObj)
    }
    // console.log(JSONString);
    let JSONString1 = JSON.stringify(JSONString)
    console.log(JSONString1);
    fs.writeFileSync(`${lessonTable}.json`, JSONString1, 'utf8')
}

buildJSONStringForLessonOutput(allLessonsArray, 'RecursiveThinkingLessons')


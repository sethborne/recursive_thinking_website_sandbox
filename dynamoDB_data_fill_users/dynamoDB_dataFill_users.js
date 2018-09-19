let fs = require('fs');
let AWS = require('aws-sdk');
let util = require('util');
const uuidv1 = require('uuid/v1');

let allFunctions = require('../all_functions/all_functions.js');
// console.log('in question', allFunctions.shiftDays('before', 45).toString());
let arrayMethods = require('../all_functions/arrayMethods.js')

let readJSONFromLessonFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingLessons.json', 'utf8');
// console.log(readJSONFromLessonFile);
let allLessons = JSON.parse(readJSONFromLessonFile);
// console.log('allLessons', allLessons);

let readJSONFromProfileSkillsLanguage = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingProfileSkillsLanguage.json', 'utf8');
let allProfileSkillsLanguage = JSON.parse(readJSONFromProfileSkillsLanguage);

let readJSONFromProfileSkillsProfessional = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingProfileSkillsProfessional.json', 'utf8');
let allProfileSkillsProfessional = JSON.parse(readJSONFromProfileSkillsProfessional);

let readJSONFromProfileSkillsSoftware = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingProfileSkillsSoftware.json', 'utf8');
let allProfileSkillsSoftware = JSON.parse(readJSONFromProfileSkillsSoftware);

// console.log('skillLang', allProfileSkillsLanguage);
// console.log('skillProf', allProfileSkillsProfessional);
// console.log('skillSoft', allProfileSkillsSoftware);

let readJSONFromUserIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfilesIdArray.json', 'utf8');
let currentIdsForUsers = JSON.parse(readJSONFromUserIdFile)

let readJSONFromRankIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingRanksIdArray.json', 'utf8');
let currentIdsForRanks = JSON.parse(readJSONFromRankIdFile)
// console.log(currentIdsForRanks);

// 1 yr -  365
// 2 yr -  760
// 3 yr - 1095
// 4 yr - 1460
// 5 yr - 1825

let emptyString = ' '

// image path setup for either front end
// old FE
// let picturePrefixPath = `../images/`;
// sandbox FE
// let picturePrefixPath = `../`

const allUsersArray = [
    // Should not show on either Lessons or Upcoming Lessons
    [
        // Kevin Bacon - 1
        [ 'userId' ],
        [ 'username', 'onlySixPeopleAway'] ,
        // [ 'picture',  '../images/avatar2.png'],
        [ 'avatar',  `avatar2.png`],
        [ 'name', 'Kevin Norwood Bacon' ],
        [ 'email', 'onlySixPeopleAway@gmail.com'],
        [ 'city', 'Philadelphia' ],
        [ 'state', 'PA' ],
        [ 'employer', 'Bacon Bros, Inc.' ],
        [ 'title', 'Dancer' ],
        [ 'linkGithub', emptyString ],
        [ 'linkCodepen', emptyString ],
        [ 'linkLinkedin', emptyString ],
        [ 'linkPortfolioWebsite', 'http://www.baconbros.com' ],
        [ 'linkResume', emptyString ],
        [ 'bio', 'Bacon ipsum dolor amet doner brisket jowl ground round bacon burgdoggen. Prosciutto short loin sirloin, filet mignon meatball capicola picanha rump pork belly ground round t-bone buffalo sausage swine. Ham hock jowl leberkas, bresaola chuck shoulder short loin landjaeger brisket ground round strip steak prosciutto sirloin. Shank t-bone pork belly, picanha meatloaf short ribs jerky swine turkey kevin ham hock. Sirloin hamburger short loin chicken jerky beef ribs swine shank landjaeger bacon cow.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1825).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 240).toString() ],
        [ 'updatedAt' ]
    ], 
    [
        // Cat Lady - 2
        [ 'userId' ],
        [ 'username', 'meowmeow'] ,
        [ 'avatar',  `avatar4.png`],
        [ 'name', 'Selina Kyle' ],
        [ 'email', 'meowmeow@gmail.com'],
        [ 'city', 'Gotham' ],
        [ 'state', 'NY' ],
        [ 'employer', 'DC Comics' ],
        [ 'title', 'President of Me-ow' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Catwoman' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Bring your owner a dead bird hide when guests come over always ensure to lay down in such a manner that tail can lightly brush human\'s nose . Meeeeouw stand with legs in litter box, but poop outside so trip on catnip have a lot of grump in yourself because you can\'t forget to be grumpy and not be like king grumpy cat but chase imaginary bugs. Take a big fluffing crap headbutt owner\'s knee and take a big fluffing crap 💩 mice meowzer yet slap owner\'s face at 5am until human fills food dish use lap as chair. Stuff and things. Intently sniff hand. Lick left leg for ninety minutes, still dirty russian blue. ' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 900).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 240).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Cupcakes - 3
        [ 'userId' ],
        [ 'username', 'letThemEatCake'] ,
        [ 'avatar',  'avatar5.png'],
        [ 'name', 'Amelia Simmons' ],
        [ 'email', 'letThemEatCake@gmail.com'],
        [ 'city', 'Hartford' ],
        [ 'state', 'CT' ],
        [ 'employer', 'American Cookery' ],
        [ 'title', 'Yes, Chef' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/American_Cookery' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Cupcake ipsum dolor sit amet. Gummies brownie halvah donut. Oat cake soufflé pastry. Gingerbread bonbon marshmallow. Danish toffee pastry. Halvah cake candy icing powder chocolate bar marzipan. Carrot cake bonbon candy canes jelly-o danish. Pudding wafer powder marshmallow. Jelly chupa chups pie pudding toffee icing gummies sweet jujubes. Powder tootsie roll tootsie roll topping bonbon bear claw chocolate. Pudding wafer powder jelly-o. Sesame snaps jelly beans cake danish jujubes chocolate bear claw bonbon sweet.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1500).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 500).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Cupcakes - 4
        [ 'userId' ],
        [ 'username', 'tablesShallBeRound'] ,
        [ 'avatar',  'avatar1.png'],
        [ 'name', 'King Authur' ],
        [ 'email', 'tablesShallBeRound@gmail.com'],
        [ 'city', 'Camelot' ],
        [ 'state', 'WA' ],
        [ 'employer', 'United Kingdom' ],
        [ 'title', 'King of the Britains' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Monty_Python_and_the_Holy_Grail' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Well, how\'d you become king, then? Listen. Strange women lying in ponds distributing swords is no basis for a system of government. Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony. You can\'t expect to wield supreme power just \'cause some watery tart threw a sword at you! I don\'t want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time!' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1250).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 600).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Rob Ross - 5
        [ 'userId' ],
        [ 'username', 'happyTrees4All'] ,
        [ 'avatar',  'avatar2.png'],
        [ 'name', 'Robert Ross' ],
        [ 'email', 'happyTrees4All@gmail.com'],
        [ 'city', 'Daytona Beach' ],
        [ 'state', 'FL' ],
        [ 'employer', 'Happy Tree Co.' ],
        [ 'title', 'Sir Paints-a-Lot' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Bob_Ross' ],
        [ 'resume', emptyString ],
        [ 'bio', 'We\'ll put all the little clouds in and let them dance around and have fun. Trees cover up a multitude of sins. Let\'s put some happy trees and bushes back in here. We don\'t have anything but happy trees here. Nice little fluffy clouds laying around in the sky being lazy. Just take out whatever you don\'t want. It\'ll change your entire perspective. You can create beautiful things - but you have to see them in your mind first. There\'s nothing wrong with having a tree as a friend. Just let go - and fall like a little waterfall.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1600).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 400).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Hipster - 6
        [ 'userId' ],
        [ 'username', 'oneTallBoyToRuleThemAll'] ,
        [ 'avatar',  'avatar_default.png'],
        [ 'name', 'Sir Von Douchebag' ],
        [ 'email', 'oneTallBoyToRuleThemAll@gmail.com'],
        [ 'city', 'Brooklyn' ],
        [ 'state', 'NY' ],
        [ 'employer', 'Pabst Blue Ribbion Brewing' ],
        [ 'title', 'Annoying Asshat' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Hipster_(contemporary_subculture)' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Paleo ugh selfies, pork belly meh sartorial narwhal cornhole offal. Quinoa distillery subway tile 90\'s green juice, bushwick shoreditch slow-carb messenger bag. Kale chips man braid church-key yuccie distillery chartreuse. Shoreditch meh heirloom echo park tumeric adaptogen literally helvetica gentrify la croix tattooed affogato roof party bushwick. Blue bottle microdosing food truck green juice keytar fashion axe vice shabby chic literally taxidermy succulents PBR&B listicle. Seitan cloud bread bicycle rights portland. Letterpress hoodie irony, pabst af pickled plaid wayfarers narwhal gastropub sriracha.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 100).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 50).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Office Boss - 7
        [ 'userId' ],
        [ 'username', 'yeahImGonnaNeed'] ,
        [ 'avatar',  'avatar3.png'],
        [ 'name', 'Bill Lumbergh' ],
        [ 'email', 'yeahImGonnaNeed@gmail.com'],
        [ 'city', 'Austin' ],
        [ 'state', 'TX' ],
        [ 'employer', 'Initech' ],
        [ 'title', 'Vice President' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Office_Space' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Push back take five, punch the tree, and come back in here with a clear head killing it. Please advise soonest run it up the flagpole, ping the boss and circle back forcing function prairie dogging, for pig in a python. What do you feel you would bring to the table if you were hired for this position knowledge is power so draw a line in the sand quick win. Baseline the procedure and samepage your department today shall be a cloudy day, thanks to blue sky thinking, we can now deploy our new ui to the cloud but productize. Upstream selling. Highlights . Table the discussion high turnaround rate but shoot me an email or streamline, yet minimize backwards overflow nor we need to start advertising on social media, optimize for search. Synergize productive mindfulness when does this sunset?' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1250).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 250).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Dread Pirate Roberts - 8
        [ 'userId' ],
        [ 'username', 'blackbart'] ,
        [ 'avatar',  'avatar_default.png'],
        [ 'name', 'One Eyed Willy' ],
        [ 'email', 'blackbart@gmail.com'],
        [ 'city', 'Astoria' ],
        [ 'state', 'OR' ],
        [ 'employer', 'The Inferno, Inc.' ],
        [ 'title', 'Captain' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'http://goonies.wikia.com/wiki/One-Eyed_Willy' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow\'s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.<br><br>Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1200).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 120).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Carl - 9
        [ 'userId' ],
        [ 'username', 'theCosmostist'] ,
        [ 'avatar',  'avatar1.png'],
        [ 'name', 'Carl Sagan' ],
        [ 'email', 'theCosmostist@gmail.com'],
        [ 'city', 'Brooklyn' ],
        [ 'state', 'NY' ],
        [ 'employer', 'SETI' ],
        [ 'title', 'Chief Ear' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Carl_Sagan' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Not a sunrise but a galaxyrise prime number! Vangelis. Hundreds of thousands. Billions upon billions. Great turbulent clouds Rig Veda. Radio telescope bits of moving fluff take root and flourish, astonishment. Descended from astronomers dream of the mind\'s eye descended from astronomers courage of our questions, preserve and cherish that pale blue dot realm of the galaxies, emerged into consciousness, Drake Equation take root and flourish two ghostly white figures in coveralls and helmets are soflty dancing brain is the seed of intelligence at the edge of forever, Cambrian explosion cosmic ocean, ship of the imagination astonishment.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 2000).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 600).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Sam - 10
        [ 'userId' ],
        [ 'username', 'badassMofo'] ,
        [ 'avatar',  'avatar2.png'],
        [ 'name', 'Samuel L. Jackson' ],
        [ 'email', 'badassMofo@gmail.com'],
        [ 'city', 'Washington' ],
        [ 'state', 'D.C.' ],
        [ 'employer', 'Wallace Enterprises' ],
        [ 'title', 'Fixer' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Samuel_L._Jackson' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Well, the way they make shows is, they make one show. That show\'s called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they\'re going to make more shows. Some pilots get picked and become television programs. Some don\'t, become nothing. She starred in one of the ones that became nothing. Your bones don\'t break, mine do. That\'s clear. Your cells react to bacteria and viruses differently than mine. You don\'t get sick, I do.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 800).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 230).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Tony - 11
        [ 'userId' ],
        [ 'username', 'thebirdman'] ,
        [ 'avatar',  'avatar2.png'],
        [ 'name', 'Tony Hawk' ],
        [ 'email', 'thebirdman@gmail.com'],
        [ 'city', 'San Diego' ],
        [ 'state', 'CA' ],
        [ 'employer', 'Boom Boom HuckJam' ],
        [ 'title', 'Boarder Man' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Tony_Hawk' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Skate ipsum dolor sit amet, fastplant melancholy deck rock and roll. 540 invert nose blunt switch. Judo air pressure flip grind freestyle. Pogo feeble gap Video Days pump. 50-50 hang ten fakie frigid air. Frigid air bruised heel ollie rocket air. 720 g-turn hang ten sketchy Streetstyle in Tempe. Bigspin half-cab full pipe Gator cab flip. Fakie Rob Welsh wax pump nose slide. Shoveit casper pivot half-cab freestyle Streetstyle in Tempe. Bruised heel Alan Gelfand Christ air stalefish judo air handplant. Nose-bump Elissa Steamer varial shinner pump nollie. 540 birdie transition heel flip cab flip.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1370).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 420).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Will - 12
        [ 'userId' ],
        [ 'username', 'numberOne'] ,
        [ 'avatar',  'avatar2.png'],
        [ 'name', 'William Thomas Riker' ],
        [ 'email', 'numberOne@gmail.com'],
        [ 'city', 'Nome' ],
        [ 'state', 'AK' ],
        [ 'employer', 'United Federation of Planets' ],
        [ 'title', 'Commanding Officer' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/William_Riker' ],
        [ 'resume', emptyString ],
        [ 'bio', 'But the probability of making a six is no greater than that of rolling a seven. The Enterprise computer system is controlled by three primary main processor cores, cross-linked with a redundant melacortz ramistat, fourteen kiloquad interface modules. Sorry, Data. A lot of things can change in twelve years, Admiral. Fate. It protects fools, little children, and ships named "Enterprise." Travel time to the nearest starbase? When has justice ever been as simple as a rule book? I\'d like to think that I haven\'t changed those things, sir. Some days you get the bear, and some days the bear gets you. Maybe if we felt any human loss as keenly as we feel one of those close to us, human history would be far less bloody.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 3420).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 358).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Marty - 13
        [ 'userId' ],
        [ 'username', 'timeTraveler'] ,
        [ 'avatar',  'avatar2.png'],
        [ 'name', 'Marty McFly' ],
        [ 'email', 'timeTraveler@gmail.com'],
        [ 'city', 'Hill Valley' ],
        [ 'state', 'CA' ],
        [ 'employer', 'Brown Enterprises' ],
        [ 'title', 'Time Traveler' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Marty_McFly' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Yeah, it\'s in the back. You too. What you got under here? That was the day I invented time travel. I remember it vividly. I was standing on the edge of my toilet hanging a clock, the porces was wet, I slipped, hit my head on the edge of the sink. And when I came to I had a revelation, a avatar, a avatar in my head, a avatar of this. This is what makes time travel possible. The flux capacitor. I don\'t worry. this is all wrong. I don\'t know what it is but when I kiss you, it\'s like kissing my brother. I guess that doesn\'t make any sense, does it?' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1985).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 85).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Walt - 14
        [ 'userId' ],
        [ 'username', 'heisenberg'] ,
        [ 'avatar',  'avatar2.png'],
        [ 'name', 'Walter White' ],
        [ 'email', 'heisenberg@gmail.com'],
        [ 'city', 'Albuquerque' ],
        [ 'state', 'NM' ],
        [ 'employer', 'A1 Car Wash' ],
        [ 'title', 'Lead Chemist' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Walter_White_(Breaking_Bad)' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Did he speak to you? Would you just answer? What things? What people? A month ago, Gus was trying to kill both of us. And now, he pulls you out of the lab and employs you as... what... a, an assistant gunman? A tough guy? Does that make any sense to you? He says he sees something in you. What kind of game is he playing. Does he think you\'re that naive? He can\'t truly think that you\'d forget... let alone Gale, let alone Victor... and all the horror that goes along with all of that. It\'s enough. This is still the best way. You go after him with a gun, you\'ll never get out of it alive.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1640).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 164).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Saul - 15
        [ 'userId' ],
        [ 'username', 'betterCallMe'] ,
        [ 'avatar',  'avatar2.png'],
        [ 'name', 'Saul Goodman' ],
        [ 'email', 'betterCallMe@gmail.com'],
        [ 'city', 'Albuquerque' ],
        [ 'state', 'NM' ],
        [ 'employer', 'Law Offices of Saul Goodman' ],
        [ 'title', 'Lawyer' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Saul_Goodman' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Hand me that little thing, bin. This is the nail salon, right. I take your dirty money and I slip it into the salon\'s nice clean cash flow - that\'s called layering. Final step - integration. The revenues from the salon go to the owner - that\'s you! Your filthy drug money has been transformed into nice clean taxable income brought to you by a savvy investment in a thriving business. Yeah and if you wanna stay a criminal and not become say a convict, then maybe you should grow up and listen to your lawyer. They take every penny and you go in the can for felony tax evasion. Ouch! What was your mistake? You didn\'t launder your money! Now, you give me your money, okay that\'s called placement.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1640).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 164).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Hodor  - 16
        [ 'userId' ],
        [ 'username', 'hodorhodor'] ,
        [ 'avatar',  'avatar2.png'],
        [ 'name', 'Hodor' ],
        [ 'email', 'hodorhodor@gmail.com'],
        [ 'city', 'Hodor' ],
        [ 'state', 'hodor' ],
        [ 'employer', 'Hodor hodor hodor hodor' ],
        [ 'title', 'Hodor' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/List_of_A_Song_of_Ice_and_Fire_characters#Hodor' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Hodor! Hodor hodor, hodor hodor hodor? Hodor! HODOR! Hodor hodor, hodor hodor hodor? Hodor! Hodor hodor, hodor; hodor hodor hodor hodor? HODOR! Hodor, hodor... Hodor hodor hodor? Hodor hodor HODOR! Hodor hodor... Hodor hodor hodor. Hodor hodor hodor? Hodor! Hodor; hodor hodor hodor hodor? Hodor hodor hodor? Hodor! Hodor hodor. HODOR! Hodor, hodor hodor, hodor? Hodor, hodor!?! Hodor hodor hodor!' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1234).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 123).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Fox  - 17
        [ 'userId' ],
        [ 'username', 'iWantToBelieve'] ,
        [ 'avatar',  'avatar2.png'],
        [ 'name', 'Fox Mulder' ],
        [ 'email', 'iWantToBelieve@gmail.com'],
        [ 'city', 'Chilmark' ],
        [ 'state', 'Massachusetts' ],
        [ 'employer', 'Federal Bureau of Investigation' ],
        [ 'title', 'Special Agent' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Fox_Mulder' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Scully, your\'re not going to believe this. Something Weird. A UFO Party. I have a life. I saw Elvis in a potato chip once. Whatever tape you found in that VCR, it isn\'t mine. I scream, you scream, we all scream for nonfat Tofutti rice dreamsicles. You ever seen a UFO in these parts? Before anyone passes judgement, may I remind you, we are in the Artic. Hey, Scully, do you think you could ever cannibalize someone? Well, not if drawsting pants come back into style. I think it\'s remotely plausible that someone might think you\'re hot. We found out you used to be a dog-faced boy.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 4242).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 424).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Grace  - 18
        [ 'userId' ],
        [ 'username', 'amazingGrace'] ,
        [ 'avatar',  'avatar4.png'],
        [ 'name', 'Grace Brewster Murray Hopper' ],
        [ 'email', 'amazingGrace@gmail.com'],
        [ 'city', 'New York City' ],
        [ 'state', 'NY' ],
        [ 'employer', 'United States Navy' ],
        [ 'title', 'Rear Admiral' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Grace_Hopper' ],
        [ 'resume', emptyString ],
        [ 'bio', 'A ship in port is safe, but that\'s not what ships are built for. It is often easier to ask for forgiveness than to ask for permission. You don\'t manage people; you manage things. You lead people. If it\'s a good idea, go ahead and do it. It\'s much easier to apologize than it is to get permission. Leadership is a two-way street, loyalty up and loyalty down. Respect for one\'s superiors; care for one\'s crew.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1906).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 190).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Margaret  - 19
        [ 'userId' ],
        [ 'username', 'stacksOfCode'] ,
        [ 'avatar',  'avatar5.png'],
        [ 'name', 'Margaret Heafield Hamilton' ],
        [ 'email', 'stacksOfCode@gmail.com'],
        [ 'city', 'Paoli' ],
        [ 'state', 'IN' ],
        [ 'employer', 'Hamilton Technologies' ],
        [ 'title', 'CEO' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Margaret_Hamilton_(scientist)' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Looking back, we were the luckiest people in the world. There was no choice but to be pioneers; no time to be beginners. Apollo 8 comes a close second, it not equal, to Apollo 11 for the most exciting, memorable moments on the Apollo project. Looking back, we were the luckiest people in the world. There was no choice but to be pioneers; no time to be beginners. Apollo 8 comes a close second, it not equal, to Apollo 11 for the most exciting, memorable moments on the Apollo project.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1936).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 136).toString() ],
        [ 'updatedAt' ]
    ],
    [
        // Chuck  - 20
        [ 'userId' ],
        [ 'username', 'roundhouseToTheFace'] ,
        [ 'avatar',  'avatar1.png'],
        [ 'name', 'Carlos (Chuck) Ray Norris' ],
        [ 'email', 'roundhouseToTheFace@gmail.com'],
        [ 'city', 'Ryan' ],
        [ 'state', 'OK' ],
        [ 'employer', 'Roundhouse Inc.' ],
        [ 'title', 'Ranger' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Chuck_Norris' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Chuck ipsum. Chuck Norris doesn’t need to swallow when eating food. Chuck Norris once kicked a baby elephant into puberty. Chuck Norris’ roundhouse kick is so powerful, it can be seen from outer space by the naked eye. Chuck Norris does not hunt because the word hunting infers the probability of failure. Chuck Norris goes killing.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1940).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 194).toString() ],
        [ 'updatedAt' ]
    ],
    [
        //   - 21
        [ 'userId' ],
        [ 'username', 'crank'] ,
        [ 'avatar',  'avatar3.png'],
        [ 'name', 'William Gary Busey' ],
        [ 'email', 'crank@gmail.com'],
        [ 'city', 'Goose Creek' ],
        [ 'state', 'TX' ],
        [ 'employer', 'I\'m with Busey' ],
        [ 'title', 'Star' ],
        [ 'github', emptyString ],
        [ 'codepen', emptyString ],
        [ 'linkedin', emptyString ],
        [ 'portfolioWebsite', 'https://en.wikipedia.org/wiki/Gary_Busey' ],
        [ 'resume', emptyString ],
        [ 'bio', 'Listen to the silence. And when the silence is deafening, you\'re in the center of your own universe. Did you feel that? Look at me - I\'m not out of breath anymore! I would like to give you a backstage pass to my imagination.Go with the feeling of the nature. Take it easy. Know why you\'re here. And remember to balance your internal energy with the environment. It\'s OK to get Rib-grease on your face, because you\'re allowing people to see that you\'re proud of these ribs.' ],
        [ 'profileStatsVisits', '0' ],
        [ 'profileStatsViewsGithub', '0' ],
        [ 'profileStatsViewsCodePen', '0' ],
        [ 'profileStatsViewsPortfolio', '0' ],
        [ 'profileStatsViewsLinkedIn', '0' ],
        [ 'profileStatsViewsResume', '0' ],
        [ 'experience', allFunctions.shiftDays('before', 1944).toString()],
        [ 'timeWithRT' ],
        [ 'rank' ],
        [ 'skillsProfessional', [] ],
        [ 'skillsSoftware', [] ],
        [ 'skillsLanguages', [] ],
        [ 'lessonStatus' ],
        [ 'admin' ],
        [ 'inactive', 'false'],
        [ 'isProfileSetup', 'true'],
        [ 'lastActive' ],
        [ 'createdAt', allFunctions.shiftDays('before', 944).toString() ],
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
    readJSONFromUserIdFile = fs.readFileSync('../dynamoDB_mock_data_returns/RecursiveThinkingDeveloperProfilesIdArray.json', 'utf8');
    currentIdsForUsers = JSON.parse(readJSONFromUserIdFile) 
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
        // avatar
        tempObj['PutRequest']['Item'][userArray[i][2][0]] = { "S": userArray[i][2][1]};
        // name
        tempObj['PutRequest']['Item'][userArray[i][3][0]] = { "S": userArray[i][3][1]};
        // email - 5 [4]
        tempObj['PutRequest']['Item'][userArray[i][4][0]] = { "S": userArray[i][4][1]};
        // city
        tempObj['PutRequest']['Item'][userArray[i][5][0]] = { "S": userArray[i][5][1]};        
        // state
        tempObj['PutRequest']['Item'][userArray[i][6][0]] = { "S": userArray[i][6][1]};
        // employer
        tempObj['PutRequest']['Item'][userArray[i][7][0]] = { "S": userArray[i][7][1]};
        // title
        tempObj['PutRequest']['Item'][userArray[i][8][0]] = { "S": userArray[i][8][1]};
        // github - 10 [9]
        tempObj['PutRequest']['Item'][userArray[i][9][0]] = { "S": userArray[i][9][1]};
        // codepen
        tempObj['PutRequest']['Item'][userArray[i][10][0]] = { "S": userArray[i][10][1]};        
        // linkedin
        tempObj['PutRequest']['Item'][userArray[i][11][0]] = { "S": userArray[i][11][1]};
        // portfolioWebsite        
        tempObj['PutRequest']['Item'][userArray[i][12][0]] = { "S": userArray[i][12][1]};
        // resume
        tempObj['PutRequest']['Item'][userArray[i][13][0]] = { "S": userArray[i][13][1]};
        // bio - 15 [14]
        tempObj['PutRequest']['Item'][userArray[i][14][0]] = { "S": userArray[i][14][1]};
        // profileStatsVisits 
        tempObj['PutRequest']['Item'][userArray[i][15][0]] = { "N": userArray[i][15][1]};
        // profileStatsViewsGithub
        tempObj['PutRequest']['Item'][userArray[i][16][0]] = { "N": userArray[i][16][1]};
        // profileStatsViewsCodePen
        tempObj['PutRequest']['Item'][userArray[i][17][0]] = { "N": userArray[i][17][1]};
        // profileStatsViewsPortfolio
        tempObj['PutRequest']['Item'][userArray[i][18][0]] = { "N": userArray[i][18][1]};        
        // profileStatsViewsLinkedIn - 20 [19]
        tempObj['PutRequest']['Item'][userArray[i][19][0]] = { "N": userArray[i][19][1]};
        // profileStatsViewsResume 
        tempObj['PutRequest']['Item'][userArray[i][20][0]] = { "N": userArray[i][20][1]};
        // experience
        tempObj['PutRequest']['Item'][userArray[i][21][0]] = { "S": userArray[i][21][1]};
        // timeWithRT
        tempObj['PutRequest']['Item'][userArray[i][22][0]] = { "S": userArray[i][22][1]};
        // rank
        // we'll want to ref in rank data, then call for a random index of that array
        let randomArrayIndex = allFunctions.getRandomIndexOfArray(currentIdsForRanks.length);
        tempObj['PutRequest']['Item'][userArray[i][23][0]] = { "S": currentIdsForRanks[randomArrayIndex]}; 
        
        function generateUserSkillArray(skillArray){
          let tempSkillArray = [];
          for(let i = 0; i < skillArray.length; i += 1){
            // each item
            if(skillArray[i]['_usersWithSkill'].includes(currentIdsForUsers[i])){
              //true 
              let tempString = {
                "S": skillArray[i]['Id']
              };
              tempSkillArray.push(tempString)
            }
            else {
              //false do nothing
            }
          }
          return tempSkillArray;
        }
        // skillsProfessional  - 25 [24]
        // console.log('skillLang', allProfileSkillsLanguage);
        // console.log('skillProf', allProfileSkillsProfessional);
        // console.log('skillSoft', allProfileSkillsSoftware);
        tempObj['PutRequest']['Item'][userArray[i][24][0]] = { "L": generateUserSkillArray(allProfileSkillsLanguage)};
        // skillsSoftware
        tempObj['PutRequest']['Item'][userArray[i][25][0]] = { "L": generateUserSkillArray(allProfileSkillsProfessional)};
        // skillsLanguages
        tempObj['PutRequest']['Item'][userArray[i][26][0]] = { "L": generateUserSkillArray(allProfileSkillsSoftware)};
        
        // lessonStatus - object - where key is the lesson id, and it has a value of 0 (no), 1(yes), 2(maybe).  if a lesson id does not exist in status, it gets all buttons.  if it does, it gets corresponding button
        // get lessons
        // return an array of lessons, where the current user is in the lesson.lessonAttendingArray
            let lessonsUserAttending = []
            allLessons.forEach(lesson => {
              // console.log(lesson.lessonAttendees, currentIdsForUsers[i]);
              // console.log(lesson.lessonAttendees.includes(currentIdsForUsers[i]));
              if(lesson.lessonAttendees.includes(currentIdsForUsers[i])){
                lessonsUserAttending.push(lesson)
              }
            })
            // console.log('userAttend', lessonsUserAttending);
            // console.log(currentIdsForUsers[i], lessonsUserAttending);
            let lessonsUserAttendingId = allFunctions.makeArrayFromObjectKey(lessonsUserAttending, 'Id')
            // diff arrays to get not attending
            let lessonsUserNotYetAttending = arrayMethods.diffArrays(allLessons, lessonsUserAttending)
            let lessonsUserNotYetAttendingId = allFunctions.makeArrayFromObjectKey(lessonsUserNotYetAttending, 'Id')
            // from the not attending - lets select a random number of them (1/3 not attend, 1/3 maybe)
            let randomNumberOfLessonsNotAttending = allFunctions.getRandomNumber(Math.ceil((lessonsUserNotYetAttendingId.length - 1) / 2), 1)
            // loop randomNumberof times, make no array
            let lessonsUserNotAttendingId = []
            for(let i = 0; i < randomNumberOfLessonsNotAttending; i += 1){
              let randomIndex = allFunctions.getRandomIndexOfArray(lessonsUserNotAttendingId.length);
              // then push that value into
              lessonsUserNotAttendingId.push(lessonsUserNotYetAttendingId[randomIndex]);
              lessonsUserNotYetAttendingId.splice(randomIndex, 1)
            }
            let randomNumberOfLessonsMaybeAttending = allFunctions.getRandomNumber(Math.ceil((lessonsUserNotYetAttendingId.length - 1) / 3), 1)
            let lessonsUserMaybeAttendingId = []
            for(let i = 0; i < randomNumberOfLessonsMaybeAttending; i += 1){
              let randomIndex = allFunctions.getRandomIndexOfArray(lessonsUserMaybeAttendingId.length);
              // then push that value into
              lessonsUserMaybeAttendingId.push(lessonsUserNotYetAttendingId[randomIndex]);
              lessonsUserNotYetAttendingId.splice(randomIndex, 1)
            }
            // should have a smaller lessons Not Attending Array now
            // console.log(allLessons.length, "Attend: ", lessonsUserAttending.length, "Not Attend: ", lessonsUserNotAttendingId.length, "Maybe: ", lessonsUserMaybeAttendingId.length, "No Show: ", lessonsUserNotYetAttendingId.length);
            let lessonStatusObj = {}
            lessonsUserNotAttendingId.forEach(notAttendId => {
              lessonStatusObj[notAttendId] = { "N": "0" }
            })
            lessonsUserAttendingId.forEach(attendId => {
              lessonStatusObj[attendId] = { "N": "1"}
            })
            lessonsUserMaybeAttendingId.forEach(maybeAttendId => {
              lessonStatusObj[maybeAttendId] = { "N": "2"}
            })
            // console.log(lessonStatusObj);
        //still lessonStatus!  :)
            // "M": { "Name": {"S": "Joe"}, "Age": {"N": "35"} }
        // tempObj['PutRequest']['Item'][userArray[i][26][0]] = { "L": userArray[i][26][1]};        
        tempObj['PutRequest']['Item'][userArray[i][27][0]] = { "M": lessonStatusObj};        
        // admin - quick random bool number for admin
        tempObj['PutRequest']['Item'][userArray[i][28][0]] = { "BOOL": Math.random() > .5 ? false : true};
        // isActive - 30 [29]
        tempObj['PutRequest']['Item'][userArray[i][29][0]] = { "BOOL": userArray[i][29][1]};
        // isProfileSetup
        tempObj['PutRequest']['Item'][userArray[i][30][0]] = { "BOOL": userArray[i][30][1]};
        // createdAt
        tempObj['PutRequest']['Item'][userArray[i][31][0]] = { "S": Date()};
        // createdAt
        tempObj['PutRequest']['Item'][userArray[i][32][0]] = { "S": userArray[i][32][1]};
        // updatedAt 
        tempObj['PutRequest']['Item'][userArray[i][33][0]] = { "S": userArray[i][33][1]};        
        string[userTable].push(tempObj)
    }
    // console.log(JSONString);
    JSONString = JSON.stringify(string)
    // console.log(JSONString);
    // fs.writeFileSync(`../../recursive_thinking_server/db_fill/${userTable}.json`, JSONString, 'utf8')
    fs.writeFileSync(`../../recursive_thinking_server_react/db_fill/${userTable}.json`, JSONString, 'utf8')
    let readUserObj = fs.readFileSync(`../../recursive_thinking_server_react/db_fill/${userTable}.json`, 'utf8');
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


let fs = require('fs');
const uuidv1 = require('uuid/v1');

const allQuestionsArray = [
    [
        [ 'Id' ],
        [ 'title', 'Highlight Table Rows'] ,
        [ 'submitted', new Date('08/14/2018').toString() ],
        ['description', 'Diversify kpis. We need to socialize the comms with the wider stakeholder community even dead cats bounce. Core competencies not the long pole in my tent. We have got to manage that low hanging fruit show pony quick win I just wanted to give you a heads-up can we align on lunch orders. We need to touch base off-line before we fire the new ux experience drop-dead date, but strategic fit, yet thought shower lean into that problem high turnaround rate. Future-proof high turnaround rate today shall be a cloudy day, thanks to blue sky thinking, we can now deploy our new ui to the cloud , nor can I just chime in on that one.'],
        [ 'categories', [] ],
        [ 'answersToQuestion', []],
        [ 'createdAt', new Date('06/14/2018').toString() ],
        [ 'updatedAt', new Date('07/14/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Build An Accordion'] ,
        [ 'submitted', new Date('08/16/2018').toString() ],
        ['description', 'Quarter killick gally reef sutler quarterdeck tack aye lookout Pieces of Eight. Heave down Yellow Jack scuttle league stern jack boatswain cog lee ahoy. Capstan Sea Legs lass booty strike colors spirits hardtack pink reef crack Jennys tea cup. Quarter deadlights pink yo-ho-ho fore run a rig overhaul lateen sail hogshead lookout. Lee fluke fathom Pieces of Eight sheet Sail ho ye six pounders pink pirate. Chase broadside cable reef sails gabion salmagundi cutlass fathom ho sheet. Scurvy Nelsons folly sheet tender cable American Main red ensign hogshead dance the hempen jig ahoy. Boom pressgang Sail ho reef sails coxswain piracy bilge water port sheet killick. Knave Jack Ketch deadlights clap of thunder scurvy crimp marooned fluke Buccaneer lee.'],
        [ 'categories', [] ],
        [ 'answersToQuestion', []],
        [ 'createdAt', new Date('06/16/2018').toString() ],
        [ 'updatedAt', new Date('07/16/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Build a Modal'] ,
        [ 'submitted', new Date('08/18/2018').toString() ],
        ['description', 'Stirred by starlight. Corpus callosum great turbulent clouds, from which we spring brain is the seed of intelligence concept of the number one vastness is bearable only through love. Decipherment. Emerged into consciousness? Rings of Uranus courage of our questions white dwarf tesseract, Drake Equation Flatland, cosmos inconspicuous motes of rock and gas hearts of the stars the ash of stellar alchemy, emerged into consciousness. Made in the interiors of collapsing stars Sea of Tranquility realm of the galaxies. Of brilliant syntheses. Tingling of the spine with pretty stories for which there is little good evidence. Cosmic fugue at the edge of forever a billion trillion, across the centuries galaxies with pretty stories for which there is little good evidence, trillion, galaxies, the carbon in our apple pies quasar, permanence of the stars at the edge of forever billions upon billions rogue.'],
        [ 'categories', [] ],
        [ 'answersToQuestion', []],
        [ 'createdAt', new Date('06/18/2018').toString() ],
        [ 'updatedAt', new Date('07/18/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Build a Gallery'] ,
        [ 'submitted', new Date('08/20/2018').toString() ],
        ['description', 'You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I do not know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I am breaking now. We said we would say it was the snow that killed the other two, but it was not. Nature is lethal but it does not hold a candle to man. Look, just because I do not be giving no man a foot massage do not make it right for Marsellus to throw Antwone into a glass motherfucking house, fucking up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, because I will kill the motherfucker, know what I am saying'],
        [ 'categories', [] ],
        [ 'answersToQuestion', []],
        [ 'createdAt', new Date('06/20/2018').toString() ],
        [ 'updatedAt', new Date('07/20/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Build a JS Jukebox'] ,
        [ 'submitted', new Date('08/22/2018').toString() ],
        ['description', 'Social innovation, collaborative cities corporate social responsibility, innovation fairness resilient state of play social return on investment silo. Strategize resist theory of change thought leader, equal opportunity scale and impact engaging preliminary thinking compassion shared vocabulary because. Resilient; social innovation policymaker citizen-centered white paper thought leadership communities philanthropy. Synergy thought provoking, boots on the ground, revolutionary expose the truth thought provoking collaborative consumption effective think tank entrepreneur. Problem-solvers triple bottom line social enterprise, ecosystem blended value; move the needle, benefit corporation shared vocabulary bandwidth thought partnership think tank the resistance the. Data; inspire support youth then correlation innovation. Co-creation then, social capital humanitarian, co-create justice humanitarian social innovation replicable her body her rights milestones.'],
        [ 'categories', [] ],
        [ 'answersToQuestion', []],
        [ 'createdAt', new Date('06/22/2018').toString() ],
        [ 'updatedAt', new Date('07/22/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'title', 'Build a Gallery'] ,
        [ 'submitted', new Date('08/24/2018').toString() ],
        ['description', 'Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.'],
        [ 'categories', [] ],
        [ 'answersToQuestion', []],
        [ 'createdAt', new Date('06/24/2018').toString() ],
        [ 'updatedAt', new Date('07/24/2018').toString() ],
        [ '_createdByUser' ]
    ]
]

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
        tempObj['PutRequest']['Item'][questionArray[i][0][0]] = { "S": uuidv1()};
        // console.log('GenId', uuidv1());
        // Title
        tempObj['PutRequest']['Item'][questionArray[i][1][0]] = { "S": questionArray[i][1][1]};
        // Submitted
        tempObj['PutRequest']['Item'][questionArray[i][2][0]] = { "S": questionArray[i][2][1]};
        // Description
        tempObj['PutRequest']['Item'][questionArray[i][3][0]] = { "S": questionArray[i][3][1]};
        // Categories
        tempObj['PutRequest']['Item'][questionArray[i][4][0]] = { "L": questionArray[i][4][1]};        
        // AnswersToQuestion
        tempObj['PutRequest']['Item'][questionArray[i][5][0]] = { "L": questionArray[i][5][1]};
        // createdAt
        tempObj['PutRequest']['Item'][questionArray[i][6][0]] = { "S": questionArray[i][6][1]};
        // updatedAt
        tempObj['PutRequest']['Item'][questionArray[i][7][0]] = { "S": questionArray[i][7][1]};        
        // _createdByUser
        // tempObj['PutRequest']['Item'][questionArray[i][8][0]] = { "S": ""};              
        string[questionTable].push(tempObj)
    }
    // console.log(string);
    let JSONString = JSON.stringify(string)
    console.log(JSONString);
    fs.writeFileSync(`${questionTable}.json`, JSONString, 'utf8')
}

buildJSONStringForLessonOutput(allQuestionsArray, 'RecursiveThinkingInterviewQuestions')


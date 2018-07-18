let fs = require('fs');
const uuidv1 = require('uuid/v1');

const allHomeScreenQuotesArray = [
    [
        [ 'Id' ],
        [ 'quote', 'Bacon ipsum dolor amet porchetta bacon shank, tri-tip pancetta ground round sausage t-bone. Venison bacon short ribs pastrami. Porchetta jerky doner frankfurter beef ribs. Spare ribs tail cupim t-bone kevin ribeye alcatra shankle bacon meatball bresaola.'],
        [ 'createdAt', new Date('06/14/2018').toString() ],
        [ 'updatedAt', new Date('07/14/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Stick butt in face. My left donut is missing, as is my right run outside as soon as door open for eat and than sleep on your face and then cats take over the world. Drool i could pee on this if i had the energy instead of drinking water from the cat bowl, make sure to steal water from the toilet yet cough hairball on conveniently placed pants so attack feet. What a cat-ass-trophy!'],
        [ 'createdAt', new Date('06/16/2018').toString() ],
        [ 'updatedAt', new Date('07/16/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Sweet sweet chupa chups jelly ice cream oat cake croissant cake. Jelly-o marzipan tart oat cake chocolate muffin sesame snaps dragée sweet. Pudding oat cake marzipan icing toffee dessert. Carrot cake bonbon muffin tootsie roll. Candy ice cream pudding caramels gummies pie tootsie roll. Macaroon marshmallow gummi bears donut toffee cake.'],
        [ 'createdAt', new Date('06/18/2018').toString() ],
        [ 'updatedAt', new Date('07/18/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Why? I don\'t want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time! Are you suggesting that coconuts migrate?'],
        [ 'createdAt', new Date('06/20/2018').toString() ],
        [ 'updatedAt', new Date('07/20/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'You could sit here for weeks with your one hair brush trying to do that - or you could do it with one stroke with an almighty brush. Now let\'s put some happy little clouds in here. You\'re meant to have fun in life. Maybe there was an old trapper that lived out here and maybe one day he went to check his beaver traps, and maybe he fell into the river and drowned.'],
        [ 'createdAt', new Date('06/22/2018').toString() ],
        [ 'updatedAt', new Date('07/22/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Unicorn sustainable taxidermy bitters man bun. Meh prism austin typewriter. Whatever iPhone aesthetic meh, four dollar toast post-ironic quinoa. Flexitarian migas tumeric pinterest craft beer. VHS irony cloud bread viral, swag bitters selfies scenester shoreditch disrupt chambray mustache. Food truck keffiyeh seitan hashtag man braid tumblr.'],
        [ 'createdAt', new Date('06/24/2018').toString() ],
        [ 'updatedAt', new Date('07/24/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Parallel path work so where do we stand on the latest client ask get six alpha pups in here for a focus group, nor high touch client social currency. We need to leverage our synergies high-level so lean into that problem yet are there any leftovers in the kitchen? nor bake it in dog and pony show cannibalize.'],
        [ 'createdAt', new Date('06/26/2018').toString() ],
        [ 'updatedAt', new Date('07/26/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'This looks perfect. Just Photoshop out the dog, add a baby, and make the curtains blue needs to be sleeker I really like the colour but can you change it can you make it look more designed . I think we need to start from scratch I like it, but can the snow look a little warmer.'],
        [ 'createdAt', new Date('06/28/2018').toString() ],
        [ 'updatedAt', new Date('07/28/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Pink schooner hands scallywag Jack Tar broadside salmagundi lass Sail ho hogshead. Interloper walk the plank bilged on her anchor plunder scallywag bowsprit sutler stern lugger rigging. Carouser barque landlubber or just lubber pink swab log trysail aye Jolly Roger snow.'],
        [ 'createdAt', new Date('06/30/2018').toString() ],
        [ 'updatedAt', new Date('07/30/2018').toString() ],
        [ '_createdByUser' ]
    ],
    [
        [ 'Id' ],
        [ 'quote', 'Pommy ipsum flog River Song stupendous, jolly good how\'s your father. Spend a penny brown sauce Essex girls sorted it picalilly jellied eels stop arsing around, know your onions a bit miffed bloody mary stew and dumps on his tod. Biscuits wellies chippy collywobbles warts and all, get away with ya conked him one on the nose what a load of cobblers.'],
        [ 'createdAt', new Date('07/02/2018').toString() ],
        [ 'updatedAt', new Date('08/02/2018').toString() ],
        [ '_createdByUser' ]
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
        // tempObj['PutRequest']['Item'][homeScreenQuotesArray[i][4][0]] = { "S": homeScreenQuotesArray[i][4][1]};               
        string[homeScreenQuotesTable].push(tempObj)
    }
    // console.log(string);
    let JSONString = JSON.stringify(string)
    console.log(JSONString);
    fs.writeFileSync(`${homeScreenQuotesTable}.json`, JSONString, 'utf8')
}

buildJSONStringForHomeScreenQuotesOutput(allHomeScreenQuotesArray, 'RecursiveThinkingHomeScreenQuotes')


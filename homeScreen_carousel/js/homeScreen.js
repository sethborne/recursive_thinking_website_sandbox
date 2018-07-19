// 

const databaseAllUsers = [
    {
        Id: '0000000001',
        image: './images/avatar1.png',
        name: 'Developer 01',
        title: 'The First Developer'
    },
    {
        Id: '0000000002',
        image: './images/avatar2.png',
        name: 'Developer 02',
        title: 'The Second Developer'
    },
    {
        Id: '0000000003',
        image: './images/avatar3.png',
        name: 'Developer 03',
        title: 'The Third Developer'
    },
    {
        Id: '0000000004',
        image: './images/avatar4.png',
        name: 'Developer 04',
        title: 'The Fourth Developer'
    },
    {
        Id: '0000000005',
        image: './images/avatar5.png',
        name: 'Developer 05',
        title: 'The Fifth Developer'
    },
    {
        Id: '0000000006',
        image: './images/avatar6.png',
        name: 'Developer 06',
        title: 'The Sixth Developer'
    },
    {
        Id: '0000000007',
        image: './images/porg_sq.jpeg',
        name: 'Developer 07',
        title: 'The Seventh Developer'
    },
    {
        Id: '0000000008',
        image: './images/avatar_default.png',
        name: 'Developer 08',
        title: 'The Eighth Developer'
    },
    {
        Id: '0000000009',
        image: './images/avatar1.png',
        name: 'Developer 09',
        title: 'The Ninth Developer'
    },
    {
        Id: '0000000010',
        image: './images/avatar2.png',
        name: 'Developer 10',
        title: 'The Tenth Developer'
    }
]

const databaseAllHomeScreenQuotes = [
    {
        quote: 'Bacon ipsum dolor amet porchetta bacon shank, tri-tip pancetta ground round sausage t-bone. Venison bacon short ribs pastrami. Porchetta jerky doner frankfurter beef ribs. Spare ribs tail cupim t-bone kevin ribeye alcatra shankle bacon meatball bresaola.',
        _quotedByUser: '0000000001'
    },
    {
        quote: 'Stick butt in face. My left donut is missing, as is my right run outside as soon as door open for eat and than sleep on your face and then cats take over the world. Drool i could pee on this if i had the energy instead of drinking water from the cat bowl, make sure to steal water from the toilet yet cough hairball on conveniently placed pants so attack feet. What a cat-ass-trophy!',
        _quotedByUser: '0000000002'
    },
    {
        quote: 'Sweet sweet chupa chups jelly ice cream oat cake croissant cake. Jelly-o marzipan tart oat cake chocolate muffin sesame snaps dragée sweet. Pudding oat cake marzipan icing toffee dessert. Carrot cake bonbon muffin tootsie roll. Candy ice cream pudding caramels gummies pie tootsie roll. Macaroon marshmallow gummi bears donut toffee cake.',
        _quotedByUser: '0000000003'
    },
    {
        quote: 'Why? I don\'t want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time! Are you suggesting that coconuts migrate?',
        _quotedByUser: '0000000004'
    },
    {
        quote: 'You could sit here for weeks with your one hair brush trying to do that - or you could do it with one stroke with an almighty brush. Now let\'s put some happy little clouds in here. You\'re meant to have fun in life. Maybe there was an old trapper that lived out here and maybe one day he went to check his beaver traps, and maybe he fell into the river and drowned.',
        _quotedByUser: '0000000005'
    },
    {
        quote: 'Unicorn sustainable taxidermy bitters man bun. Meh prism austin typewriter. Whatever iPhone aesthetic meh, four dollar toast post-ironic quinoa. Flexitarian migas tumeric pinterest craft beer. VHS irony cloud bread viral, swag bitters selfies scenester shoreditch disrupt chambray mustache. Food truck keffiyeh seitan hashtag man braid tumblr.',
        _quotedByUser: '0000000006'
    },
    {
        quote: 'Parallel path work so where do we stand on the latest client ask get six alpha pups in here for a focus group, nor high touch client social currency. We need to leverage our synergies high-level so lean into that problem yet are there any leftovers in the kitchen? nor bake it in dog and pony show cannibalize.',
        _quotedByUser: '0000000007'
    },
    {
        quote: 'This looks perfect. Just Photoshop out the dog, add a baby, and make the curtains blue needs to be sleeker I really like the colour but can you change it can you make it look more designed . I think we need to start from scratch I like it, but can the snow look a little warmer.',
        _quotedByUser: '0000000008'
    },
    {
        quote: 'Pink schooner hands scallywag Jack Tar broadside salmagundi lass Sail ho hogshead. Interloper walk the plank bilged on her anchor plunder scallywag bowsprit sutler stern lugger rigging. Carouser barque landlubber or just lubber pink swab log trysail aye Jolly Roger snow.',
        _quotedByUser: '0000000009'
    },
    {
        quote: 'Pommy ipsum flog River Song stupendous, jolly good how\'s your father. Spend a penny brown sauce Essex girls sorted it picalilly jellied eels stop arsing around, know your onions a bit miffed bloody mary stew and dumps on his tod. Biscuits wellies chippy collywobbles warts and all, get away with ya conked him one on the nose what a load of cobblers.',
        _quotedByUser: '0000000010'
    }
]

const slideHead = document.getElementById('slideHead')
for (var i=0; i<databaseAllHomeScreenQuotes.length; i++){
    let quoteId = databaseAllHomeScreenQuotes[i]._quotedByUser;
    let quote = databaseAllHomeScreenQuotes[i].quote;
    for (var j=0; j<databaseAllUsers.length; j++){
        if (databaseAllUsers[j].Id==quoteId){
            let name = '-'+databaseAllUsers[j].name +', '+ databaseAllUsers[j].title;
            let image = databaseAllUsers[j].image;
            slideHead.innerHTML+=`<div class="mySlides fade">
            <section id="homePage">   
                <section class="section famousQuote">
                    <div class="grid gutters third u-textCenter">
                        <div class="cell cell-center">
                            <div class="content">
                                <img class="imgAvatarLarge" src="${image}" alt="">
                            </div>
                        </div>
                        <div class="cell cell-center">
                            <div class="content quoteAlignment">
                                <p>"${quote}"</p>
                                <br><br>
                                <p>${name} </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>`;
        }
    }
}
slideHead.innerHTML+=`<a class="prev" onclick="plusSlides(-1)"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
<a class="next" onclick="plusSlides(1)"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>`;

// Carousel JS

var slideIndex = 1;
showSlides(slideIndex);

// Looking for a timing solution to load the next slide after a certain time period. Haven't been able to link setTimeout with an advancement of slides. 
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    
    if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slides[slideIndex-1].style.display = "block"; 
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

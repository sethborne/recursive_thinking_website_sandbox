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

const getTheUL = document.getElementById('giveULlistitems')
console.log(getTheUL);

for(let i = 0; i < databaseAllUsers.length; i += 1){
    // make a li node
    let makeLINode = document.createElement('li')
    console.log(databaseAllUsers[i]['Id']);
    // {Id: "0000000001", image: "./images/avatar1.png", name: "Developer 01", title: "The First Developer"}
        let idTitleNode = document.createElement('h3')
        // fill TitleNode
        idTitleNode.innerHTML = databaseAllUsers[i]['Id']
        console.log(idTitleNode);
        // attach h2 to li
        makeLINode.appendChild(idTitleNode)
    // attach to li to ul
    getTheUL.appendChild(makeLINode)
}
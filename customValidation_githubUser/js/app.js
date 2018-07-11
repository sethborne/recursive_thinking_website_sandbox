// import { apiInfo } from '../apiKey/apiKey.js'

const github = new Github;

const searchForUser = document.getElementById('searchForUser')

// searchForUser.addEventListener('keyup', (event) => {
//     const userText = event.target.value;
    
//     if(userText !== ''){
//         // continue
//         console.log(userText);
//         // call function to make http call
//         github.getUser(userText)
//             .then(data => {
//                 console.log(data);
//             })
//     }
let timeout = null;

searchForUser.addEventListener('keyup', (event) => {
    const userText = event.target.value;
    
    clearTimeout(timeout);
    
    // timeout = setTimeout(function(){
    //     console.log('Input', userText);
    // }, 300)
    
    if(userText !== ''){
        // continue
        timeout = setTimeout(() => {
            // console.log('Input', userText);
            github.getUser(userText)
                .then(data => {
                    console.log(data);
                })
        }, 300)
    }
})
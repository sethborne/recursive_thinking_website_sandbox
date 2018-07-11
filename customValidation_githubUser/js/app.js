// import { apiInfo } from '../apiKey/apiKey.js'

const github = new Github();
const codePen = new CodePen();

const searchForGitHubUser = document.getElementById('searchForGitHubUser')

const searchForCodePenUser = document.getElementById('searchForCodePenUser')

let timeout = null;

searchForGitHubUser.addEventListener('keyup', (event) => {
    const gitHubUsernameValue = event.target.value;
    
    clearTimeout(timeout);
    
    if(gitHubUsernameValue !== ''){
        // continue
        timeout = setTimeout(() => {
            // console.log('Input', gitHubUsernameValue);
            github.getUser(gitHubUsernameValue)
                .then(data => {
                    console.log(data);
                    console.log(data.profile);
                    if(data.profile.id){
                        console.log('Valid User');
                    }
                    else if(data.profile.message){
                        console.log(data.profile.message);
                        console.log('InValid User');
                    }
                })
        }, 300)
    }
})

searchForCodePenUser.addEventListener('keyup', (event) => {
    const codePenUsernameValue = event.target.value;
    clearTimeout(timeout)
    if(codePenUsernameValue !== ''){
        timeout = setTimeout(() => {
            // console.log('Input', codePenUsernameValue);
            // make request
            codePen.getCodePenUser(codePenUsernameValue)
                .then((returnObj) => {
                    console.log(returnObj);
                    if(returnObj.success){
                        console.log('Valid User');
                    }
                    else if(!returnObj.success){
                        console.log('Invalid User');
                    }
                })
        }, 300)
    }
})
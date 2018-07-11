// import { apiInfo } from '../apiKey/apiKey.js'

const apiInfo_GitHubClientId = apiKey.getGitHubAPIClientID();
// console.log(apiInfo_ClientId);
const apiInfo_GitHubClientSecret = apiKey.getGitHubAPIClientSecret();
// console.log(apiInfo_ClientSecret);

class Github {
    constructor(){
        // this.client_id = apiInfo.clientID;
        // this.client_secret = apiInfo.clientSecret;
        this.client_id = apiInfo_GitHubClientId;
        this.client_secret = apiInfo_GitHubClientSecret;
    }
    // getUser Method
    async getUser(username){
        const profileResponse = await fetch(`https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
        const profileData = await profileResponse.json();
        return {
            profile: profileData
        }
    }
}
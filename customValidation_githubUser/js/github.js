// import { apiInfo } from '../apiKey/apiKey.js'

class Github {
    constructor(){
        // this.client_id = apiInfo.clientID;
        // this.client_secret = apiInfo.clientSecret;
        
        this.client_id = '72c9c9b595f9140eb8b7';
        this.client_secret = 'c7ce887abb4c59b4ba2dd6c6ce79410b4eca9190';
    }
    // getUser Method
    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
        
        const profileData = await profileResponse.json();
        
        return {
            profile: profileData
        }
    }
}
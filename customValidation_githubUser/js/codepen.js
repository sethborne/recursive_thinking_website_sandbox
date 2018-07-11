// no apikey needed

class CodePen {
    constructor(){
    }
    async getCodePenUser(username){
        const codePenProfileResponse = await fetch(`https://cpv2api.com/profile/${username}`)
        const codePenProfileData = await codePenProfileResponse.json();
        return codePenProfileData;
    }
}
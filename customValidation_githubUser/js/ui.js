class UI {
    constructor(){
        this.validationGitHub = document.getElementById('validationGitHub');
        this.validationCodePen = document.getElementById('validationCodePen')
    }
    showValidation(input, type){
        let buildValidationBlock = document.createElement('div');
        // console.log(buildValidationBlock);
        if(type === 'success'){
            buildValidationBlock.setAttribute('class', 'validationSuccess')
            buildValidationBlock.innerText = 'Username Found'
        }
        else if(type === 'failure'){
            buildValidationBlock.setAttribute('class', 'validationFailure')
            buildValidationBlock.innerText = 'Username Not Found'            
        }
        console.log(buildValidationBlock);
        if(input === 'searchForGitHubUser'){
            this.validationGitHub.appendChild(buildValidationBlock)
        }
        else if(input === 'searchForCodePenUser'){
            this.validationCodePen.appendChild(buildValidationBlock)
        }
        
    }
}
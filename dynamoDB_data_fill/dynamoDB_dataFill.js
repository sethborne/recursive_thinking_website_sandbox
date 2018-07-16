// let AWS = require('aws-sdk');
// let docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
let fs = require('fs')

const allSkillsLanguageArray = [
    ['javascript', 'JavaScript'],
    ['html', 'HTML'],
    ['html5', 'HTML5'],
    ['css', 'CSS'],
    ['css3', 'CSS3'],
    ['jquery', 'jQuery'],
    ['angularjs', 'AngularJS'],
    ['angular', 'Angular'],
    ['react', 'React'],
    ['reactjs', 'ReactJS'],
    ['csharp', 'C#'],
    ['dotnetcore', '.NetCore'],
    ['nancy', 'Nancy'],
    ['python', 'Python'],
    ['django', 'Django'],
    ['flask', 'Flask'],
    ['bootstrap', 'Bootstrap'],
    ['webpack', 'WebPack'],
]

const allSkillsProfessionalArray = [
    ['userexperiencedesign', 'User Experience Design'],
    ['userresearch', 'User Research'],
    ['informationarchitecture', 'Information Architecture'],
    ['visualdesign', 'Visual Design'],
    ['usercentereddesign', 'User Centered Design'],
    ['wireframingdesign', 'Wireframing Design'],
    ['interactiondesign', 'Interaction Design'],
    ['frontenddevelopment', 'Front End Development']
]

const allSkillsSoftwareArray = [
    ['sketch', 'Sketch'],
    ['balsamiq', 'Balsamiq'],
    ['omniGraffle', 'OmniGraffle'],
    ['axure', 'Axure']
]

function buildJSONStringForSkillOutput(skillArray, skillTable){
    let JSONString = {

    }
    JSONString[skillTable] = []
    for(let i = 0; i < skillArray.length; i += 1){
        let tempObj = {
            PutRequest:{
                Item: { 
                    Id: { S: skillArray[i][0]},
                    value: { M: {
                        name: { S: skillArray[i][1]},
                        users: { L: []}
                        }
                    }
                }
            }
        }
        JSONString[skillTable].push(tempObj)
    }
    // console.log(JSONString);
    let JSONString1 = JSON.stringify(JSONString)
    console.log(JSONString1);
    fs.writeFileSync(`${skillTable}.json`, JSONString1, 'utf8')
}

buildJSONStringForSkillOutput(allSkillsLanguageArray, 'RecursiveThinkingProfileSkillsLanguage')
buildJSONStringForSkillOutput(allSkillsProfessionalArray, 'RecursiveThinkingProfileSkillsProfessional')
buildJSONStringForSkillOutput(allSkillsSoftwareArray, 'RecursiveThinkingProfileSkillsSoftware')


// let regexS = /("S")/gi;
// let regexL = /("L")/gi
// console.log(testRegex.test(JSONString1));
// JSONString1 = JSONString1.replace(regexS, 'S')
// JSONString1 = JSONString1.replace(regexL, 'L')
// console.log(JSONString1);
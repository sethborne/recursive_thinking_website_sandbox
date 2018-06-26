let skillProgInput = document.getElementById('skillsProg')
let skillSoftwareInput = document.getElementById('skillsSoft')
let skillProfInput = document.getElementById('skillsProf')

let allProgrammingLanguagesArray = Object.values(allProgrammingLanguagesObj);
let allSkillsSoftwareArray = Object.values(allSkillsSoftwareObj);
let allSkillsProfessionalArray = Object.values(allSkillsProfessionalObj);

skillProgInput.addEventListener('input', autoComplete)
skillSoftwareInput.addEventListener('input', autoComplete)
skillProfInput.addEventListener('input', autoComplete)

function autoComplete(event){
    console.log('this: ', this);
    let currentFocus;
    let arrayInput = [];
    if(event.target.id === "skillsProg"){
        arrayInput = allProgrammingLanguagesArray;
        // arrayInput = countries;
    }
    else if(event.target.id === "skillsSoft"){
        arrayInput = allSkillsSoftwareArray
    }
    else if(event.target.id === "skillsProf"){
        arrayInput = allSkillsProfessionalArray
    }
    else {
        console.log('Where the Sidewalk Ends');
    }
    // close any other array lists
    closeAllLists();
    currentFocus = -1;
    let masterDiv = document.createElement("div");
    masterDiv.setAttribute("id", this.id + "autocomplete-list");
    masterDiv.setAttribute("class", "autocomplete-items");
    // append the DIV element as a child of the autocomplete container:
    this.parentNode.appendChild(masterDiv);
    // this will make the filtered Array for the DDL
    let matchArray = [];
    let inputValue = event.target.value
    arrayInput.forEach(arrItem => {
        if(arrItem.substr(0, inputValue.length).toLowerCase() == inputValue.toLowerCase()) {
            console.log("Test: ", arrItem);
            console.log('inputValue: ', inputValue);
            filterDiv = document.createElement("div");
            /*make the matching letters bold:*/
            filterDiv.innerHTML = "<strong>" + arrItem.substr(0, inputValue.length) + "</strong>";
            filterDiv.innerHTML += arrItem.substr(inputValue.length);
            /*insert a input field that will hold the current array item's value:*/
            filterDiv.innerHTML += "<input type='hidden' value='" + arrItem + "'>";
            /*execute a function when someone clicks on the item value (div element):*/
            console.log('This: ', filterDiv);
            filterDiv.addEventListener("click", function (e) {
                // insert the value for the autocomplete text field:
                this.parentNode.previousSibling.previousSibling.value = this.getElementsByTagName("input")[0].value;
                // close the list of autocompleted values, (or any other open lists of autocompleted values:
                closeAllLists();
            });
            masterDiv.appendChild(filterDiv);  
        matchArray.push(arrItem)
        }
    })
    if(!matchArray.length){
        matchArray.push("No Results Found")
    }
    console.log(matchArray);
    console.log('THIS IS', this);
    // inp.addEventListener("keydown", function (e) {
    this.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    
    function closeAllLists(arrItem) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var arrayItems = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < arrayItems.length; i += 1) {
            if (arrItem != arrayItems[i] && arrItem != this) {
                arrayItems[i].parentNode.removeChild(arrayItems[i]);
            }
        }
    }
}


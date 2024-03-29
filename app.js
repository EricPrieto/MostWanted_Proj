"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = singleSearch(people)
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch (displayOption) {
    case "info":
      displayPerson(person[0]);
      break;
    case "family":
      displayImmediateFamilyMembers(person, people);
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.firstName === firstName && potentialMatch.lastName === lastName) {
      return true;
    }
    else {
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people) {
  let eyeColorSearch = prompt("What is the eye color of the person you are searching for?");

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColorSearch) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson;
}

function searchByGender(people) {
  let genderSearch = prompt("What is the gender of the person you are seaching for?");

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === genderSearch) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson;
}

function searchByHeight(people) {
  let heightSearch = prompt("What is the height of the person you are searching for?");

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.height === parseInt(heightSearch)) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson;
}


function searchByWeight(people) {
  let weightSearch = prompt("What is the weight of the person you are searching for?");

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.weight === parseInt(weightSearch)) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson;
}

function singleSearch(people) {
  let singleTrait = people;
  let userSearch = true;
  while (userSearch == true) {
    let singleSearchResult = prompt("What trait would you like to search for: 'eye color', 'gender', 'height', 'weight', type 'Done' when you are finished");
    switch (singleSearchResult) {
      case "eye color":
        singleTrait = searchByEyeColor(singleTrait);

        break;
      case "gender":
        singleTrait = searchByGender(singleTrait);

        break;
      case "height":
        singleTrait = searchByHeight(singleTrait);

        break;
      case "weight":
        singleTrait = searchByWeight(singleTrait);

      case 'Done':
        userSearch = false;
      default:
    }

  }
  displayPeople(singleTrait);
  return singleSearchResult;
}

//TODO: add other trait filter functions here.


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
  displayPeople(person); //DONE
}

let filteredPeople = data.filter(function (element) { // function for displaying childred, grandchildren

});
// }//filter all of the people where their parents array contains the id of the person
 //function for displaying the immediate family
 function displayImmediateFamilyMembers(person, people){
  let spouse = people.filter(function (potentialMatch){
     if (person.currentSpouse === potentialMatch.id){
       return true;
     }
     else{
       return false;
     }
   });
   alert (spouse);
   return spouse;
   
   //displayImmediateFamilyMembers(spouse);
 }
  // alert(personsFamilyMembers);
  // displayPeople(spouse);
  // let personsFamilyMembers = "Parents: " + person.parents + "\n";
  // personsFamilyMembers = "Spouse: " + person.currentSpouse + "\n";
  // personsFamilyMembers = "Siblings: " + person.siblings + "\n"; //find people who share a parent(s)




//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  do {
    var response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  }
  else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {

}

//#endregion
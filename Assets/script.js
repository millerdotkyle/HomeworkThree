
var generateBtn = document.querySelector("#generate");
var lowerCaseAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var upperCaseAlphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var specialCharactersAplhabet = ["\ ", "!", "\"", "#", "$", "%", "&", "\'", "(", ")", "*", "+", "," , "-", "." , "/" , ":" , ";" , "<", "=", ">", "?", "@" , "[" , "\\" , "]" , "^", "_", "`", "{", "|", "}", "~"];




function getPasswordOptions() {

  // Variable to store length of password from user input
  var length = parseInt(
    prompt('How many characters would you like your password to contain?')
  );


  // Conditional statement to check if password length is a number. Prompts end if this evaluates false
  if (Number.isNaN(length) || length < 8 || length > 128) {
    alert('Password length must be provided as a number and be between 8 and 128 characters in length');
    return null;
  }

  // Variable to store boolean regarding the inclusion of special characters
  var hasSpecialCharacters = confirm(
    'Click OK to confirm including special characters.'
  );

   // Object to store user input
   var passwordOptions = {
    passlength: length,
    // add more properties and values here
    hasSpecialCharacters: hasSpecialCharacters
   }

   return passwordOptions;
}



// Function for getting a random element from a specialChars array provided in args
function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];
  // console.log(randIndex);
  // console.log(randElement);
  // console.log(typeof randElement);

  return randElement;
}



// Function to generate password with user input
function generatePassword() {

  var options = getPasswordOptions();
  console.log(options);
  // Variable to store password as it's being concatenated
  var result = [];

  // Array to store types of characters to include in password
  var possibleCharacters = lowerCaseAlphabet.concat(upperCaseAlphabet);

  // console.log(possibleCharacters);
  // console.log(specialCharactersAplhabet);

  // Array to contain one of each type of chosen character to ensure each will be used
  var guaranteedCharacters = [];
  guaranteedCharacters.push(getRandom(lowerCaseAlphabet));
  console.log(guaranteedCharacters);
  guaranteedCharacters.push(getRandom(upperCaseAlphabet));
  console.log(guaranteedCharacters);
  result = guaranteedCharacters;

  // console.log(result);


  // Check if an options object exists, if not exit the function
  if (!options) return null;

   // Conditional statement that adds array of special characters into array of possible characters based on user input
  // Push new random special character to guaranteedCharacters, insert random guaranteed into result
  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharactersAplhabet);
    guaranteedCharacters.push(getRandom(specialCharactersAplhabet));
    result = guaranteedCharacters;
    console.log(result);

    //loop to generate password, starting with offset for first 3 guaranteed characters
  for(let i =3; i< options.passlength; i++){
    result.push(getRandom(possibleCharacters));
    console.log(result);
  }

  } else {
    //insert generated guaranteed chars into result
    result = guaranteedCharacters;
    //loop to generate password, smaller offset without special char
    for(let i =2; i < options.passlength; i++) {
      result.push(getRandom(possibleCharacters));
      console.log(result);
    }
  }

    // Transform the result into a string and pass into writePassword
    return result.join('');
}



// Write password to the #password input
function writePassword() {
  var genPassword = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.textContent = "Your password is: " + genPassword;
  console.log(genPassword.length);

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
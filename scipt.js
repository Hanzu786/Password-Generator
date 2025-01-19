const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-lengthNumber]");
const passwordDisplay= document.querySelector("[data-passwordDisplay]");
const copyBtn= document.querySelector("[data-copy]");
const copyMsg= document.querySelector("[data-copyMsg]");
const uppercaseCheck= document.querySelector("#uppercase");
const lowercaseCheck= document.querySelector("#lowercase");
const numbersCheck= document.querySelector("#numbers");
const symbolsCheck= document.querySelector("#symbols");
const indicator= document.querySelector("[data-indicator]");
const generatebtn= document.querySelector(".generateButton");
const allCheckBox= document.querySelectorAll("input[type=checkbox]");
const symbols = '!@#$%^&*()_+=~`{}[]<>,./?;:\/';


let password ="";
let passwordLength = 10;
let checkcount = 0;
handleSlider();


//set strength  circle color to grey
setIndicator("#ccc")


//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
} 

function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadow need to be here
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber(){
    return getRandomInteger (0, 9);
}

function generatelowerCase(){
    return String.fromCharCode(getRandomInteger ( 97, 123));
}

function generateUppercase(){
    return String.fromCharCode(getRandomInteger(65, 91));
}

function generateSymbol(){
    const randomNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randomNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator ("#0f0");

    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >=6
    ) {
        setIndicator ("#ff0");

    } else{
        setIndicator("#f00")
    }
}

async function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }

    catch(e){
        copyMsg.innerText = "Failed";
    }

    //Making the span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function shufflePassword(array){
    //Fisher Yates Method

    for( let i = array.length - 1; i > 0; i--) {
        const j = Math.floor (Math.random () * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    let str = "";

    array.forEach ((el) => (str += el));

    return str;
}

function handleCheckBoxChange() {
    checkcount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkcount++;
    });
    
    //special condition
    if(passwordLength < checkcount){
        passwordLength = checkcount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=> {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',() => {
    if(passwordDisplay.value)
    copyContent();
})

generatebtn.addEventListener('click', () => {
    // if none of the checkbox are checked
    if(checkcount ==0) return;
    console.log("checkcount zero")

    if(passwordLength < checkcount){
        passwordLength = checkcount;
        handleSlider();
    }

    //removeOldPassword
    password = "";

    // if(uppercaseCheck.checked) {
    //     password += generateUppercase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generatelowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }
    
    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }
 
    let funcArr = [];

    if (uppercaseCheck.checked)
        funcArr.push(generateUppercase);

    if (lowercaseCheck.checked)
        funcArr.push(generatelowerCase);

    if (numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);

    
    //compulsory addition
     
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
        
    }

    console.log("C Done")

    //remaining addition

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randomIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randomIndex]();
    }

    console.log("R Done")
  
    //shuffle the password

    password = shufflePassword(Array.from(password));

    console.log("S Done")
    //show in UI
    passwordDisplay.value = password;

    //calculate Strength

    calcStrength();


});


//chatGPT

// generatebtn.addEventListener('click', () => {
//     // If none of the checkboxes are checked
//     if (checkcount === 0) return;

//     // Ensure password length is at least the number of active checkboxes
//     if (passwordLength < checkcount) {
//         passwordLength = checkcount;
//         handleSlider();
//     }

//     console.log("Starting")
//     // Reset the password
//     password = "";

//     // Array of functions for generating password characters
//     let funcArr = [];
//     if (uppercaseCheck.checked) funcArr.push(generateUppercase);
//     if (lowercaseCheck.checked) funcArr.push(generatelowerCase);
//     if (numbersCheck.checked) funcArr.push(generateRandomNumber);
//     if (symbolsCheck.checked) funcArr.push(generateSymbol);

//     // Compulsory addition of one character from each selected type
//     for (let i = 0; i < funcArr.length; i++) {
//         password += funcArr[i]();
//     }

//     console.log("C Done")
//     // Remaining addition to fill up the password length
//     for (let i = 0; i < passwordLength - funcArr.length; i++) {
//         let randomIndex = getRandomInteger(0, funcArr.length);
//         password += funcArr[randomIndex]();
//     }

//     console.log("R Done")
//     // Shuffle the password
//     password = shufflePassword(Array.from(password));

//     console.log("S done")

//     // Display the password in the UI
//     passwordDisplay.value = password;

//     console.log("UI done")

//     // Calculate and update password strength indicator
//     calcStrength();
// });

const input = document.querySelector('#encrypt');
const output = document.querySelector('#encrypted');
const shiftcipherinput = document.querySelector('#shiftcipher');
const btnClear = document.querySelector('#clear');

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";
let shiftcipher;
setShiftCipherValue();

shiftcipherinput.addEventListener('change', event => {
    setShiftCipherValue();
})

input.addEventListener('keydown', event => {
    console.log(event.key);
    switch(event.key){
        case 'Backspace':
            removeLastLetterFromEncrypted();
            break;
        default:
            const encryptedChar = encrypt(event.key);
            appendToEncrypted(encryptedChar);    
    }
})

//clear input text
btnClear.addEventListener('click', event => {
    input.value = "";
    output.innerText = "";
})

function encrypt(char){
    if(typeof(char) === 'string') {
        char = char.toUpperCase();
        let charindex = alphabet.indexOf(char);
        charindex += shiftcipher;

        //Take care of shifting from the end of the alphabet..
        //example: shift cipher is 2. Character is Å, the last letter of the alphabet
        //The alphabet is 29 letters long, så charindex is 31. 31 - 29 is 2, so the result would be B
        if(charindex >= alphabet.length){
            charindex = charindex - alphabet.length;
        }
        char = alphabet.charAt(charindex);
    }

    return char;
}

function appendToEncrypted(char){
    output.innerText = output.innerText+char;
}

function setShiftCipherValue(){
    const tempcipher = Number(shiftcipherinput.value)
    if(!isNaN(tempcipher)){
        shiftcipher = tempcipher;
    }
}

function removeLastLetterFromEncrypted(){
    const originalText = output.innerText;
    console.log('slicing and dicing')
    output.innerText = originalText.slice(0, originalText.length-1);
}
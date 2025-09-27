let passLengthEl = document.getElementById("pass-length");
let passNumEl = document.getElementById("pass-num");
let passwordElements = document.querySelectorAll(".gen-pass")


function genPasswords() {
    document.getElementById("main").innerHTML = "";
    genPassElements(Math.max(1,Math.min(passNumEl.value,passNumEl.max)));
    const maxChars = Math.max(1,Math.min(passLengthEl.value,passLengthEl.max));
    passLengthEl.value = maxChars;
    for (let i = 0; i < passwordElements.length; i++) {
        passwordElements[i].textContent = "";
        passwordElements[i].style.width = String(maxChars*16) + "px";
        for (let j = 0; j < maxChars; j++) {
            passwordElements[i].textContent += getRandomChar();
        }
    }
}
function getRandomChar() {
    const randomChar =Math.floor(Math.random() * (126 - 32 + 1)) + 32;
    return String.fromCharCode(randomChar);
}
function copyToClipboard(num) {
    const passwordEl =  passwordElements[num-1];
    if (passwordEl.classList.contains('clicked')) {
        return;
    }
    navigator.clipboard.writeText(passwordEl.textContent);
    const beforeText = passwordEl.innerText
    const beforeFontSize = passwordEl.style.fontSize;
    const styles = window.getComputedStyle(passwordEl);
    const maxChars = Math.min(passLengthEl.value,passLengthEl.max);

    passwordEl.style.height = styles.height;

    passwordEl.classList.add('clicked');

    if(maxChars > 351){
        passwordEl.innerText = "Hearken, noble traveler of the boundless realms of computation! Verily, the deed hath been accomplished, the sacred markings of thine chosen text hath been seized, duplicated, and set upon the ethereal clipboard, that invisible parchment wherein such tokens of language are preserved in wait for their destined pasting. Rejoice, for the password is copied!";
    }
    else{
        passwordEl.innerText = "Copied!".slice(0,Math.max(1,maxChars));
        passwordEl.style.fontSize = Math.min((parseInt(styles.height)*0.6),200) + "px";
    }
    setTimeout(() => {
    passwordEl.classList.remove('clicked');
    passwordEl.innerText = beforeText;
    passwordEl.style.fontSize = beforeFontSize
    passwordEl.style.height = "auto";
    }, 1000);
}
function genPassElements(num) {
    for(let i=0; i<num; i++) {
    document.getElementById("main").innerHTML += `<button class="gen-pass" onclick="copyToClipboard(${i+1})">PASSWORD</button>`;
    }
    passwordElements = document.querySelectorAll(".gen-pass")
    passNumEl.value = num;
}

document.getElementById("suble-txt").innerText += " (max. " + passLengthEl.max + " chars/passwords)";


const result = document.getElementById("res");
const sound = document.getElementById("speech");
const btn = document.getElementById("convert-btn");
const loadingPage = document.getElementById("loadingPage");
const startPage = document.getElementById("startPage");

window.addEventListener('load', () => {
    let ttm = document.getElementById("ttm");
    let mtt = document.getElementById("mtt");

    const handleClick = (event) => {
        let value;
        if (event.target === ttm) {
            value = parseInt(ttm.value);
        } else if (event.target === mtt) {
            value = parseInt(mtt.value);
        }
        startConverter(value);
        loadingPage.style.display = "none";
        startPage.style.display = "";
    };
    ttm.addEventListener('click', handleClick);
    mtt.addEventListener('click', handleClick);
});

function startConverter(value) {
    let text = document.getElementById("text");
    let preText = document.getElementById("pre-text");
    let inputBox = document.getElementById("inp-word");

    const inputBoxPlaceholder = inputBox.placeholder;
    inputBox.addEventListener("focus", () => {
        if (inputBox.value === "") {
            inputBox.placeholder = "";
        }
    });
    inputBox.addEventListener("blur", () => {
        if (inputBox.value === "") {
            inputBox.placeholder = inputBoxPlaceholder;
        }
    });

    inputBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            btn.click();
        }
    });

    if (value == 1) {
        preText.innerHTML = "text";
        text.innerHTML = "Morse Code";
        btn.addEventListener("click", () => {
            let inpText = inputBox.value;
            if (!inpText.trim()) {
                alert("Please enter valid text to convert.");
                return;
            }
            result.innerHTML = `
                <div class="word">
                    <h3>${inpText}</h3>
                </div>
                <p class="word-mean">${textToMorse(inpText)}</p>
            `;
        });
    } else {
        preText.innerHTML = "morse code";
        text.innerHTML = "Text";
        btn.addEventListener("click", () => {
            let inpText = inputBox.value;
            if (!inpText.trim()) {
                alert("Please enter valid Morse code to convert.");
                return;
            }
            result.innerHTML = `
                <div class="word">
                    <h3>${inpText}</h3>
                </div>
                <p class="word-mean">${morseToText(inpText)}</p>
            `;
        });
    }

    function textToMorse(text) {
        text = text.toUpperCase();
        let morseCode = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === ' ') {
                morseCode += '/';
            } else if (MORSE_CODE[char]) {
                morseCode += MORSE_CODE[char] + ' ';
            } else {
                const specialCode = SPECIAL_CHARACTERS[char];
                if (specialCode) {
                    morseCode += specialCode + ' ';
                }
            }
        }
        return morseCode.trim();
    }

    function morseToText(morseCode) {
        reverseMorseCode();
        const words = morseCode.split('/');
        let text = '';
        for (let i = 0; i < words.length; i++) {
            const word = words[i].trim();
            if (word !== '') {
                const letters = word.split(' ');
                for (let j = 0; j < letters.length; j++) {
                    const letter = letters[j];
                    if (MORSE_CODE_REV[letter]) {
                        text += MORSE_CODE_REV[letter];
                    } else {
                        for (const key in SPECIAL_CHARACTERS) {
                            if (SPECIAL_CHARACTERS[key] === letter) {
                                text += key;
                                break;
                            }
                        }
                    }
                }
                text += ' ';
            }
        }
        return text.trim();
    }

    const MORSE_CODE = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..',
        'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
        '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.'
    };

    const MORSE_CODE_REV = {};
    function reverseMorseCode() {
        for (const key in MORSE_CODE) {
            const value = MORSE_CODE[key];
            MORSE_CODE_REV[value] = key;
        }
    }

    const SPECIAL_CHARACTERS = {
        '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
        '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
        '$': '...-..-', '@': '.--.-.'
    };
}

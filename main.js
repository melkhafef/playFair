const caesar = document.querySelector('#caesar');
const playFair = document.querySelector('#playFair');
const caesarKey = document.querySelector('#caesarKey');
const playFairKey = document.querySelector('#playFairKey');
const plainMessage = document.querySelector('#plain');
const encryptedMessage = document.querySelector('#encrypted');
const encrypteBtn = document.querySelector('#encrypte');
const decrypteBtn = document.querySelector('#decrypte');
const resetBtn = document.querySelector('#reset');
playFairKey.disabled = true;
caesarKey.disabled = true;
let encryptedMessageChars = [];
let plainMessageChars = [];
let nsc = 0;
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
caesar.addEventListener('click', (e) => {
    playFairKey.disabled = true;
    caesarKey.disabled = false;
})
playFair.addEventListener('click', (e) => {
    playFairKey.disabled = false;
    caesarKey.disabled = true;
})
encrypteBtn.addEventListener('click', (e) => {
    // when select caesar
    if (caesar.checked) {
        if (caesarKey.value === "") {
            alert("you must entre number caesar key from 1 to 25")
        } else if (isNaN(caesarKey.value)) {
            alert("you must entre number caesar key from 1 to 25")
        } else if (caesarKey.value < 1 || caesarKey.value > 25) {
            alert("you must entre number caesar key from 1 to 25")

        } else if (plainMessage.value === "") {
            alert("you must entre plain Message ")
        } else {
            plainMessageChars = plainMessage.value.split('');
            for (plainMessageCharsIndex = 0; plainMessageCharsIndex < plainMessageChars.length; plainMessageCharsIndex++) {
                if (plainMessageChars[plainMessageCharsIndex] === " ") {
                    continue;
                } else if (isNaN(plainMessageChars[plainMessageCharsIndex])) {
                    for (alphabetIndex = 0; alphabetIndex < alphabet.length; alphabetIndex++) {
                        if (plainMessageChars[plainMessageCharsIndex].toLowerCase() === alphabet[alphabetIndex]) {
                            encryptedAlphabetIndex = (alphabetIndex + parseInt(caesarKey.value)) % 26;
                            encryptedMessageChars.push(alphabet[encryptedAlphabetIndex]);
                        }
                    }
                } else {
                    encryptedMessageChars.push(plainMessageChars[plainMessageCharsIndex]);
                }

            }
            encryptedMessage.value = encryptedMessageChars.join("");
            encryptedMessageChars = [];
            plainMessageChars = [];
            plainMessage.value = "";
        }
    }
    //when select play fair
    else if (playFair.checked) {
        // make play fair key and plain message to small char 
        playFairKey.value = playFairKey.value.toLowerCase();
        plainMessage.value = plainMessage.value.toLowerCase();
        // counters for valid key char
        vkc1 = 0;
        vkc2 = 0;
        //count valid char in play fair key
        for (i = 0; i < playFairKey.value.length; i++) {
            for (j = 0; j < alphabet.length; j++) {
                if (playFairKey.value[i] === alphabet[j]) {
                    vkc1++;
                }
            }
        }
        //count valid char in plain message
        for (i = 0; i < plainMessage.value.length; i++) {
            for (j = 0; j < alphabet.length; j++) {
                if (plainMessage.value[i] === alphabet[j]) {
                    vkc2++;
                }
            }
        }
        // check if play fair key  is empty
        if (playFairKey.value === "") {
            alert("you must entre playfair key string from a to z")
        }
        // check if play fair key contains special char
        else if (vkc1 !== playFairKey.value.length) {
            alert("you must entre key string from a to z without special character")
        }
        // check if plain message is empty
        else if (plainMessage.value === "") {
            alert("you must entre plain Message ")
        }
        // check if plain message contains special char
        else if (plainMessage.value.length !== vkc2) {
            alert("you must entre message string from a to z without special character and spaces")
        }
        // start encrypte
        else {
            //clear encrypted message content 
            encryptedMessage.value = '';
            //initial matrix 1-D
            matrixI = [];
            //final matrix 2-D
            matrix = [
                [],
                [],
                [],
                [],
                []
            ];
            // index for matrixI(initial matrix)
            indexOfMatrixI = 0;
            //array to store pair of char of plain message
            pairOfChar = [];
            //index for each char of every one pair
            let x1, x2, y1, y2;
            //put play fair key chars in initial matrix without repeating
            for (i = 0; i < playFairKey.value.length; i++) {
                if (!matrixI.includes(playFairKey.value[i])) {
                    matrixI.push(playFairKey.value[i]);
                }
            }
            //then put others alphabet chars in initial matrix without repeating
            for (j = 0; j < alphabet.length; j++) {
                if (!matrixI.includes(alphabet[j])) {
                    matrixI.push(alphabet[j])
                }
            }
            // take 'i' char index in initial matrix
            for (j = 0; j < matrixI.length; j++) {
                if (matrixI[j] === 'i') {
                    iIndex = j;
                }
            }
            // take 'j' char index in initial matrix
            for (j = 0; j < matrixI.length; j++) {
                if (matrixI[j] === 'j') {
                    jIndex = j;
                }
            }
            //check who come first 'i' or 'j' and remove the other and replace the change in plain message
            if (iIndex < jIndex) {
                matrixI.splice(jIndex, 1);
                plain = plainMessage.value.split('');
                for (i = 0; i < plain.length; i++) {
                    if (plain[i] === 'j') {
                        plain[i] = 'i';
                    }
                }
                plainMessage.value = plain.join('');
            } else {
                matrixI.splice(iIndex, 1);
                plain = plainMessage.value.split('');
                for (i = 0; i < plain.length; i++) {
                    if (plain[i] === 'i') {
                        plain[i] = 'j';
                    }
                }
                plainMessage.value = plain.join('');

            }
            //put 1-D matrix in 2-D 5*5 matrix
            for (j = 0; j < 5; j++) {
                for (k = 0; k < 5; k++) {
                    matrix[j][k] = matrixI[indexOfMatrixI]
                    indexOfMatrixI++;
                }
            }
            //divide plain message to pair of char
            for (i = 0; i < plainMessage.value.length; i += 2) {
                pairOfChar.push(plainMessage.value.substring(i, i + 2));
            }
            //if one pair contains the same char add 'x' between them
            for (i = 0; i < pairOfChar.length; i++) {
                if (pairOfChar[i][0] === pairOfChar[i][1]) {
                    pairOfChar[i] = `${pairOfChar[i][0]}x${pairOfChar[i][0]}`;
                    // return from division
                    message = pairOfChar.join('');
                    // clear pair of char
                    pairOfChar = [];
                    //return to division
                    for (i = 0; i < message.length; i += 2) {
                        pairOfChar.push(message.substring(i, i + 2));
                    }
                }
            }
            // check if char is odd the last element in pair equal  1 add x with it
            if (pairOfChar[pairOfChar.length - 1].length === 1) {
                pairOfChar[pairOfChar.length - 1] = pairOfChar[pairOfChar.length - 1] + 'x';
            }
            //store index for each char for every pair
            for (i = 0; i < pairOfChar.length; i++) {
                for (j = 0; j < 5; j++) {
                    for (k = 0; k < 5; k++) {
                        if (matrix[j][k] === pairOfChar[i][0]) {
                            x1 = j;
                            y1 = k;
                        }
                        if (matrix[j][k] === pairOfChar[i][1]) {
                            x2 = j;
                            y2 = k;
                        }
                    }
                }
                // if in the same row
                if (x1 === x2) {
                    y1 = (y1 + 1) % 5;
                    y2 = (y2 + 1) % 5;
                    encryptedMessage.value += `${matrix[x1][y1]}${matrix[x2][y2]}`;
                }
                // if in the same column
                else if (y1 == y2) {
                    x1 = (x1 + 1) % 5;
                    x2 = (x2 + 1) % 5;
                    encryptedMessage.value += `${matrix[x1][y1]}${matrix[x2][y2]}`;
                }
                // in different row and column
                else {
                    let t = y1;
                    y1 = y2;
                    y2 = t;
                    encryptedMessage.value += `${matrix[x1][y1]}${matrix[x2][y2]}`;
                }
            }
            // clear plain message
            plainMessage.value = '';
        }
    }
    // when no chose type of cipher  
    else {
        alert("you must choose type of encryption")
    }
})
decrypteBtn.addEventListener('click', (e) => {
    if (caesar.checked) {
        if (caesarKey.value === "") {
            alert("you must entre number caesar key from 1 to 25")
        } else if (isNaN(caesarKey.value)) {
            alert("you must entre number caesar key from 1 to 25")
        } else if (caesarKey.value < 1 || caesarKey.value > 25) {
            alert("you must entre number caesar key from 1 to 25")

        } else if (encryptedMessage.value === "") {
            alert("you must entre encrypted message ")
        } else {
            encryptedMessageChars = encryptedMessage.value.split('');
            for (encryptedMessageCharsIndex = 0; encryptedMessageCharsIndex < encryptedMessageChars.length; encryptedMessageCharsIndex++) {
                if (encryptedMessageChars[encryptedMessageChars] === " ") {
                    continue;
                } else if (isNaN(encryptedMessageChars[encryptedMessageCharsIndex])) {
                    for (alphabetIndex = 0; alphabetIndex < alphabet.length; alphabetIndex++) {
                        if (encryptedMessageChars[encryptedMessageCharsIndex].toLowerCase() === alphabet[alphabetIndex]) {
                            plainAlphabetIndex = (alphabetIndex - parseInt(caesarKey.value));
                            if (plainAlphabetIndex < 0) {
                                plainAlphabetIndex += 26;
                            }
                            plainMessageChars.push(alphabet[plainAlphabetIndex]);
                        }
                    }
                } else {
                    plainMessageChars.push(encryptedMessageChars[encryptedMessageCharsIndex]);
                }

            }
            plainMessage.value = plainMessageChars.join("");
            plainMessageChars = [];
            encryptedMessageChars = [];
            encryptedMessage.value = "";
        }
    } else if (playFair.checked) {
        // make play fair key and encrypted message to small char 
        playFairKey.value = playFairKey.value.toLowerCase();
        encryptedMessage.value = encryptedMessage.value.toLowerCase();
        // counters for valid key char
        vkc1 = 0;
        vkc2 = 0;
        //count valid char in play fair key
        for (i = 0; i < playFairKey.value.length; i++) {
            for (j = 0; j < alphabet.length; j++) {
                if (playFairKey.value[i] === alphabet[j]) {
                    vkc1++;
                }
            }
        }
        //count valid char in encrypted message
        for (i = 0; i < encryptedMessage.value.length; i++) {
            for (j = 0; j < alphabet.length; j++) {
                if (encryptedMessage.value[i] === alphabet[j]) {
                    vkc2++;
                }
            }
        }
        // check if play fair key  is empty
        if (playFairKey.value === "") {
            alert("you must entre playfair key string from a to z")
        }
        // check if play fair key contains special char
        else if (vkc1 !== playFairKey.value.length) {
            alert("you must entre key string from a to z without special character")
        }
        // check if encrypted message is empty
        else if (encryptedMessage.value === "") {
            alert("you must entre encrypted Message ")
        }
        // check if encrypted message contains special char
        else if (encryptedMessage.value.length !== vkc2) {
            alert("you must entre message string from a to z without special character and spaces")
        }
        // start decrypte
        else {
            //clear plain message content 
            plainMessage.value = '';
            //initial matrix 1-D
            matrixI = [];
            //final matrix 2-D
            matrix = [
                [],
                [],
                [],
                [],
                []
            ];
            // index for matrixI(initial matrix)
            indexOfMatrixI = 0;
            //array to store pair of char of plain message
            pairOfChar = [];
            //index for each char of every one pair
            let x1, x2, y1, y2;
            //put play fair key chars in initial matrix without repeating
            for (i = 0; i < playFairKey.value.length; i++) {
                if (!matrixI.includes(playFairKey.value[i])) {
                    matrixI.push(playFairKey.value[i]);
                }
            }
            //then put others alphabet chars in initial matrix without repeating
            for (j = 0; j < alphabet.length; j++) {
                if (!matrixI.includes(alphabet[j])) {
                    matrixI.push(alphabet[j])
                }
            }
            // take 'i' char index in initial matrix
            for (j = 0; j < matrixI.length; j++) {
                if (matrixI[j] === 'i') {
                    iIndex = j;
                }
            }
            // take 'j' char index in initial matrix
            for (j = 0; j < matrixI.length; j++) {
                if (matrixI[j] === 'j') {
                    jIndex = j;
                }
            }
            //check who come first 'i' or 'j' and remove the other and replace the change in encrypte message
            if (iIndex < jIndex) {
                matrixI.splice(jIndex, 1);
                encrypte = encryptedMessage.value.split('');
                for (i = 0; i < encrypte.length; i++) {
                    if (encrypte[i] === 'j') {
                        encrypte[i] = 'i';
                    }
                }
                encryptedMessage.value = encrypte.join('');
            } else {
                matrixI.splice(iIndex, 1);
                encrypte = encryptedMessage.value.split('');
                for (i = 0; i < encrypte.length; i++) {
                    if (encrypte[i] === 'i') {
                        encrypte[i] = 'j';
                    }
                }
                encryptedMessage.value = encrypte.join('');

            }
            //put 1-D matrix in 2-D 5*5 matrix
            for (j = 0; j < 5; j++) {
                for (k = 0; k < 5; k++) {
                    matrix[j][k] = matrixI[indexOfMatrixI]
                    indexOfMatrixI++;
                }
            }
            //divide encrypted message to pair of char
            for (i = 0; i < encryptedMessage.value.length; i += 2) {
                pairOfChar.push(encryptedMessage.value.substring(i, i + 2));
            }
            //if one pair contains the same char add 'x' between them
            for (i = 0; i < pairOfChar.length; i++) {
                if (pairOfChar[i][0] === pairOfChar[i][1]) {
                    pairOfChar[i] = `${pairOfChar[i][0]}x${pairOfChar[i][0]}`;
                    // return from division
                    message = pairOfChar.join('');
                    // clear pair of char
                    pairOfChar = [];
                    //return to division
                    for (i = 0; i < message.length; i += 2) {
                        pairOfChar.push(message.substring(i, i + 2));
                    }
                }
            }
            // check if char is odd the last element in pair equal  1 add x with it
            if (pairOfChar[pairOfChar.length - 1].length === 1) {
                pairOfChar[pairOfChar.length - 1] = pairOfChar[pairOfChar.length - 1] + 'x';
            }
            //store index for each char for every pair
            for (i = 0; i < pairOfChar.length; i++) {
                for (j = 0; j < 5; j++) {
                    for (k = 0; k < 5; k++) {
                        if (matrix[j][k] === pairOfChar[i][0]) {
                            x1 = j;
                            y1 = k;
                        }
                        if (matrix[j][k] === pairOfChar[i][1]) {
                            x2 = j;
                            y2 = k;
                        }
                    }
                }
                // if in the same row
                if (x1 === x2) {
                    y1 = ((y1 - 1)+5) % 5;
                    y2 = ((y2 - 1)+5) % 5;
                    plainMessage.value += `${matrix[x1][y1]}${matrix[x2][y2]}`;
                }
                // if in the same column
                else if (y1 === y2) {
                    x1 = ((x1 - 1) + 5) % 5;
                    x2 = ((x2 - 1) + 5) % 5;
                    plainMessage.value += `${matrix[x1][y1]}${matrix[x2][y2]}`;
                }
                // in different row and column
                else {
                    let t = y1;
                    y1 = y2;
                    y2 = t;
                    plainMessage.value += `${matrix[x1][y1]}${matrix[x2][y2]}`;
                }
            }
            // clear encreapted message
            encryptedMessage.value = '';
        }
    }
    // when no chose type of cipher
    else {
        alert("you must choose type of encryption")
    }
})
resetBtn.addEventListener('click', (e) => {
    caesar.checked = false;
    playFair.checked = false;
    caesarKey.disabled = true;
    playFairKey.disabled = true;
    caesarKey.value = "";
    playFairKey.value = "";
    plainMessage.value = "";
    encryptedMessage.value = "";
})
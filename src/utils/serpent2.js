// --- Definiciones de S-boxes y Permutaciones ---
const serpentSBoxes = [
    [3, 8, 15, 1, 10, 6, 5, 11, 14, 13, 4, 2, 7, 0, 9, 12],
    [15, 12, 2, 7, 9, 0, 5, 10, 1, 11, 14, 8, 6, 13, 3, 4],
    [8, 6, 7, 9, 3, 12, 10, 15, 1, 13, 5, 0, 14, 4, 2, 11],
    [0, 15, 11, 8, 12, 9, 6, 3, 13, 1, 2, 4, 10, 7, 5, 14],
    [1, 15, 8, 3, 12, 0, 11, 6, 2, 5, 4, 10, 9, 14, 7, 13],
    [15, 5, 2, 11, 4, 10, 9, 12, 0, 3, 14, 8, 13, 6, 7, 1],
    [7, 2, 12, 5, 8, 4, 6, 11, 14, 9, 1, 15, 13, 3, 10, 0],
    [1, 13, 15, 0, 14, 8, 2, 11, 7, 4, 12, 10, 9, 3, 5, 6]
];

const serpentPermutations = [
    0, 32, 64, 96, 1, 33, 65, 97, 2, 34, 66, 98, 3, 35, 67, 99,
    4, 36, 68, 100, 5, 37, 69, 101, 6, 38, 70, 102, 7, 39, 71, 103,
    8, 40, 72, 104, 9, 41, 73, 105, 10, 42, 74, 106, 11, 43, 75, 107,
    12, 44, 76, 108, 13, 45, 77, 109, 14, 46, 78, 110, 15, 47, 79, 111,
    16, 48, 80, 112, 17, 49, 81, 113, 18, 50, 82, 114, 19, 51, 83, 115,
    20, 52, 84, 116, 21, 53, 85, 117, 22, 54, 86, 118, 23, 55, 87, 119,
    24, 56, 88, 120, 25, 57, 89, 121, 26, 58, 90, 122, 27, 59, 91, 123,
    28, 60, 92, 124, 29, 61, 93, 125, 30, 62, 94, 126, 31, 63, 95, 127
];

// --- Funciones Principales de Serpent ---

// Función para cifrar un mensaje usando Serpent
function serpentEncrypt(message, key) {
    if (!message || !key) {
        throw new Error('El mensaje y la clave no pueden ser vacíos o indefinidos.');
    }

    // Convertir el mensaje a binario y rellenar a 128 bits
    let binaryMessage = stringToBinary(message);
    binaryMessage = padTo128Bits(binaryMessage);

    // Generar las subclaves
    let subKeys = keyExpansion(stringToBinary(key));

    // Mezcla inicial con la primera subclave
    let state = xor(binaryMessage, subKeys[0]);

    // Aplicar 32 rondas de cifrado
    for (let round = 0; round < 32; round++) {
        state = sBoxSubstitution(state, round);
        state = permutation(state);
        state = xor(state, subKeys[round + 1]);
    }

    // Última mezcla con la subclave final
    state = xor(state, subKeys[32]);

    // Convertir a hexadecimal
    let encryptedMessageHex = binaryToHex(state);
    return encryptedMessageHex;
}

// Función para generar subclaves de Serpent
function keyExpansion(binaryKey) {
    let subKeys = [];
    // Generación de subclaves simplificada
    for (let i = 0; i < 33; i++) {
        subKeys.push(binaryKey.padEnd(128, '0').slice(0, 128)); // Esto es ilustrativo
    }
    return subKeys;
}

// Función para aplicar S-boxes
function sBoxSubstitution(state, round) {
    let sBox = serpentSBoxes[round % serpentSBoxes.length];
    let substituted = '';
    for (let i = 0; i < state.length; i += 4) {
        let nibble = parseInt(state.slice(i, i + 4), 2);
        let substitutedNibble = sBox[nibble];
        substituted += substitutedNibble.toString(2).padStart(4, '0');
    }
    return substituted;
}

// Función para aplicar la permutación
function permutation(state) {
    let permuted = new Array(state.length);
    for (let i = 0; i < state.length; i++) {
        permuted[i] = state[serpentPermutations[i]];
    }
    return permuted.join('');
}

// Función auxiliar para convertir una cadena de texto a binario
function stringToBinary(input) {
    return input.split('').map(char => {
        let binary = char.charCodeAt(0).toString(2);
        return binary.padStart(8, '0'); // Asegurar 8 bits por carácter
    }).join('');
}

// Función auxiliar para convertir binario a hexadecimal
function binaryToHex(binary) {
    let hex = '';
    for (let i = 0; i < binary.length; i += 4) {
        let nibble = binary.slice(i, i + 4);
        hex += parseInt(nibble, 2).toString(16);
    }
    return hex.toUpperCase();
}

// Función auxiliar para convertir hexadecimal a binario
function hexToBinary(hex) {
    return hex.split('').map(char => {
        let binary = parseInt(char, 16).toString(2);
        return binary.padStart(4, '0'); // Asegurar 4 bits por carácter hexadecimal
    }).join('');
}

// Función auxiliar para convertir binario a texto
function binaryToString(binary) {
    let chars = [];
    for (let i = 0; i < binary.length; i += 8) {
        let byte = binary.slice(i, i + 8);
        chars.push(String.fromCharCode(parseInt(byte, 2)));
    }
    return chars.join('');
}

// Función auxiliar para aplicar XOR entre dos cadenas binarias
function xor(binary1, binary2) {
    let result = '';
    for (let i = 0; i < binary1.length; i++) {
        result += (binary1[i] ^ binary2[i]).toString(); // Aplicar XOR bit a bit
    }
    return result;
}

// Función para ajustar a 128 bits
// Función para ajustar a 128 bits con PKCS#7
function padTo128Bits(binaryMessage) {
    let paddingLength = 128 - (binaryMessage.length % 128);
    let padding = ''.padEnd(paddingLength, '0'); // En PKCS#7, esto normalmente sería el número del padding repetido
    return binaryMessage + padding;
}

// Función para descifrar un mensaje usando Serpent
function serpentDecrypt(ciphertext, key) {
    if (!ciphertext || !key) {
        throw new Error('El texto cifrado y la clave no pueden ser vacíos o indefinidos.');
    }

    // Convertir el mensaje cifrado de hexadecimal a binario
    let binaryCiphertext = hexToBinary(ciphertext);

    // Generar las subclaves
    let subKeys = keyExpansion(stringToBinary(key));

    // Última mezcla inversa con la última subclave
    let state = xor(binaryCiphertext, subKeys[32]);

    // Aplicar las rondas de descifrado en orden inverso
    for (let round = 31; round >= 0; round--) {
        state = xor(state, subKeys[round]);
        state = inversePermutation(state);
        state = inverseSBoxSubstitution(state, round);
    }

    // Mezcla inversa con la primera subclave
    state = xor(state, subKeys[0]);

    // Convertir de binario a texto
    let decryptedMessage = binaryToString(state);

    // Eliminar el relleno (PKCS#7)
    decryptedMessage = decryptedMessage.replace(/\0+$/, '');

    return decryptedMessage;
}


// Función para aplicar S-boxes inversas
function inverseSBoxSubstitution(state, round) {
    let sBox = serpentSBoxes[round % serpentSBoxes.length];
    let inverseSBox = new Array(16);
    for (let i = 0; i < sBox.length; i++) {
        inverseSBox[sBox[i]] = i; // Generar la S-box inversa
    }

    let substituted = '';
    for (let i = 0; i < state.length; i += 4) {
        let nibble = parseInt(state.slice(i, i + 4), 2);
        let substitutedNibble = inverseSBox[nibble];
        substituted += substitutedNibble.toString(2).padStart(4, '0');
    }
    return substituted;
}

// Función para aplicar la permutación inversa
function inversePermutation(state) {
    let inversePermutation = new Array(serpentPermutations.length);
    for (let i = 0; i < serpentPermutations.length; i++) {
        inversePermutation[serpentPermutations[i]] = i;
    }

    let permuted = new Array(state.length);
    for (let i = 0; i < state.length; i++) {
        permuted[i] = state[inversePermutation[i]];
    }
    return permuted.join('');
}

// Exportar funciones
module.exports = {
    serpentEncrypt,
    serpentDecrypt
};

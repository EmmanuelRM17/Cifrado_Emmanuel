// Función para cifrar un mensaje
function serpentEncrypt(message, key) {
    if (!message || !key) {
        throw new Error('El mensaje y la clave no pueden ser vacíos o indefinidos.');
    }

    // Convertir el mensaje y la clave a binario
    let binaryMessage = stringToBinary(message);
    let binaryKey = stringToBinary(key);

    console.log("Mensaje en binario:", binaryMessage);
    console.log("Clave en binario:", binaryKey);

    // Asegurar que el binario de la clave tenga al menos la longitud del mensaje
    if (binaryKey.length < binaryMessage.length) {
        binaryKey = adjustKeyLength(binaryKey, binaryMessage.length);
    }

    // Aplicar XOR entre el mensaje y la clave
    let encryptedMessageBinary = xor(binaryMessage, binaryKey);

    console.log("Mensaje cifrado en binario:", encryptedMessageBinary);

    // Convertir el mensaje cifrado de binario a hexadecimal
    let encryptedMessageHex = binaryToHex(encryptedMessageBinary);

    console.log("Mensaje cifrado en hexadecimal:", encryptedMessageHex);

    return encryptedMessageHex;
}

// Función para descifrar un mensaje cifrado
function serpentDecrypt(ciphertext, key) {
    if (!ciphertext || !key) {
        throw new Error('El texto cifrado y la clave no pueden ser vacíos o indefinidos.');
    }

    // Convertir el mensaje cifrado de hexadecimal a binario
    let binaryCiphertext = hexToBinary(ciphertext);
    let binaryKey = stringToBinary(key);

    console.log("Mensaje cifrado en binario para descifrar:", binaryCiphertext);
    console.log("Clave en binario para descifrar:", binaryKey);

    // Asegurar que el binario de la clave tenga al menos la longitud del mensaje cifrado
    if (binaryKey.length < binaryCiphertext.length) {
        binaryKey = adjustKeyLength(binaryKey, binaryCiphertext.length);
    }

    // Aplicar XOR entre el mensaje cifrado y la clave para descifrar
    let decryptedMessageBinary = xor(binaryCiphertext, binaryKey);

    console.log("Mensaje descifrado en binario:", decryptedMessageBinary);

    // Convertir el mensaje descifrado de binario a texto
    let decryptedMessage = binaryToString(decryptedMessageBinary);

    console.log("Mensaje descifrado en texto:", decryptedMessage);

    return decryptedMessage;
}

// Función auxiliar para convertir una cadena de texto a binario
function stringToBinary(input) {
    return input.split('').map(char => {
        let binary = char.charCodeAt(0).toString(2);
        return binary.padStart(8, '0'); // Asegurar 8 bits por carácter
    }).join('');
}

// Función auxiliar para convertir binario a una cadena de texto
function binaryToString(binary) {
    let chars = [];
    for (let i = 0; i < binary.length; i += 8) {
        let byte = binary.slice(i, i + 8);
        chars.push(String.fromCharCode(parseInt(byte, 2)));
    }
    return chars.join('');
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

// Función auxiliar para ajustar la longitud de la clave
function adjustKeyLength(key, length) {
    let adjustedKey = key;
    while (adjustedKey.length < length) {
        adjustedKey += key; // Repetir la clave hasta alcanzar la longitud requerida
    }
    return adjustedKey.slice(0, length); // Recortar al tamaño exacto necesario
}

// Función auxiliar para aplicar XOR entre dos cadenas binarias
function xor(binary1, binary2) {
    let result = '';

    for (let i = 0; i < binary1.length; i++) {
        result += (binary1[i] ^ binary2[i]).toString(); // Aplicar XOR bit a bit
    }

    return result;
}

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    serpentEncrypt,
    serpentDecrypt
};

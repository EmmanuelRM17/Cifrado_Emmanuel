// NTRUEncrypt.js
class Polynomial {
    constructor(coeffs) {
        this.coeffs = coeffs;
    }

    add(other, mod) {
        const maxLength = Math.max(this.coeffs.length, other.coeffs.length);
        const result = new Array(maxLength).fill(0);

        for (let i = 0; i < maxLength; i++) {
            const a = this.coeffs[i] || 0;
            const b = other.coeffs[i] || 0;
            result[i] = (a + b) % mod;
        }

        return new Polynomial(result);
    }

    subtract(other, mod) {
        const maxLength = Math.max(this.coeffs.length, other.coeffs.length);
        const result = new Array(maxLength).fill(0);

        for (let i = 0; i < maxLength; i++) {
            const a = this.coeffs[i] || 0;
            const b = other.coeffs[i] || 0;
            result[i] = ((a - b) % mod + mod) % mod;
        }

        return new Polynomial(result);
    }

    multiply(other, mod) {
        const resultLength = this.coeffs.length + other.coeffs.length - 1;
        const result = new Array(resultLength).fill(0);

        for (let i = 0; i < this.coeffs.length; i++) {
            for (let j = 0; j < other.coeffs.length; j++) {
                result[i + j] += this.coeffs[i] * other.coeffs[j];
                result[i + j] %= mod;
            }
        }

        return new Polynomial(result);
    }

    mod(q) {
        return new Polynomial(this.coeffs.map(c => ((c % q) + q) % q));
    }

    toString() {
        return this.coeffs.join(", ");
    }
}

const NTRUEncrypt = {
    encrypt: (message, clave, q = 256) => {
        const m = new Polynomial(message.split('').map(char => char.charCodeAt(0)));

        const h = new Polynomial([parseInt(clave), 2, 3, 4]); // Polinomio simplificado

        const encryptedMessage = m.add(h, q).mod(q);
        return encryptedMessage.toString();
    },

    decrypt: (encryptedMessage, clave, q = 256) => {
        const coeffs = encryptedMessage.split(',').map(Number);
        const e = new Polynomial(coeffs);

        const h = new Polynomial([parseInt(clave), 2, 3, 4]); // Polinomio simplificado

        const decryptedPolynomial = e.subtract(h, q);

        const decryptedMessage = decryptedPolynomial.coeffs.map(c => String.fromCharCode(c)).join('');
        return decryptedMessage;
    }
};

export default NTRUEncrypt;

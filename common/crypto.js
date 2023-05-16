
const crypto = require("crypto");
const config = require('../config/config.json')
const algrthm = config.crypto.CRYPTO_ALG;
const key = config.crypto.CRYPTO_KEY;
const iv = config.crypto.CRYPTO_IV;


module.exports.encrypt = (data) => {
    if (!data) {
        return data;
    }
    let cipher = crypto.createCipheriv(algrthm, key, iv);
    let encryptedData = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    return encryptedData;

}
module.exports.decrypt = (data) => {
    if (!data) {
        return data;
    }
    const decipher = crypto.createDecipheriv(algrthm, key, iv);
    let decryptedData = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
    return decryptedData;
}
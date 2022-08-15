const crypto = require('crypto');

function sha1(data) { return crypto.createHash("sha1").update(data, "binary").digest("hex"); }
function encrypt(str, key = 37526) {return Buffer.from(xor(str, key)).toString('base64').replace(/\//g, '_').replace(/\+/g, '-') }
function xor(str, key) { return String.fromCodePoint(...str.split('').map((char, i) => char.charCodeAt(0) ^ key.toString().charCodeAt(i % key.toString().length))) }
//--------------------------------------------------------------------------

module.exports = {
    sha1,
    encrypt,
    xor,
}

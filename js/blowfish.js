/*
Copyright © 2022 Zechariah Kenny

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function blowfishIv() {
  return CryptoJS.lib.WordArray.random(8);
}

function blowfishSalt() {
  return CryptoJS.lib.WordArray.random(16);
}

function blowfishKey(password1, salting1) {
  let key448bit = CryptoJS.PBKDF2(password1, salting1, {
    keySize: 448/56,
    iterations: 100000 
  });

  return key448bit;
}

function blowfishEncrypt() {
  let message = plainTextBox.value;
  let salting = blowfishSalt();
  let nonce = blowfishIv();
  let key = blowfishKey(password.value, salting);
  key = CryptoJS.enc.Hex.parse(key);
  
  console.log(CryptoJS.enc.Utf8.parse(message));

  let cipherText = CryptoJS.Blowfish.encrypt(message, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
    iv: nonce
  });

  console.log(salting.toString());
  console.log(nonce.toString());

  let b64CipherText = salting + nonce + cipherText;
  encryptedTextBox.value = b64CipherText;
}

function blowfishDecrypt() {
  let dataArray = encryptedTextBox.value;
  let salting = dataArray.substr(0, 32);
  let nonce = dataArray.substr(32, 16);
  let ciphertext = dataArray.substr(48);

  salting = CryptoJS.enc.Hex.parse(salting);
  nonce = CryptoJS.enc.Hex.parse(nonce);

  let key = blowfishKey(password.value, salting);
  key = CryptoJS.enc.Hex.parse(key);

  let plainText = CryptoJS.Blowfish.decrypt(ciphertext, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
    iv: nonce
  });

  plainTextBox.value = plainText.toString(CryptoJS.enc.Utf8);
}
/*
Copyright © 2022 Zechariah Kenny

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var plainTextBox = document.getElementById("ptext");
var encryptedTextBox = document.getElementById("etext");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");
var selectBox = document.getElementById("algo");

var inFileData;
var outFileData;

function deriveKey(password, salting) {
  let key256bit = CryptoJS.PBKDF2(password, salting, {
    keySize: 256/32,
    iterations: 100000 
  });

  return key256bit;
}

function generateBytes() {
  return CryptoJS.lib.WordArray.random(16);
}

function checkPasswords() {
  if (password.value == confirmPassword.value) {
    return true;
  }

  return false;
}

function encrypt() {
  if (checkPasswords() !== false) {
    if (algo.selectedIndex == 1) {
      blowfishEncrypt();

      return;
    }

    let salting = generateBytes();
    let nonce = generateBytes();
    let message = plainTextBox.value;
    let key = deriveKey(password.value, salting)
    key = CryptoJS.enc.Hex.parse(key);

    let eax = CryptoJS.EAX.create(key);
    var ciphertext = eax.encrypt(message, nonce);

    if (ciphertext !== false) {
      encryptedTextBox.value = btoa(salting + "&" + nonce + "&" + ciphertext);
    } else {
      alert("Failed to encrypt check your password...");
    }
    
  } else {
    alert("Passwords dont match");
  }
}

function decrypt() {
  if (checkPasswords() !== false) {
    if (algo.selectedIndex == 1) {
      blowfishDecrypt();

      return;
    }

    let dataArray = atob(encryptedTextBox.value).split("&");
    let salting = dataArray[0];
    let nonce = dataArray[1];
    let ciphertext = dataArray[2];

    salting = CryptoJS.enc.Hex.parse(salting);
    nonce = CryptoJS.enc.Hex.parse(nonce);
    ciphertext = CryptoJS.enc.Hex.parse(ciphertext);

    let key = deriveKey(password.value, salting);
    key = CryptoJS.enc.Hex.parse(key);

    let eax = CryptoJS.EAX.create(key);
    let plainText = eax.decrypt(ciphertext, nonce);

    if (plainText !== false) {
      plainTextBox.value = plainText.toString(CryptoJS.enc.Utf8);
    } else {
      alert("Failed to decrypt check your password...");
    }

  } else {
    alert("Passwords dont match");
  }
}
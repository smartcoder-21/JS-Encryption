/*
Copyright © 2022 Zechariah Kenny

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var filePassword = document.getElementById("filePassword");
var confirmFilePassword = document.getElementById("confirmFilePassword");
var fileResultDisplay = document.getElementById("fileResultDisplay");

var fileName;
var inFileData;
var outFileData;
var newName;

function randomClearName() {
  return Math.floor(Math.random() * 10000000).toString();
}

function fileEncrypt() {
  fileResultDisplay.innerHTML = "Working...";
  setTimeout(function() {
    
    let salting = generateBytes();
    let nonce = generateBytes();
    let message = plainTextBox.value;
    let key = deriveKey(filePassword.value, salting);
    key = CryptoJS.enc.Hex.parse(key);

    if (filePassword.value == confirmFilePassword.value) {

      let eax = CryptoJS.EAX.create(key);
      let stringJson = JSON.stringify({name: fileName, data: inFileData});
      let ciphertext = eax.encrypt(stringJson, nonce);

      outFileData = salting + nonce + ciphertext;
      newName = randomClearName();

      fileResultDisplay.innerHTML = newName;

    } else {
      fileResultDisplay.innerHTML = "Failed...";
      alert("Passwords dont match");
    }
  }, 200);
}

function fileDecrypt() {
  fileResultDisplay.innerHTML = "Working...";
  
  setTimeout(function() {
    if (filePassword.value == confirmFilePassword.value) {

      let dataArray = inFileData;
      let salting = dataArray.substr(0, 32);
      let nonce = dataArray.substr(32, 32);
      let ciphertext = dataArray.substr(64);

      salting = CryptoJS.enc.Hex.parse(salting);
      nonce = CryptoJS.enc.Hex.parse(nonce);
      ciphertext = CryptoJS.enc.Hex.parse(ciphertext);

      let key = deriveKey(password.value, salting);
      key = CryptoJS.enc.Hex.parse(key);

      let eax = CryptoJS.EAX.create(key);
      outFileData = eax.decrypt(ciphertext, nonce);

      if (outFileData === false) {
        alert("Decryption failed check your password");
        fileResultDisplay.innerHTML = "Failed...";
      } else {

        outFileData = outFileData.toString(CryptoJS.enc.Utf8);

        let jsonData = JSON.parse(outFileData);

        newName = jsonData.name;
        outFileData = jsonData.data;

        fileResultDisplay.innerHTML = newName;

      }

    } else {
      fileResultDisplay.innerHTML = "Failed...";
      alert("Passwords dont match");
    }
  }, 200);
}

function readFile(input) {
  let file = input.files[0];
  fileName = file.name;
  let fileReader = new FileReader();
  
  fileReader.onload = function(event) {
    inFileData = event.target.result;
  }; 
  
  fileReader.onerror = function() {
    alert(fileReader.error);
  };
  
  fileReader.readAsText(file);
}

function downloadFile() {
  if (outFileData === null) {
    return;
  } else {
    download(outFileData, newName, "application/octet-stream");
  }
}

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

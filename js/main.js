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
      encryptedTextBox.value = salting + nonce + CryptoJS.enc.Base64.stringify(ciphertext);
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

    let dataArray = encryptedTextBox.value;
    let salting = dataArray.substr(0, 32);
    let nonce = dataArray.substr(32, 32);
    let ciphertext = dataArray.substr(64);

    salting = CryptoJS.enc.Hex.parse(salting);
    nonce = CryptoJS.enc.Hex.parse(nonce);
    ciphertext = CryptoJS.enc.Base64.parse(ciphertext);

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

function downloadCrypted() {
  download(encryptedTextBox.value, Math.floor((Math.random() * 999999) + 1).toString() + ".txt", "application/octet-stream");
}

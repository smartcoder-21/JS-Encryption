var lengthBox = document.getElementById("length");
var entropyDisplay = document.getElementById("entropy");
var passwdBox = document.getElementById('passwd');

var symbols = '~!@#$%^&*()_+=-`{}| \ ][:' + "'" + '"' + ";<>?/.,";
var numbers = "1234567890";
var capitals = "QWERTYUIOPASDFGHJKLZXCVBNM";
var lowercase = "qwertyuiopasdfghjklzxcvbnm";

// RNG
function rand() {
  let arrayOfByte = new Uint8Array(1);
  window.crypto.getRandomValues(arrayOfByte);

  let number = '0.' + arrayOfByte[0].toString();

  return Math.floor(number * (126 - 33 + 1)) + 33;
}

function calculateEntropy() {
  // Calculate the password's entropy
  let charset = 0;
  let entropy = 0;

  let sym = false;
  let num = false;
  let cap = false;
  let lower = false;

  for (let i = 0; i < passwdBox.value.length; i++) {
    if (symbols.includes(passwdBox.value[i]) && !sym)
    {
      sym = true;
      charset += 30;
    }

    if (numbers.includes(passwdBox.value[i]) && !num)
    {
      num = true;
      charset += 10;
    }

    if (capitals.includes(passwdBox.value[i]) && !cap)
    {
      cap = true;
      charset += 26;
    }

    if (lowercase.includes(passwdBox.value[i]) && !lower)
    {
      lower = true;
      charset += 26;
    }

    if (lower && cap && num && sym) {
      break;
    }
  }

  entropy = Math.log2(charset ** passwdBox.value.length);
  entropyDisplay.innerHTML = Number(Math.round(entropy+'e2')+'e-2');
}

function generatePassword() {
  // Generate the password
  let result = '';

  if (lengthBox.value == "" || lengthBox.value == null) {
    alert("Enter length");
  }

  for (let i = 0; i < parseInt(lengthBox.value); i++) {
    result += String.fromCharCode(rand());
  }

  passwdBox.value = result;

  // Call calculateEntropy
  calculateEntropy();
}
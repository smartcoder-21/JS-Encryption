var thisHash = "784474ab4b45bf95cd4120d1252ac2d0a62a1264a24dd06fda5c35d09de4a2a0"
var siteHash = null;
var update = document.getElementById("isitupdate")

$.get("https://JS-Encryption-updater.smartcoder21.repl.co", function(data) {
  siteHash = CryptoJS.SHA256(data);

  if (thisHash.toString() != siteHash.toString()) {
    update.innerHTML = "<span class='warning'>Not up to date download new version <a href='https://JS-Encryption-updater.smartcoder21.repl.co'>Here</a></span>";
    console.log(siteHash.toString());
    console.log(thisHash.toString());
  }
});
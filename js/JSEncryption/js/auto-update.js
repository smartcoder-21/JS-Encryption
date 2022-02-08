var thisHash = "d3762ce5392058929cc72505cb5cd6569f36bcf8cdd879f8f9181e26eb3f4079";
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
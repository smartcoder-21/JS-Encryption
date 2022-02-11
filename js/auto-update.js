var version = "2.3 Patch 1"
var update = document.getElementById("isitupdate")

$.get("https://JS-Encryption-updater.smartcoder21.repl.co/version.txt", function(data) {
  if (data != "2.3 Patch 1") {
    update.innerHTML = "<span class='warning'>Not up to date download new version <a href='https://JS-Encryption-updater.smartcoder21.repl.co'>Here</a></span>";
  }
});
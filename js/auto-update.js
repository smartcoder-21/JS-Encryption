var version = "2.3 (Incompatible with versions < 2.2)"
var update = document.getElementById("isitupdate")

$.get("https://JS-Encryption-updater.smartcoder21.repl.co/version.txt", function(data) {
  if (data != "2.3") {
    update.innerHTML = "<span class='warning'>Not up to date download new version <a href='https://JS-Encryption-updater.smartcoder21.repl.co'>Here</a></span>";
  }
});

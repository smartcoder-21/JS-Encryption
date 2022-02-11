# JS-Encryption
Javascript text encryption, file encryption, and password generator.

<a href="https://JS-Encryption-updater.smartcoder21.repl.co">Official download site</a>
<br>
Last updated 2/8/2022
Version 2.3 + is incompatible with versions 2.2 and below
<br>
<a href="https://JS-Encryption-20.smartcoder21.repl.co">Beta / Test version</a>
<br>

Warning may be buggy

Libraries used in this project:
CryptoJS
cryptojs-extension (all.min.js)
download.js

Nots for 2.3
Added some extra styling to the buttons
Added blowfish encryption with a 448 bit key
Removed the split based off of "&" when parsing encrypted data
Removed extra base64 encoding (because there was already base64 encoding)

Patch notes for 2.3 Patch 1
Improved the password generation with a cryptographically secure PRNG (CSPRNG / CPRNG)

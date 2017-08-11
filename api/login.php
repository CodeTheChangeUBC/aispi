<?php

// PLEASE CHANGE THIS IN PRODUCTION!
// 
// Yes. We're using a slight proof of work to prevent spam.
// Here's how it works. The client takes the password, and chains 100000 SHA256 hashes to it.
// The result of this is sent to the server.
// 
// The server, hashes that once with the salt value.
// The final result must be identical to PASSWORD_HASH.
// This reduces server load and prevents DDOSing.

define('PASSWORD_HASH','426dd33526a62c58620173e350ec42c61d31404476b094177128c07b94320ed5');
define('SALT','eab7073fc7134ac421eeed049597e01c');

echo (hash('sha256', SALT.$_GET['password']));
echo '<br>';
echo PASSWORD_HASH;


















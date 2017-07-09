# AISPI

[](https://img.shields.io/badge/Development-In%20Progress-yellow.svg) Animals in Science Policy Institute Calendar.


### Running Dev Server:

Two things must happen in order for the dev server to run properly.

#### Running the PHP API

Simply put, you must download a PHP and Apache server or combination like XAMPP or WAMP. Then you must point the server to this directory and run it.

#### Running the design server

The entire site is designed in jade, you must have node and npm installed:

 - run `npm install jade-server -g` in the command line
 - go into the design directory and run `jade-server .`


### Tests

API tests can be run by running `php /api/tests.php` on the command line.
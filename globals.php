<?php

session_start();

// Define Constants.
define('EVENT_FILE', '../events.csv');
define('BLOCK_FILE', '../blocks.csv');
define('MONTH_INDEX', 2);
define('YEAR_INDEX', 3);

define('DEBUG', true);

// Reporting turned on only if in debug mode.
error_reporting((DEBUG ? -1 : 0));

// Set up the appropriate headers .
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json");

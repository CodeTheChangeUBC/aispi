<?php

session_start();

// Define Constants.
define('EVENT_FILE', '/events.csv');
define('DEBUG', true);

// Reporting turned on only if in debug mode.
error_reporting((DEBUG ? -1 : 0));


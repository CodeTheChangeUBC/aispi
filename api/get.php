<?php

require '../index.php';


define('MONTH_INDEX', 2);
define('YEAR_INDEX', 3);


// Ensure that the GET variables are properly set.
if (!isset($_GET['month'])) {
    echo json_encode(['error' => 'please enter a month']);
    exit;
} else if (!isset($_GET['year'])) {
    echo json_encode(['error' => 'please enter a year']);
    exit;
}


// Everything seems good, so we start the GET from here.
$month = (int)$_GET['month'];
$year = (int)$_GET['year'];

$handle = fopen(EVENT_FILE,"r");

fgetcsv($handle);

$time_slice = [];

while ($data = fgetcsv($handle)) {
    if ($data[MONTH_INDEX] == $month && $data[YEAR_INDEX] == $year) {
        array_push($time_slice, $data);
    }
}

// Output it to the API.
echo json_encode($time_slice);

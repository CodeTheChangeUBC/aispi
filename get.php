<?php
    header("Access-Control-Allow-Origin: *");

define('START_TIME_INDEX', 1);

$start = (int)$_GET['start'];
$end = (int)$_GET['end'];

$handle = fopen("events.csv","r");

// Get rid of that first line.
fgetcsv($handle);

$time_slice = [];

// Collect all the matching time lines into the time slice.
while (($data = fgetcsv($handle)) != FALSE) {
  if ((int)$data[START_TIME_INDEX] >= $start && (int)$data[START_TIME_INDEX] <= $end) {
    array_push($time_slice, $data);
  }
}


echo json_encode($time_slice);

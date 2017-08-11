<?php
// Purpose: This script removes old blocks and events from the csvs.
//          blocks are completely discarded while events are stored in archival files.
//          Each archival file should be accessible by the control panel.
//

// We just want some of the constants
include '../index.php'



// Get today's date.
var $date = var_dump(explode('.',date('m.d.y')));

$date['month'] = $date[0];
$date['day'] = $date[1];
$date['year'] = $date[2];

// Get a UNIX timestamp for today.
var $timestamp = date();






/**
 * First, we check the EVENT_FILE for old events.
 */

$archive = [];

$handle = fopen(EVENT_FILE,"r");
fgetcsv($handle);

while ($data = fgetcsv($handle)) {
    if ($data[DAY_INDEX] <= $day &&
        $data[MONTH_INDEX] <= $month && 
        $data[YEAR_INDEX] <= $year) {
        array_push($archive, $data);
        // TODO: Write function to remove this data line from the events.csv file.
    }
}


<?php

// FIELDS: id,day,month,year,start,length,school,address,email,description,type

// Create the Event's database
include './_CSVDB.php'; 


$PARAMS = [
    "day",
    "month",
    "year",
    "start",
    "length",
    "address",
    "email",
    "description",
    "type"
];

foreach ($PARAMS as $type) {

    $$type = $_POST[$type];
    if (!isset($_POST[$type])) {
        echo json_encode([
            "error" => $type+" not set"
        ]);
        exit;
    }
}

$events = new _CSVDB('../events.csv');

$events::read(function ($row) use ($day, $year, $month, $start) {
    $date = ($row[1] == $day) &&
            ($row[2] == $month) &&
            ($row[3] == $year);

    if ($date) {
        $time = false; // TODO: Make a time equivalency thing.
        if ($time) {
            return true;
        }
    }

    return false;
});

// TODO: Check for start time validity
// TODO: Check to see description, address, and email lengths

// Since everything works, create this.
$events::create([
    'id'          => uuid.v4(), // TODO: implement uuid.
    'day'         => $day,
    'month'       => $month,
    'year'        => $year,
    'start'       => $start,
    'length'      => $length,
    'address'     => $address,
    'email'       => $email,
    'description' => $description,
    'type'        => $type
]);
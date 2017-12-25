<?php
header("Access-Control-Allow-Origin: *");

// FIELDS: id,day,month,year,start,length,school,address,email,description,type

// Create the Event's database
include './_CSVDB.php'; 
$events = new CSVDB('../events.csv');

// Intitialize constants
define('MAX_FIELD_SIZE', 2048);

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


// Go through all the preset params
for ($i = 0, $ii = count($PARAMS); $i < $ii; $i++) {
    // This fetches the parameter type e.g. day from $PARAMS
    $type = $PARAMS[$i];
    // Make sure the param exists, as it's posted.
    if (!isset($_POST[$type])) {
        echo json_encode([
            "error" => $type." not set..."
        ]);
        exit;
    }
    // Next, the variable with that name $day, is set to equal the
    // posted value from that day.
    $$type = $_POST[$type];

    // If there is something that isn't 
    if (sizeof($_POST[$type]) < MAX_FIELD_SIZE) {
        echo json_encode([
            "error" => $type." too large"
        ]);
        exit;
    }
}

// Make sure the date is valid.
if (!checkdate($month, $day, $year)) {
    echo json_encode([
        "error" => "invalid date"
    ]);
    exit;
}








$events::read(function ($row) use ($day, $year, $month, $start) {
    $date = ($row[1] == $day) &&
            ($row[2] == $month) &&
            ($row[3] == $year);

    if ($date) {
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
exit;
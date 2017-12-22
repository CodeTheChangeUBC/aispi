<?php
header("Access-Control-Allow-Origin: *");

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


// Check to see if all fields are filled in and don't over flow.
for ($i = 0, $ii = count($PARAMS); $i < $ii; $i++) {
    $type = $PARAMS[$i];
    $$type = $_POST[$type];
    var_dump($type);
    if (!isset($_POST[$type]) || sizeof($_POST[$type]) < 2048) {
        echo json_encode([
            "error" => $type." not set"
        ]);
        exit;
    }
}

// Check the date.
if (!checkdate($month, $day, $year)) {
    echo json_encode([
        "error" => "invalid date"
    ]);
    exit;
}





$events = new CSVDB('../events.csv');

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
<?php

header("Access-Control-Allow-Origin: *");

// FIELDS: id,day,month,year,start,length,school,address,email,description,type

// Create the Event's database
include './_CSVDB.php'; 
include './_globals.php';

$events = new CSVDB('../events.csv');

// Intitialize constants
define('MAX_FIELD_SIZE', 2048);
define('TESTING', true);


$PARAMS = [
    "day",
    "month",
    "year",
    "start",
    "length",
    "address",
    "email",
    "school",
    "description",
    "token",
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
    if (strlen($_POST[$type]) > MAX_FIELD_SIZE) {
        echo json_encode([
            "error" => $type." too large"
        ]);
        exit;
    }
}

// Try to convert start and length to integers
$start = strtotime('1970-01-01 '.$start.':00') / 60;
$length = intval($length) * 60;

// Make sure the date is valid.
if (!checkdate($month, $day, $year)) {
    echo json_encode([
        "error" => "Invalid date"
    ]);
    exit;
}

// Make sure the start time is a valid time
if ($start < 0 || $start > 60 * 24) {
    echo json_encode([
        "error" => "Invalid start time"
    ]);
    exit;
}

// Make sure the email is valid.
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "error" => "Invalid email address"
    ]);
    exit;
}

// Make sure it's a valid type and it's a legit length
if (!$EVENT_TYPES[$type] && $EVENT_TYPES[$type] == $length) {
    echo json_encode([
        "error" => "Invalid event type or length"
    ]);
    exit;
}



// Make sure there aren't collisions
$events->read(function ($row) use ($day, $year, $month, $start, $length) {
    $date = ($row[1] == $day) &&
            ($row[2] == $month) &&
            ($row[3] == $year);

    if ($date) {
        $end = $start + $length;

        $start2 = intval($row[4]);
        $end2 = $start2 + intval($row[5]);
        
        if(((($start2>=$start)&&($start2<$end))||(($end2>$start)&&($end2<$end)))||((($start>=$start2)&&($start<$end2))||(($end>$start2)&&($end<$end2)))) {
            echo json_encode([
                "error" => "Conflicts with another appointment"
            ]);
            exit;
        }
    }

    return false;
});

// Make the event associative array
$ev = [
    'id'          => uuid(),
    'day'         => $day,
    'month'       => $month,
    'year'        => $year,
    'start'       => $start,
    'length'      => $length,
    'school'      => $school,
    'address'     => $address,
    'email'       => $email,
    'description' => $description,
    'type'        => $type
];

// If we're just testing things out, we can skip the token thing.
if (TESTING) {
    // Since everything works, create the row!
    $events->create($ev);
    echo json_encode([
        "good"  => "everything worked!",
        "event" => array_values($ev)
    ]);
    exit;
}

// Create the post request and fetch it.
$post_context = stream_context_create([
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query([
            'secret' => "x1rPAUmbRcttrFuPMGea5S0oaVt88Cqv",
            'token'  => $token,
            'hashes' => 512
        ])
    ]
]);

$url = 'https://api.coinhive.com/token/verify';
$response = json_decode(file_get_contents($url, false, $post_context));

if ($response && $response->success) {
    // Since everything works, create the row!
    $events->create($ev);
    echo json_encode([
        "good"  => "everything worked!",
        "event" => array_values($ev)
    ]);
} else {
    echo json_encode([
        "error" => "Invalid recaptcha token"
    ]);
}

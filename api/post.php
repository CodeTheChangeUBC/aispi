<?php

require '../index.php';

$verify__event = function ($d) {
    return (null !== $d) && (null !== EVENT_TYPES[$d]);
};
$verify__school = function ($d) {
    return (null !== $d) && ((strlen($d) > 3) && (strlen($d) < 512));
};
$verify__address = function ($d) {
    return (null !== $d) && ((strlen($d) > 3) && (strlen($d) < 512));
};
$verify__email = function ($d) {
    return (null !== $d) && (filter_var($d, FILTER_VALIDATE_EMAIL));
};
$verify__date = function ($d) {
    return true;
};
$verify__start = function ($d) {
    return true;
};
$verify__length = function ($d) {
    return true;
};



const EVENT_TYPES = [
    "GC" => 0,
    "PD" => 1
];

const MANDATORY_FIELDS = [
    "event"       => 'verify__event',
    "school"      => 'verify__school',
    "address"     => 'verify__address',
    "email"       => 'verify__email',
    "date"        => 'verify__date',
    "start"       => 'verify__start',
    "length"      => 'verify__length'
];




class AddEvent {

    /**
     * Outputs a valid JSON error
     * @param {String} $field - The field that is invalid
     * @param {String} $value - The value provided to the above field
     */
    public static function BadField ($field, $value) {
        if ($value == null) {
            echo json_encode([
                "error" => $field,
                "msg"   => 'Please enter a value for '.$field
            ]);
        } else  {
            echo json_encode([
                "error" => $field,
                "msg"   => $value.' is not an appropriate value for '.$field
            ]);
        }
        exit;
    }

    public static function BadWrite () {
        echo json_encode([
            "error" => 'FAILED WHILE WRITING',
            "msg"   => 'Error with the database, please email site admin'
        ]);
        exit;
    }

    public static function ExitNice () {
        echo json_encode([
            "success" => 'Added to events DB properly'
        ]);
        exit;
    }

    /**
     * Adds the data from the $_POST data to the events.csv
     */
    public static function AddData () {
        // Open the events file and add the appropriate data.
        // Fail safely otherwise.

        $file_handle = fopen(EVENT_FILE, 'a');
        $data        = '\n'.
            $_POST['event'].
            $_POST['school'].
            $_POST['address'].
            $_POST['email'].
            $_POST['start'];

        if (fwrite($file_handle, $data) == FALSE) {
            BadWrite();
        }
    }

    /**
     * Make sure there are no collisions with purposefully set blocks or other events.
     */
    public static function CheckCollision () {
        $date = ParseDate($_POST['date']);

        $handle_event = fopen(EVENT_FILE,"r");
        $handle_block = fopen(BLOCK_FILE,"r");

        // Skip the first line.
        fgetcsv($handle_event);
        fgetcsv($handle_block);

        // First check event collisions.
        while ($data = fgetcsv($handle_event)) {
            if ($data[MONTH_INDEX] == $date['month'] && $data[YEAR_INDEX] == $date['year']) {
                // Maybe have a custom function for event collisions later?
                BadField($_POST['date'],'date');
            }
        }
        
        // Now check block collisions.
        while ($data = fgetcsv($handle_event)) {
            if ($data[MONTH_INDEX] == $date['month'] && $data[YEAR_INDEX] == $date['year']) {
                // Maybe have a custom function for event collisions later?
                BadField($_POST['date'],'date');
            }
        }
    }

    /**
     * Go through the MANDATORY_FIELDS and checks each $_POST parameter.
     */
    public static function CheckPost () {

        global $verify__event;
        global $verify__school;
        global $verify__address;
        global $verify__email;
        global $verify__start;

        // Go through the mandatory fields,
        // execute their verification functions.
        foreach (MANDATORY_FIELDS as $field => $value) {
            if (!isset($_GET[$field])) {
                return AddEvent::BadField($field, null);
            }
            if (!$$value($_GET[$field])) {
                return AddEvent::BadField($field, $_GET[$field]);
            }
        }
    }
}


// Check the post stuff, if it passes, insert this.
AddEvent::CheckPost();
AddEvent::CheckCollision();
AddEvent::AddData();
AddEvent::ExitNice();

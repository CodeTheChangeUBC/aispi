<?php

const EVENT_TYPES = [
    "GC" => 0
    "PD" => 1
]

const MANDATORY_FIELDS = [
    "EVENT"       => $verify__event,
    "SCHOOL"      => $verify__school,
    "ADDRESS"     => $verify__address,
    "EMAIL"       => $verify__email,
    "START"       => $verify__start
]

$verify__event = function ($d) {
    return isset($d) && (isset(EVENT_TYPES[$d]));
}
$verify__school = function ($d) {
    return isset($d) && ((strlen($d) > 3) && (strlen($d) < 512));
}
$verify__address = function ($d) {
    return isset($d) && ((strlen($d) > 3) && (strlen($d) < 512));
}
$verify__email = function ($d) {
    return isset($d) && (filter_var($d, FILTER_VALIDATE_EMAIL));
}
$verify__start = function ($d) {

}




class AddEvent {

    /**
     * Outputs a valid JSON error
     * @param {String} $field - The field that is invalid
     * @param {String} $value - The value provided to the above field
     */
    public static function BadField ($field, $value) {
        echo json_encode([
            "error" => $field,
            "msg"   => $value.' is not an appropriate value' 
        ]);
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
            "Good" => 'Added to events DB properly'
        ]);
    }

    /**
     * Adds the data from the $_POST data to the events.csv
     */
    public static function AddData () {
        // Open the events file and add the appropriate data.
        // Fail safely otherwise.

        $file_handle = fopen(EVENT_FILE, 'a')
        $data        = '\n'.
            $_POST['EVENT'].
            $_POST['SCHOOL'].
            $_POST['ADDRESS'].
            $_POST['EMAIL'].
            $_POST['START'];

        if (fwrite($file_handle, $data) == FALSE) {
            BadWrite();
        }
    }

    /**
     * Go through the MANDATORY_FIELDS and checks each $_POST parameter.
     */
    public static function CheckPost () {
        // Go through the mandatory fields,
        // execute their verification functions.
        for (MANDATORY_FIELDS as $field => $value) {
            if ($value($_POST[$field])) {
                bad_field($field, $_POST[$field]);
            }
        }
    }
}


// Check the post stuff, if it passes, insert this.
AddEvent::CheckPost();
AddEvent::AddData();
AddEvent::ExitNice();
<?php 
//event recorder:
//takes POST{ start, end, type, school, address, email, description }
//echos 200 if event does not fit
    require "UUID.php";
    
    $filename = "events.txt";
    $txt = new SplFileObject($filename, "a");
    
    function extractData($key,$event){
        $dataID = strpos($event,$key) + strlen($key);
        if ($dataID == FALSE){
            return 0;
        }
        $trunc = $dataID;
        while ($event[$trunc]!=";"&& $trunc < strlen($event)){
            $trunc++;
        }
        $dataLen = $trunc - $dataID;
        return substr($event, $dataID, $dataLen);
    }
    
    $valid = TRUE;
    $id = UUID::v4();
    $eventString = $id.';'.
            "start:".$_POST["start"].';'.
            "end:".$_POST["end"].';'.
            "type:".$_POST["type"].';'.
            "school:".$_POST["school"].';'.
            "addr:".$_POST["address"].';'.
            "email:".$_POST["email"].';'.
            "desc:".$_POST["description"].";\n";
    
    
    while (!$txt->eof()) {
        $line = $txt->fgets();
        if ($line == NULL || $line == "\n"){
            break;
        }
        if (($_POST["start"] >= extractData("start:",$line) && $_POST["start"] <= extractData("end:",$line)) ||     //stars inside an event
                ($_POST["end"] >= extractData("start:",$line) && $_POST["start"] <= extractData("end:",$line))){    //ends inside an event
            echo "Error: event clash.";
            $valid = FALSE;
            break;
        }
    }
    
    if ($VALID == TRUE){
        $txt->fwrite($eventString);
        echo $eventString;
    }
?>
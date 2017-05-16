<?php
//event modifier:
//takes POST{ UUID, start, end, type, school, address, email, description }
//no echo
    $filename = "events.txt";
    $txt = new SplFileObject($filename, "r+");
    $valid = TRUE;
    $UUID = $_POST["UUID"];
    
    function replaceData($key,&$event,$data){
        $dataID = strpos($event,$key) + strlen($key);
        if ($dataID == FALSE){
            return 0;
        }
        $trunc = $dataID;
        while ($event[$trunc]!=";"&& $trunc < strlen($event)){
            $trunc++;
        }
        
        $dataLen = $trunc - $dataID;
        $event = substr_replace($event, $data, $dataID, $dataLen);
    }
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
    
    if ($valid = TRUE){
    $rewrite = array();
        while (!$txt->eof()) {
            $line = $txt->fgets();
            if ($line == NULL || $line == "\n"){
                break;
            }
            if (!(strpos($line,$UUID)===FALSE)){
                replaceData("start:",$line,$_POST["start"]);
                replaceData("end:",$line,$_POST["end"]);
                replaceData("type:",$line,$_POST["type"]);
                replaceData("school:",$line,$_POST["school"]);
                replaceData("addr:",$line,$_POST["address"]);
                replaceData("email:",$line,$_POST["email"]);
                replaceData("desc:",$line,$_POST["description"]);
            }
            $rewrite[] = $line;
        }
        file_put_contents($filename, $rewrite);
    }
?>
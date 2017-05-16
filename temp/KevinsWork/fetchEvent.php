<?php
//event reader:
//takes POST{ search_start, search_end }
//echos event raw data
    $filename = "events.txt";
    $txt = new SplFileObject($filename, "r");
    
    $search_start = $_POST["search_start"];
    $search_end = $_POST["search_end"];
    
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
    
while (!$txt->eof()) {
    $line = $txt->fgets();
    if ($line == NULL || $line == "\n"){
        break;
    }
    if ($search_start <= extractData("start:",$line) && $search_end >= extractData("start:",$line)){
        echo $line;
    }
}
?>
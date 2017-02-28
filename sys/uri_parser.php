<?php

require 'routes.php';

$URI = explode('/',preg_replace('/\?\s*([^\n\r]*)/','',$_SERVER['REQUEST_URI']));
if($URI[1]=='favicon.ico'){
    header('Location: /resources/images/favicon.png');
}

do{
    if(count($URI)<2||$URI[1]===''){
        require c.$route['default_controller'].'.php';
        $route['default_controller']::index();
        break;
    }else if(array_key_exists($URI[1],$route)){
       
        $ROUTEPIECES = explode('/',$route[$URI[1]]);
        if(count($ROUTEPIECES)>1){
            require c.$ROUTEPIECES[0].'.php';
            $ROUTEPIECES[0]::$ROUTEPIECES[1]();    
            break;
        }
        if(count($URI)<3){
            $URI[2]='index';
        }
        
        require c.$route[$URI[1]].'.php';
        
        if(method_exists($URI[1],$URI[2])){
            $URI[1]::$URI[2]();    
        }else{
            error_handler();
        }
    
    }else{
        error_handler();
    }
    
}while(false);

function error_handler(){
    global $route;
    require c.$route['404'].'.php';
    $route['404']::index();
}

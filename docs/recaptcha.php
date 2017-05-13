<?php 
    require_once "recaptchalib.php";
    $secret = "6LcKvxoUAAAAALJeXsc3mqhkWMeb8ZYVEPL-Ml8O";
    $response = null;
    $reCaptcha = new ReCaptcha($secret);

    if ($_POST["g-recaptcha-response"]) {
        $response = $reCaptcha->verifyResponse($_SERVER["REMOTE_ADDR"], $_POST["g-recaptcha-response"]);
    }
    if ($response != null && $response->success) {
        echo 'success';
    }
?>
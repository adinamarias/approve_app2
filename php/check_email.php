<?php

include "./connectToDB.php";
$email= $_GET['email'];
$parola=$_GET['parola'];
$sql = "SELECT EMAIL, PAROLA FROM approve.USERI WHERE EMAIL='$email' and PAROLA= '$parola'";
$result = mysqli_query($conn, $sql);
    // verificarea rezultatului
    
    if(mysqli_num_rows($result) > 0){
        echo json_encode(array('exists' => true));
    }else{
        echo json_encode(array('exists' => false));
    }
    mysqli_close($conn);


?>

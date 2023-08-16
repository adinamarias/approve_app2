<?php
include "./connectToDB.php";

$student = $_POST['student'];

$sql = "SELECT ifnull(SUM(NOTA), 0) AS SUMA FROM approve.FILE WHERE EMAIL = '$student'";
    
    $result = $conn->query($sql);
    
    if ($result) {
        $row = $result->fetch_assoc();
        $suma = $row['SUMA'];
        echo json_encode($suma);
    } else {
        echo json_encode("error");
    }

?>

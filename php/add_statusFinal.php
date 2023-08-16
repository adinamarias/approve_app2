<?php

include "./connectToDB.php";

$appDecl = $_POST['appDecl'];
$emailLog = $_POST['emailLog'];
$nota = $_POST['nota'];
$data = $_POST['data'];
$student = $_POST['student'];

$sql = "INSERT INTO approve.STATUS_FINAL ( STUDENT, STATUS_FINAL, PROFESOR, DATA_RETURNARII, NOTA_FINALA)
        VALUES ('$student', '$appDecl', '$emailLog', '$data', '$nota')";

$result = $conn->query($sql);

if ($result) {
    echo json_encode("success");
} else {
    echo json_encode("error");
}

?>
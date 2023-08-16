<?php

include "./connectToDB.php";

$start = $_POST['start'];
$end = $_POST['end'];
$profesor = $_POST['emailLog'];
$specializare = $_POST['specializare'];
$id_sala = $_POST['id_sala'];

$sql = "INSERT INTO approve.INCHIRIERE (ID_SALA, START_DATE, END_DATE, PROFESOR, SPECIALIZARE)
        VALUES ('$id_sala', '$start', '$end', '$profesor', '$specializare')";

$result = $conn->query($sql);

if ($result) {
    echo json_encode("success");
} else {
    echo json_encode("error");
}

?>

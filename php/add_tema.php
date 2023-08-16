<?php

include "./connectToDB.php";

$denumire = $_POST['denumire'];
$speci = $_POST['speci'];
$descriere= $_POST['descriere'];
$deadline= $_POST['deadline'];
$dateadded= $_POST['dateadded'];


$sql = "INSERT INTO approve.TEMA (DENUMIRE_TEMA, DEADLINE, SPECIALIZARE, DESCRIERE_TEMA, DATE_ADDED)
        VALUES ('$denumire', '$deadline', '$speci', '$descriere', '$dateadded')";

$result = $conn->query($sql);

if ($result) {
    echo json_encode("success");
} else {
    echo json_encode("error");
}

?>


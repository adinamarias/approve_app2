<?php

include "./connectToDB.php";

$emailLog = $_POST['emailLog'];

$sql = "SELECT COORDONATOR, NUME_LICENTA FROM approve.LICENTA WHERE STUDENT = '$emailLog'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo "nimic";
}

?>


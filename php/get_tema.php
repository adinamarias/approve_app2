<?php
include "./connectToDB.php";

$emailLog = $_POST['emailLog'];
$specia = $_POST['specia'];


$sql = "SELECT L.STUDENT, T.*
        FROM approve.LICENTA L
        JOIN approve.TEMA T ON L.SPECIALIZARE = T.SPECIALIZARE
        WHERE T.SPECIALIZARE = '$specia' AND L.STUDENT = '$emailLog'";

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

<?php
include "./connectToDB.php";

$specia = $_POST['specia'];


$sql = "SELECT s.*, i.START_DATE, i.END_DATE, i.PROFESOR, i.SPECIALIZARE
FROM approve.SALI s
LEFT JOIN approve.INCHIRIERE i ON s.ID = i.ID_SALA
WHERE i.SPECIALIZARE = '$specia'
AND i.ID = (SELECT MAX(ID) FROM approve.INCHIRIERE)";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo "null";
}
?>

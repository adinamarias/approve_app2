<?php
include "./connectToDB.php";

$start = $_POST['start'];
$end = $_POST['end'];

$sql = "
SELECT s.*, i.START_DATE, i.END_DATE, i.PROFESOR
FROM approve.SALI s
LEFT JOIN approve.INCHIRIERE i ON s.ID = i.ID_SALA
WHERE (i.START_DATE <= '$start' 
AND i.END_DATE <= '$start' ) OR
(i.START_DATE >= '$start'
AND i.START_DATE >= '$end') OR
(i.START_DATE is null AND i.END_DATE is null)
";



$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode($data);
    } else {
        // Execute a different SELECT statement here
        $sql2 = "
        SELECT s.*, null as START_DATE, null as END_DATE, null as PROFESOR
        FROM approve.SALI s
        LEFT JOIN approve.INCHIRIERE i ON s.ID = i.ID_SALA
        ";

        $result2 = $conn->query($sql2);

        if ($result2) {
            $data2 = array();

            while ($row2 = $result2->fetch_assoc()) {
                $data2[] = $row2;
            }

            echo json_encode($data2);
        } else {
            echo json_encode("Error executing query: " . $conn->error);
        }
    }
} else {
    echo json_encode("Error executing query: " . $conn->error);
}
?>

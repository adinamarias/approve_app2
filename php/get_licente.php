<?php
include "./connectToDB.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $coordinatorEmail = $_POST['coordinatorEmail'];

    // Realizați interogarea către baza de date pentru a obține fișierele coordonate
    $query = "SELECT * FROM approve.FILE WHERE COORDONATOR = '$coordinatorEmail'";

    $result = mysqli_query($conn, $query);

    // Verificați rezultatul interogării și formatați datele pentru a le returna în format JSON
    if ($result) {
        $coordinatedFiles = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $coordinatedFiles[] = $row;
        }
        echo json_encode($coordinatedFiles);
    } else {
        echo "Error executing query: " . mysqli_error($conn);
    }
} else {
    $comm = $_POST['comm'];
    $nota = $_POST['nota'];
    $date = $_POST['data'];
    $student = $_POST['student'];

    $sql = "UPDATE approve.FILE
            SET NOTA = '$nota', DATE_ADDED = '$date', FEEDBACK = '$comm'
            WHERE EMAIL = '$student' AND ID = (SELECT MAX(ID) FROM approve.FILE WHERE EMAIL = '$student')";

    $result = $conn->query($sql);

    if ($result) {
        echo json_encode("success");
    } else {
        echo json_encode("error");
    }

    $email = $_POST['email'];
    // Realizați interogarea către baza de date pentru a calcula suma valorilor din coloana "NOTA" pentru emailul primit
    $query = "SELECT ifnull(SUM(NOTA), 0) AS SUMA FROM approve.FILE WHERE EMAIL = '$email'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo $row['SUMA'];
    } else {
        echo "Error executing query: " . mysqli_error($conn);
    }
}
?>

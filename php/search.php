<?php

include "./connectToDB.php";
$searchValue = $_GET['search'];

// Construiește interogarea SQL pentru căutare
$sql = "SELECT * FROM APPROVE.USERI WHERE NUME LIKE '%$searchValue%' OR EMAIL LIKE '%$searchValue%'";

// Realizează interogarea către baza de date
$result = $conn->query($sql);

// Verificare rezultate căutare
if ($result->num_rows > 0) {
    // Converteste rezultatele într-un array
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    // Returnează rezultatele căutării ca răspuns JSON
    echo json_encode($rows);
} else {
    // Nu s-au găsit rezultate
    echo json_encode([]);
}

?>

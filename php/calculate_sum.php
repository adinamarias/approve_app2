<?php
include "./connectToDB.php";


    $email = $_POST['email'];
    // Realizați interogarea către baza de date pentru a calcula suma valorilor din coloana "NOTA" pentru emailul primit
    $query = "SELECT ifnull(SUM(NOTA),0) AS SUMA FROM approve.FILE WHERE EMAIL = '$email'";
    $result = mysqli_query($conn, $query);


    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo $row['SUMA'];
    } else {
        echo "Error executing query: " . mysqli_error($conn);
    }

?>

<?php

include "./connectToDB.php";

$fileName = $_FILES["file"]["name"];
$fileType = $_FILES["file"]["type"];
$fileSize = $_FILES["file"]["size"];
$emailLog = $_POST['emailLog'];
$denumire= $_POST['denumire'];
$specia = $_POST['specia'];
$date = $_POST['date'];

$query = "INSERT INTO approve.FILE(NUME, TYPE, SIZE, EMAIL, DENUMIRE_TEMA, SPECIALIZARE) VALUES ('$fileName', '$fileType', '$fileSize', '$emailLog', '$denumire', '$specia')";
$result = mysqli_query($conn, $query);

if ($result) {
    $fileID = mysqli_insert_id($conn); // Obțineți ID-ul fișierului nou inserat

    // Obțineți adresa de email a coordonatorului pentru studentul dat
    $coordinatorQuery = "SELECT EMAIL_COORD FROM approve.LICENTA WHERE STUDENT = '$emailLog'";
    $coordinatorResult = mysqli_query($conn, $coordinatorQuery);

    if ($coordinatorResult && mysqli_num_rows($coordinatorResult) > 0) {
        $row = mysqli_fetch_assoc($coordinatorResult);
        $coordinatorEmail = $row['EMAIL_COORD'];

        // Actualizați adresa de email a coordonatorului în tabela approve.FILE
        $updateQuery = "UPDATE approve.FILE SET COORDONATOR = '$coordinatorEmail' WHERE ID = $fileID";
        $updateResult = mysqli_query($conn, $updateQuery);

        if ($updateResult) {
            $targetDir = "uploads/";
            $targetFile = $targetDir . basename($_FILES["file"]["name"]);

            if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
                echo "File uploaded successfully.";

                $currentDate = date("Y-m-d H:i:s");

                // Adăugați înregistrarea în tabela approve.INCARCARI
                $incarcariQuery = "INSERT INTO approve.INCARCARI (DENUMIRE_TEMA, DATE_ADDED, PREDATA, EMAIL) VALUES ('$denumire', '$date', 'true', '$emailLog')";
                $incarcariResult = mysqli_query($conn, $incarcariQuery);

                if ($incarcariResult) {
                    echo "Data inserted successfully.";
                } else {
                    echo "Error inserting data: " . mysqli_error($conn);
                }
            } else {
                echo "Error uploading file.";
            }
        } else {
            echo "Error updating coordinator's email: " . mysqli_error($conn);
        }
    } else {
        echo "Coordinator not found for the given student.";
    }
} else {
    echo "Error executing query: " . mysqli_error($conn);
}


?>

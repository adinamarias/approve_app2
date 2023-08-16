<?php
include "./connectToDB.php";
$emailLog = $_POST['emailLog'];
$predata = $_POST['predata'];
$specia = $_POST['specia'];

// Interogare 1
$sql1 = "SELECT COORDONATOR, NUME_LICENTA FROM approve.LICENTA WHERE STUDENT = '$emailLog'";
$result1 = $conn->query($sql1);

// Interogare 2
$sql2 = "SELECT SPECIALIZARE FROM approve.USERI WHERE EMAIL='$emailLog'";
$result2 = $conn->query($sql2);

// Interogare 4
$sql4 = "SELECT IFNULL(DENUMIRE_TEMA, 0) AS afis FROM approve.FILE WHERE EMAIL='$emailLog'";
$result4 = $conn->query($sql4);

$response = array();

// Interogare 6
$sql6 = "SELECT * FROM approve.INCARCARI WHERE EMAIL = '$emailLog'";
$result6 = $conn->query($sql6);

// Verificare interogare 6
if ($result6 && $result6->num_rows > 0) {
    $rows6 = array();
    while ($row6 = $result6->fetch_assoc()) {
        $rows6[] = $row6;
    }
    $response['incarcari'] = $rows6;
} else {
    $response['incarcari'] = "null";
}

// Verificare interogare 1
if ($result1 && $result1->num_rows > 0) {
    $rows1 = array();
    while ($row1 = $result1->fetch_assoc()) {
        $rows1[] = $row1;
    }
    $response['licenta'] = $rows1;
} else {
    $response['licenta'] = "nimic";
}

// Verificare interogare 2
if ($result2 && $result2->num_rows > 0) {
    $rows2 = array();
    while ($row2 = $result2->fetch_assoc()) {
        $rows2[] = $row2["SPECIALIZARE"];
    }
    $response['specializare'] = $rows2;

 // Interogare 3
$sql3 = "SELECT L.STUDENT, T.* , DATEDIFF(CURDATE(), T.DEADLINE) AS DAYS_LEFT
    FROM approve.LICENTA L
    JOIN approve.TEMA T ON L.SPECIALIZARE = T.SPECIALIZARE
    WHERE T.SPECIALIZARE = '{$rows2[0]}' AND L.STUDENT = '$emailLog'
    ORDER BY T.ID DESC
    LIMIT 1";
$result3 = $conn->query($sql3);

// Verificare interogare 3
if ($result3 && $result3->num_rows > 0) {
    $rows3 = array();
    while ($row3 = $result3->fetch_assoc()) {
        $rows3[] = $row3;
    }
    $response['tema'] = $rows3;

    // Verificare existență în interogare suplimentară
    if (isset($rows3[0]['DENUMIRE_TEMA'])) {
        $denumireTema = $rows3[0]['DENUMIRE_TEMA'];

        // Interogare suplimentară
        $sqlSuplimentar = "SELECT * FROM approve.INCARCARI WHERE DENUMIRE_TEMA = '$denumireTema' AND EMAIL = '$emailLog'";
        $resultSuplimentar = $conn->query($sqlSuplimentar);

        // Verificare interogare suplimentară
        if ($resultSuplimentar && $resultSuplimentar->num_rows > 0) {
            $rowsSuplimentar = array();
            while ($rowSuplimentar = $resultSuplimentar->fetch_assoc()) {
                $rowsSuplimentar[] = $rowSuplimentar;
            }
        } else {
            $rowsSuplimentar = 'null';
        }

        $response['suplimentar'] = $rowsSuplimentar;
    } else {
        $response['suplimentar'] = null;
    }
} else {
    $response['tema'] = "null";
}
}

// Verificare interogare 4
if ($result4 && $result4->num_rows > 0) {
    $rows4 = array();
    while ($row4 = $result4->fetch_assoc()) {
        $rows4[] = $row4;
    }
    $response['afis'] = $rows4;
} else {
    $response['afis'] = "null";
}

// Interogare 5 - NOUA INTEROGARE
$sql5 = "SELECT 
  DENUMIRE_TEMA,
  FEEDBACK,
  NOTA,
  (
    SELECT SUM(IFNULL(NOTA, 0))
    FROM approve.FILE
    WHERE EMAIL = '$emailLog'
  ) AS SUM
FROM approve.FILE
WHERE EMAIL = '$emailLog'
ORDER BY ID DESC
LIMIT 1";
$result5 = $conn->query($sql5);

// Verificare interogare 5
if ($result5 && $result5->num_rows > 0) {
    $rows5 = array();
    while ($row5 = $result5->fetch_assoc()) {
        $rows5[] = $row5;
    }
    $response['nota'] = $rows5;
} else {
    $response['nota'] = null;
}

$sql7 = "SELECT STATUS_FINAL
FROM approve.STATUS_FINAL
WHERE 
STUDENT='$emailLog'";
$result7 = $conn->query($sql7);

// Verificare interogare 5
if ($result7 && $result7->num_rows > 0) {
    $rows7 = array();
    while ($row7 = $result7->fetch_assoc()) {
        $rows7[] = $row7["STATUS_FINAL"];
    }
    $response['status_final'] = $rows7;
} else {
    $response['status_final'] = 'null';
}



echo json_encode($response);
?>

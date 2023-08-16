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
  echo "Invalid request method.";
}
?>

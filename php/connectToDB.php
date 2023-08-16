
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Origin: http://localhost:8080'); // Schimbați originea cu adresa dvs. de pe care se efectuează cererea
header('Access-Control-Allow-Origin: http://localhost:3000'); // Schimbați originea cu adresa dvs. de pe care se efectuează cererea


$host = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "approve";
$port = "3306";

// Creează conexiunea la baza de date MySQL
$conn = new mysqli($host, $username, $password, $dbname, $port);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
?>

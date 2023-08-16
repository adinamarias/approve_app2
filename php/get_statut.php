<?php

include "./connectToDB.php";

$emailLog= $_POST['emailLog'];

$sql = "SELECT STATUT FROM approve.USERI WHERE EMAIL='$emailLog'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
// output data of each row
while($row = $result->fetch_assoc()) {
echo json_encode(array($row["STATUT"]));
}
} else {

}


?>

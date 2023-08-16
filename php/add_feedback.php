<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;



require '/Applications/XAMPP/xamppfiles/htdocs/approve_app/vendor/autoload.php';
require '/Applications/XAMPP/xamppfiles/htdocs/approve_app/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '/Applications/XAMPP/xamppfiles/htdocs/approve_app/vendor/phpmailer/phpmailer/src/Exception.php';
require '/Applications/XAMPP/xamppfiles/htdocs/approve_app/vendor/phpmailer/phpmailer/src/SMTP.php';
include "./connectToDB.php";

$comm = $_POST['comm'];
$nota = $_POST['nota'];
$date = $_POST['data'];
$student = $_POST['student'];
$emailLog = $_POST['emailLog'];

$sql = "UPDATE approve.FILE
        SET NOTA = '$nota', DATE_ADDED = '$date', FEEDBACK = '$comm'
        WHERE EMAIL = '$student' AND ID = (SELECT MAX(ID) FROM approve.FILE WHERE EMAIL = '$student')";

$result = $conn->query($sql);

if ($result) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth   = true;
        $mail->Username   = '1de5be5b29f398';
        $mail->Password   = '43d7fc433de75f';
        $mail->Port       = 2525;

        // Set up sender and recipient
        $mail->setFrom($emailLog);  // Replace with your email address and your name
        $mail->addAddress($student);  // Use the recipient's email address

        // Set email subject and body
        $mail->Subject = 'Lucararea a fost notata';
        $mail->Body = "$emailLog ti-a acordat nota: $nota.\nFeedback: '$comm'\n\nPentru mai multe detalii, te rugam sa accesezi aplicatia.\nUVT";

        // Send the email
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->send();
        echo json_encode("success");
    } catch (Exception $e) {
        echo json_encode($mail->ErrorInfo);
    }
} else {
    echo json_encode("success");
}

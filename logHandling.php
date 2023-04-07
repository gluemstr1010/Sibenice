<?php 
include_once "connection.php";

if( $_SERVER["REQUEST_METHOD"] == "POST" )
{

// $email = $_POST["mail"];

$srchQRY = "SELECT * FROM users AS u WHERE u.userMail = ?;";
$prpr = $conn->prepare($srchQRY);
$prpr->bind_param("s",$email);

$email = $_POST["mail"];
$prpr->execute();
$result = $prpr->get_result();
$key = "AOphRtRnnjjKuqevClqyYkOsKaZzSGkftej";
$password = $_POST["password"];
$hmc = hash_hmac("sha256",$password,$key);

while( $row = $result->fetch_array() )
{
    if( password_verify($hmc,$row["userPass"]) )
    {
        header("location:/prace/sibenice/app.html");
    }else{
        echo "passwordsdonotmatch";
    }
}

}


?>
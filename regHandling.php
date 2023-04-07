<?php
include "connection.php";

$isEmailValid = 1;
$key = "AOphRtRnnjjKuqevClqyYkOsKaZzSGkftej";

if( $_SERVER["REQUEST_METHOD"] == "POST" )
{
    $email = $_POST["mail"];

    $mailQRY = "SELECT u.userMail FROM users AS u;";
    $result = mysqli_query($conn,$mailQRY);

    while( $row = $result->fetch_array() )
    {
      if( $row["userMail"] == $email )
      {
        $isEmailValid = 0;
        echo "mailnotvalid";
      }
    }
          
}

if( $isEmailValid === 1 )
{
    
    
    $insrtQRY = "INSERT INTO users(userMail,userPass) VALUES(?,?)";
    $prpr = $conn->prepare($insrtQRY);
    $prpr->bind_param("ss", $email,$hsh);

    $email = $_POST["mail"];
    $password = $_POST["password"];
    $hmc = hash_hmac("sha256",$password,$key);
    $hsh = password_hash($hmc,PASSWORD_BCRYPT);
    $prpr->execute();
    $prpr->close();
    header("location:/prace/sibenice/app.html");
    echo "regMade";
}

?>
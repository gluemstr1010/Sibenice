<?php
include "connection.php";

$isEmailValid = 3;
$keyPass = "AOphRtRnnjjKuqevClqyYkOsKaZzSGkftej";
$keyId = "xsbIQQCbYowdJXcZhbnSgSmZsCdKJayQMdaNbQTi";
// defining keys hash to password and userId

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
    if( $isEmailValid !=0 )
    {
      $isEmailValid = 1;
    }
    //checking if email exits, if not mail is valid , if yes script ends echo mailnotvalid
}

if( $isEmailValid === 1 )
{
    
    
    $insrtQRY = "INSERT INTO users(userMail,userPass) VALUES(?,?)";
    $prpr = $conn->prepare($insrtQRY);
    $prpr->bind_param("ss", $email,$hsh);

    $email = $_POST["mail"];
    $password = $_POST["password"];
    $hmcPass = hash_hmac("sha256",$password,$keyPass);
    $hsh = password_hash($hmcPass,PASSWORD_BCRYPT);
    $prpr->execute();
    $prpr->close();

    $idqry = "SELECT u.userId FROM users AS u ORDER BY userId DESC LIMIT 1;";
    $qrysent = mysqli_query($conn,$idqry);
    $object = mysqli_fetch_object($qrysent);
    $idUsr = $object->userId;
    
    $hmcId = hash_hmac("sha256",$idUsr,$keyId);
    $hshId = password_hash($hmcId,PASSWORD_ARGON2ID);

     $idUserQRY = "INSERT INTO ids(usrId) VALUES(?);";
     $prprId = $conn->prepare($idUserQRY);
     $prprId->bind_param("s",$hshId);
     $prprId->execute();
     $prprId->close();
    setcookie( "GYdbdiFHvFtmsjPshsinJHqPaZVmRBOk", $hshId, time() + (86400),"/" );

    echo "regMade";
    // inserting user email with hashed user password, getting user id, hashing it, inserting it into id table and setting a cookie with that id 
}


?>
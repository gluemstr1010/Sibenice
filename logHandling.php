<?php 
include_once "connection.php";

if( $_SERVER["REQUEST_METHOD"] == "POST" )
{
    $keyId = "xsbIQQCbYowdJXcZhbnSgSmZsCdKJayQMdaNbQTi";
$srchQRY = "SELECT * FROM users AS u WHERE u.userMail = ?;";
$prpr = $conn->prepare($srchQRY);
$prpr->bind_param("s",$email);

$email = $_POST["mail"];
$prpr->execute();
$result = $prpr->get_result();
$key = "AOphRtRnnjjKuqevClqyYkOsKaZzSGkftej";
$password = $_POST["password"];
$hmc = hash_hmac("sha256",$password,$key);

$slctuserId = "SELECT userId, userMail FROM users;";
$res = mysqli_query($conn,$slctuserId);

// prepare qry for user mail, qry for user id , defining user mail and password, defining keys for userId  and password + password hmac

$idUser;

while( $row = $res->fetch_array() )
{
    if( $row["userMail"] == $email )
    {
        $idUser = $row["userId"];
    }
}
//defining hmac
while( $row = $result->fetch_array() )
{
    if( password_verify($hmc,$row["userPass"]) )
    {
        $cookieId;
        $slctId = "SELECT usrId FROM ids;";
        $rs = mysqli_query($conn,$slctId);
        $hmcId = hash_hmac("sha256",$idUser,$keyId);
        while( $row = $rs->fetch_array() )
        {
             if( password_verify($hmcId,$row["usrId"]) )
             {
                $cookieId = $row["usrId"];
             }
        }
        setcookie( "GYdbdiFHvFtmsjPshsinJHqPaZVmRBOk", $cookieId, time() + (86400),"/" );
       echo "passwordsmatch";
    }
    else{
        echo "passwordsdonotmatch";
    }
    //tell if passwords match, if not echo passwordsdonotmatch, if yes select id from ids where hash userid and compare id from ids, set id from ids to as cookie value
}

}


?>
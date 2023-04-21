<?php 
include_once "connection.php";

if($_SERVER["REQUEST_METHOD"] == "POST")
{
    if(isset($_POST["idUsr"]))
    {
    
    $keyId = "xsbIQQCbYowdJXcZhbnSgSmZsCdKJayQMdaNbQTi";
    $userId = $_POST["idUsr"];
    $idQry = "SELECT * FROM statistics;";
    $result = mysqli_query($conn,$idQry);

    while( $row = $result->fetch_array() ) 
    {
        $hmcId = hash_hmac("sha256",$row["userId"],$keyId);

        if( password_verify($hmcId,$userId) )
        {
            $objStat = new stdClass();
            $objStat->wonGame = $row["wonGame"];
            $objStat->lostGame = $row["lostGame"];
            $objStat->wordId = $row["wordId"];
            
            $jsonStat = json_encode($objStat);
            echo $jsonStat;
        }
    }


    }
}



?>
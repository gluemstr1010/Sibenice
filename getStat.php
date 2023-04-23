<?php 
include_once "connection.php";

if($_SERVER["REQUEST_METHOD"] == "POST")
{
    if(isset($_POST["idUsr"]))
    {
    
    $keyId = "xsbIQQCbYowdJXcZhbnSgSmZsCdKJayQMdaNbQTi";
    $userId = $_POST["idUsr"];
    $word = $_POST["word"];

    $selectusrId = "SELECT u.userId FROM users AS u;";
    $res = mysqli_query($conn,$selectusrId);
      
      $idUser;
      while( $row = $res->fetch_array() )
      {
         $hmc = hash_hmac("sha256",$row["userId"],$keyId);
         if( password_verify( $hmc,$userId ))
         {
            $idUser = $row["userId"];
         }
      }
      $wordId;
      $selectwordId = "SELECT * FROM words;";
      $rs = mysqli_query($conn,$selectwordId);
      while( $rw = $rs->fetch_array() )
      {
         if( $rw["word"] == $word )
         {
            $wordId = $rw["wordId"];
         }
      }

    $statQry = "SELECT * FROM statistics WHERE(userId = ? AND wordId = ?);";
    $prprqry = $conn->prepare($statQry);
    $prprqry->bind_param("ii",$idUser,$wordId);
    $prprqry->execute();
    $statres = $prprqry->get_result();

    while( $rou = $statres->fetch_array() )
    {
        $objStat = new stdClass();
         $objStat->wonGame = $rou["wonGame"];
        $objStat->lostGame = $rou["lostGame"];
        
        $jsonStat = json_encode($objStat);
        echo $jsonStat;
    }

    }
}



?>
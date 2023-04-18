<?php 
include_once "connection.php";

if( $_SERVER["REQUEST_METHOD"] == "POST" )
{
   $word = $_POST["wordId"];
   $usrId = $_POST["userId"];
   $game = $_POST["game"];
   $key = "xsbIQQCbYowdJXcZhbnSgSmZsCdKJayQMdaNbQTi";
   
   $selectusrId = "SELECT u.userId FROM users AS u;";
   $res = mysqli_query($conn,$selectusrId);
   
   $idUser;
   while( $row = $res->fetch_array() )
   {
      $hmc = hash_hmac("sha256",$row["userId"],$key);
       if( password_verify( $hmc,$usrId ))
       {
         $idUser = $row["userId"];
       }
   }

   $selectidword = "SELECT wordId,word FROM words;";
   $result = mysqli_query($conn,$selectidword);
   $wordId;
   while($row = $result->fetch_array())
   {
      if( $row["word"] == $word )
      {
         $wordId = $row["wordId"];
      }
   }
   $qry = "SELECT * FROM statistics;";
   $resl = mysqli_query($conn,$qry);
   $insertStat = false;

   while( $row = $resl->fetch_array() )
   {
      if( $row["userId"] != $idUser )
      {
         
      }
   }
   
}


?>
<?php 
include_once "connection.php";

if( $_SERVER["REQUEST_METHOD"] == "POST" )
{
   if( isset($_POST["userId"]) )
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

         $qry = "SELECT * FROM statistics WHERE (wordId = '$wordId' AND userId = '$idUser');";
         $qryres = mysqli_query($conn,$qry);
         $count = mysqli_num_rows($qryres);
         echo $count;

         if( $count == 0 )
            {
               if( $game === "false" )
               { 
               $prprUpdate = $conn->prepare("INSERT INTO statistics(wonGame,userId,wordId) VALUES(wonGame+1,?,?);");
               $prprUpdate->bind_param("ii",$idUser,$wordId);
               $prprUpdate->execute();
               $prprUpdate->close();
               echo "inserted wonGame";
               }
               if($game === "true")
               {
                  $prprUpdate = $conn->prepare("INSERT INTO statistics(lostGame,userId,wordId) VALUES(lostGame+1,?,?);");
                  $prprUpdate->bind_param("ii",$idUser,$wordId);
                  $prprUpdate->execute();
                  $prprUpdate->close();
                  echo "inserted lostGame";
               }
            }

            if( $count > 0 )
            {
                  if( $game === "false" )
                  {   
                     $prprUpdate = $conn->prepare("UPDATE statistics SET wonGame = wonGame + 1 WHERE(userId = ? AND wordId = ?);");
                     $prprUpdate->bind_param("ii",$idUser,$wordId);
                     $prprUpdate->execute();
                     $prprUpdate->close();
                     echo "wonGame updated";
                  }
                  if($game === "true")
                  {
                     $prprUpdate = $conn->prepare("UPDATE statistics SET lostGame = lostGame + 1 WHERE(userId = ? AND wordId = ?);");
                     $prprUpdate->bind_param("ii",$idUser,$wordId);
                     $prprUpdate->execute();
                     $prprUpdate->close();
                     echo "lostGame updated";
                  } 
            }
         
         
   }
}


               
              
               
              
                       
               

?>



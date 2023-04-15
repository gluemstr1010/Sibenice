<?php 
include_once "connection.php";

if( $_SERVER["REQUEST_METHOD"] == "POST" )
{
   $letter = $_POST["wordId"];
   $word = $_POST["userId"];
   // compare wordId and userId , insert into statistics or Update  
}


?>
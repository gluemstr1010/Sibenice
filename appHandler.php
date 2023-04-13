<?php 
session_start();
include_once "connection.php";

if( $_SERVER["REQUEST_METHOD"] == "POST" )
{
   $letter = $_POST["letter"];
   $word = $_POST["word"];

   $qry = "SELECT w.word FROM words AS w;";

   $res = mysqli_query($conn,$qry);

   while( $row = $res->fetch_array() ){

    echo $row["word"];
      
   }
}


?>
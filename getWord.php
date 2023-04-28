<?php 
include_once "connection.php";

if( $_SERVER["REQUEST_METHOD"] == "GET" )
{
    $wordQRY = "SELECT w.word, w.wordId FROM words AS w ORDER BY RAND() LIMIT 1;";

    $res = mysqli_query($conn,$wordQRY);

    while( $row = $res->fetch_array() )
    {
        echo $row["word"] . "\n";
        echo $row["wordId"];
    }
    //send random word and wordId from database
}

?>
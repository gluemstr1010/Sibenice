<?php 
include_once "connection.php";

if( $_SERVER["REQUEST_METHOD"] == "POST" )
{
    $word = $_POST["word"];

    $qry = "SELECT word FROM words;";
    $result = mysqli_query($conn,$qry);

    $wordexists = "false";

    while( $row = $result->fetch_array() )
    {
        if( $word == $row["word"] )
        {
            $wordexists = "true";
            echo "wordexists";
        }
    }

    if( $wordexists == "false" )
    {
        $insrtQry = "INSERT INTO words(word) VALUES(?)";
        $prprinsrt = $conn->prepare($insrtQry);
        $prprinsrt->bind_param("s",$word);
        $prprinsrt->execute();
        $prprinsrt->close();
        echo "wordinserted";
    }
}


?>
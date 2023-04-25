<?php 
include_once "connection.php";

if( $_SERVER["REQUEST_METHOD"] == "POST" )
{
    if( isset($_POST["idUser"]) )
    {
        $keyId = "xsbIQQCbYowdJXcZhbnSgSmZsCdKJayQMdaNbQTi";
        $userId = $_POST["idUser"];
        $statQry = "SELECT * FROM statistics;";
        $result = mysqli_query($conn,$statQry);

        $arr = array();
        while( $row = $result->fetch_array() )
        {
            $hmcId = hash_hmac("sha256",$row["userId"],$keyId);

            if( password_verify($hmcId,$userId) )
            {
                $slctWord = "SELECT * FROM words;";
                $res = mysqli_query($conn,$slctWord);
                $word;
                while($rou = $res->fetch_array())
                {
                    if($rou["wordId"] == $row["wordId"])
                    {
                        $word = $rou["word"];
                    }
                }
                $prctng = getPercentage($row["wonGame"],$row["lostGame"]);
                array_push( $arr, array("word"=>$word,"wonGame"=>$row["wonGame"],"lostGame"=>$row["lostGame"],"success"=>$prctng)); 
                // $objStat = new stdClass();
                // $objStat->wonGame = $row["wonGame"];
                // $objStat->lostGame = $row["lostGame"];
                // $objStat->wordId = $row["wordId"];

                // $jsonStat = json_encode($objStat);

                // echo $jsonStat;
            }
        }
        echo json_encode($arr);
    }
}

function getPercentage( $wonGames,$lostGames )
{
    settype($wonGames,"integer");
    settype($lostGames,"integer");
    $totalGames = $wonGames + $lostGames;
    $percentage = (100 * $wonGames) / $totalGames;
    $final = strval($percentage) . "%";
    return $final;
}

?>
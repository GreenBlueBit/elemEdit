

<?php
    require 'config.php';

    error_reporting(E_ALL);

$action = "";

if(isset($_POST["a"]))
{
    $action = $_POST["a"];  
}

if($action == "saveEdit")
{
    
    $myFile = "testFile.txt";
    $fh = fopen($myFile, 'w');
    $stringData = "id : " . $_POST["id"] . ' ; ';
    fwrite($fh, $stringData);
    $stringData = "value : " . $_POST["value"] . ' ; ';
    fwrite($fh, $stringData);
    $stringData = "By " . $_POST["author"];
    fwrite($fh, $stringData);
    fclose($fh);
    echo 'Ok';
}
if($action == "getAppreciate")
    {
        $con = new PDO(Config::$host,
                  Config::$user,
                  Config::$password);
        if (!$con) {
            die('Could not connect: ' . mysql_error());
        }
        
        $sql = $con->prepare("SELECT amount FROM appreciated WHERE appreciate_ID = 1");
        $sql->execute();
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        if(!$result) {
            die('Error occured');
        }
        echo json_encode($result);
        $con = null;
        
       
    }
    
if($action == "appreciate")
    {
        $con = new PDO(Config::$host,
                       Config::$user,
                       Config::$password);
        
        if(!$con) {
            die("Could not connect: " . mysql_error());   
        }
        
        $sql = $con->prepare("SELECT amount FROM appreciated WHERE appreciate_ID = 1");
        $sql->execute();
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        $amount = $result[0]["amount"];
        $numAmount = ((int) $amount) + 1;
        $sql = $con->prepare("UPDATE appreciated SET amount = " . $numAmount . " WHERE appreciate_ID = 1");
        $sql->execute();
        $con = null;
        
    }
?>
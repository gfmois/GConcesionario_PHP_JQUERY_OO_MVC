<?php
$path = $_SERVER["DOCUMENT_ROOT"] . '/GConcesionario_PHP_JQUERY_OO_MVC/';
include_once($path . 'model/Connection.php');
include_once($path . 'model/Car.php');
include_once($path . 'view/include/JWT.php');


class AuthMiddleware {
    private $conn;
    private $jwt;
    private $jwtConfig;
    private $key;
    private $iniPath;

    function __construct() {
        $this->conn = new Connection();
        $this->jwt = new JWT();
        $this->iniPath = $_SERVER["DOCUMENT_ROOT"] . '/GConcesionario_PHP_JQUERY_OO_MVC/'; 
        $this->jwtConfig = parse_ini_file($this->iniPath . "model/Config.ini", true);
        $this->key = $this->jwtConfig["Secret"]["key"];
    }

    function getUser($token) {
        $this->conn->connect();
        $user = json_decode($this->jwt->decode($token, $this->key));
        $sql = "SELECT username, email, type, avatar FROM users WHERE username LIKE " . "'" . $user->user . "'";

        $res = $this->conn->query($sql);

        return mysqli_fetch_assoc($res);
    }
}
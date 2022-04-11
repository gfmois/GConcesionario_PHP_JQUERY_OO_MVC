<?php
    $path = $_SERVER["DOCUMENT_ROOT"] . '/GConcesionario_PHP_JQUERY_OO_MVC/';
    include_once($path . 'model/Connection.php');
    
    class HomepageAccess {
        private $conn;

        function __construct() {
            $this->conn = new Connection();
        }

        function selectFromQuery($sql) {
            $this->conn->connect();
            $query = $this->conn->query($sql);
            $array = array();

            while ($row = mysqli_fetch_assoc($query)) {
                $array[] = $row;
            }

            return $array;
        }
    }
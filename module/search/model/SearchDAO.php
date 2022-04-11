<?php
    $path = $_SERVER["DOCUMENT_ROOT"] . '/GConcesionario_PHP_JQUERY_OO_MVC/';
    include_once($path . "model/Connection.php");
    include_once($path . "model/Connection.php");

    class SearchDAO {
        private $connection;

        function __construct() {
            $this->connection = new Connection();
        }

        function getTypes() {
            $this->connection->connect();

            $sql = "SELECT DISTINCT id_cat, cat_name FROM category";
            $result = $this->connection->query($sql);

            while ($row = mysqli_fetch_assoc($result)) {
                $cats[] = $row;
            }

            return $cats;
        }

        function getBrands() {
            $this->connection->connect();

            $sql = "SELECT DISTINCT id_brand, brand_name FROM brand";
            $result = $this->connection->query($sql);

            while ($row = mysqli_fetch_assoc($result)) {
                $brands[] = $row;
            }

            return $brands;
        }

        function findOptions($option) {
            $sql = "SELECT * FROM ";
            if (empty($option)) {
                $sql = "SELECT * FROM cars";
            } else {
                // return $option;
                $this->connection->connect();

                $sql = "SELECT m.id_model, m.model_name, b.id_brand, b.brand_name, cat.id_cat, cat.cat_name FROM cars c INNER JOIN model m ON c.id_model = m.id_model INNER JOIN brand b ON m.id_brand = b.id_brand INNER JOIN category cat ON cat.id_cat = c.id_cat ";
                $contentKeys = array();

                foreach($option as $key => $val) {
                    $llave = $key;
                    
                    if (!empty($option[$llave])) {
                        $contentKeys[] = $key;
                    }
                }

                for ($i = 0; $i < count($contentKeys); $i++) {
                    if ($i == 0 && $contentKeys[$i] != "id_brand") {
                        if ($contentKeys[$i] == "city") {
                            $sql .= "WHERE c." . $contentKeys[$i] . " LIKE " . "'" . $option[$contentKeys[$i]] . "%' ";
                        } else {
                            $sql .= "WHERE c." . $contentKeys[$i] . " = " . "'" . $option[$contentKeys[$i]] . "' ";
                        }
                    } else if ($i != 0 && $contentKeys[$i] != "id_brand") {
                        $sql .= "AND c." . $contentKeys[$i] . " = " . "'" . $option[$contentKeys[$i]] . "' ";
                    } else if ($contentKeys[$i] == "id_brand") {
                        if ($i == 0) {
                            $sql .= "WHERE c.id_model IN (SELECT m.id_model FROM model m WHERE m.id_brand = " . "'" . $option[$contentKeys[$i]] . "'" . ")";
                        } else {
                            $sql .= "AND c.id_model IN (SELECT m.id_model FROM model m WHERE m.id_brand = " . "'" . $option[$contentKeys[$i]] . "'" . ")";
                        }
                    }
                }

                // return $sql;
                $result = $this->connection->query($sql);

                while ($row = mysqli_fetch_assoc($result)) {
                    $findedCars[] = $row;
                }

                return $findedCars;
            }

        }
    }
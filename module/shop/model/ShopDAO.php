<?php
    $path = $_SERVER["DOCUMENT_ROOT"] . '/GConcesionario_PHP_JQUERY_OO_MVC/';
    include_once($path . 'model/Connection.php');
    include_once($path . 'model/Car.php');
    include_once($path . 'view/include/auth_middleware.php');

    class ShopDAO {
        private $conn;
        private $auth_middleware;

        function __construct() {
            $this->conn = new Connection();
            $this->auth_middleware = new AuthMiddleware();
        }

        function findAll($page) {
            $page = $page -1;
            $limitPage = $page * 8;

            $this->conn->connect();
            $sql = "SELECT c.*, b.*, m.* FROM cars c, brand b, model m WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand ORDER BY count DESC LIMIT $limitPage, 8";
            $carArray = array();
            
            $result = $this->conn->query($sql);
            
            while ($row = mysqli_fetch_assoc($result)) {
                $carArray[] = $row;
            }

            $query = "SELECT COUNT(*) AS n_cars FROM cars";
            $count = $this->conn->query($query);
            
            $this->conn->disconnect();
            return array(
                0 => $carArray,
                1 => mysqli_fetch_assoc($count),
            );
        }

        function getCarsInfo() {
            $this->conn->connect();

            $brand = "SELECT * FROM brand b";
            $model = "SELECT * FROM model m";
            $type = "SELECT * FROM type t";
            $body = "SELECT * FROM body b";
            $category = "SELECT * FROM category c";

            $rBrand = $this->conn->query($brand);
            $rModel = $this->conn->query($model);
            $rType = $this->conn->query($type);
            $rBody = $this->conn->query($body);
            $rCategory = $this->conn->query($category);

            $allInfo = array();

            while ($brandRow = mysqli_fetch_assoc($rBrand)) {
                $allInfo['brand'][] = $brandRow;
            }
            while ($modelRow = mysqli_fetch_assoc($rModel)) {
                $allInfo["model"][] = $modelRow;
            }
            while ($typeRow = mysqli_fetch_assoc($rType)) {
                $allInfo["type"][] = $typeRow;
            }
            while ($bodyRow = mysqli_fetch_assoc($rBody)) {
                $allInfo['body'][] = $bodyRow;
            }
            while ($catRow = mysqli_fetch_assoc($rCategory)) {
                $allInfo['category'][] = $catRow;
            }

            return $allInfo;

            
        }

        function findCar($id) {
            $this->conn->connect();
            $imgArray = array();
            $query = "SELECT imgUrl FROM car_imgs WHERE carID = $id";
            $sql = "SELECT c.*, b.*, m.* 
                FROM cars c, brand b, model m 
                WHERE c.id = $id 
                AND c.id_model = m.id_model 
                AND m.id_brand = b.id_brand";
            
            $related = "SELECT a.*, o.*, b.* 
                        FROM cars a, model o, brand b 
                        WHERE b.id_brand = o.id_brand 
                        AND a.id NOT LIKE " . "'" . $id . "'" . 
                        " AND a.id_model = o.id_model 
                        AND o.id_brand IN (
                            SELECT m.id_brand 
                            FROM cars c, model m 
                            WHERE c.id_model = m.id_model 
                            AND c.id = " . "'" . $id . "');";
            
            $result = $this->conn->query($sql);
            $images = $this->conn->query($query);
            $relatedCarsResult = $this->conn->query($related);
            
            while ($row = mysqli_fetch_assoc($images)) {
                $imgArray[] = $row;
            }

            while ($rRow = mysqli_fetch_assoc($relatedCarsResult)) {
                $relatedCars[] = $rRow;
            }

            $array = array(
                0 => mysqli_fetch_assoc($result),
                1 => $imgArray,
                2 => $relatedCars,
            );

            // die($sql);
            return $array;
        }

        function filterList($filters, $pagination) {
            // return $page;
            
            if ($pagination != null || 0) {
                $pagination = $pagination - 1;
            }

            $limitPage = $pagination * 8;
            // return $limitPage;

            if (empty($filters)) {
                $sql = 'SELECT * FROM cars';
            } else {
                $sql = 'SELECT *, b.brand_name, m.model_name 
                        FROM cars c 
                        INNER JOIN model m ON m.id_model = c.id_model 
                        INNER JOIN brand b ON m.id_brand = b.id_brand ';

                $this->conn->connect();

                foreach ($filters as $key => $value) {
                    unset($llave);
                    $llave = $key;
                    for ($i = 0; $i < count($filters[$key]); $i++) {
                            if (key($filters) && $i == 0) {
                                if ($llave == array_keys($filters)[0]) {
                                    if ($llave == "id_brand") {
                                        if (count($filters[$llave]) > 1) {
                                            $sql .= "WHERE c.id_model IN (SELECT m.id_model FROM model m WHERE m.id_brand = " . '"' . $filters[$key][0] . '"';
                                            for ($j = 1; $j < count($filters[$llave]);  $j++) {
                                                $sql .= " OR m.id_brand = " . '"' . $filters[$key][$j] . '"';
                                            }
                                        } else {
                                            $sql .= " WHERE c.id_model IN " . "(SELECT m.id_model FROM model m WHERE m.id_brand = " . '"' . $filters[$key][0] . '"' ;
                                        }
                                        $sql .= ")";
                                    } else if ($llave == "city") {
                                        $sql .= "WHERE " . $llave . " LIKE " . "'" . $filters[$key][0] . "%'";
                                    } else if ($llave == "orderBy") {
                                        if ($filters[$llave][0] == "count") {
                                            if (count($filters[$llave]) > 1) {
                                                $sql .= " ORDER BY c." . $filters[$key][0] . " DESC";
                                                for ($j = 1; $j < count($filters[$llave]); $j++) {
                                                    $sql .= ", c.id_" . $filters[$llave][$j] . " DESC";
                                                }
                                            } else {
                                                $sql .= " ORDER BY c." . $filters[$key][0] . " DESC";
                                            }
                                        } else {
                                            if (count($filters[$llave]) > 1) {
                                                $sql .= " ORDER BY c.id_" . $filters[$key][0] . " DESC";
                                                for ($j = 1; $j < count($filters[$llave]); $j++) {
                                                    $sql .= ", c.id_" . $filters[$llave][$j] . " DESC";
                                                }
                                            } else {
                                                $sql .= " ORDER BY c.id_" . $filters[$key][0] . " DESC";
                                            }
                                        }
                                    } else if ($llave != "id_brand" && $llave != "city" && $llave != "orderBy") {
                                        $sql .= " WHERE c." . $llave . " = " . '"' . $filters[$key][0] . '"' ;
                                    } 
                                } else {
                                    if ($llave != "id_brand" && $llave != "city") {
                                        $sql .= " AND c." . $llave . " = " . '"' . $filters[$key][0] . '"' ;
                                    } else if ($llave == "id_brand") {
                                        if (count($filters[$llave]) > 1) {
                                            $sql .= " AND " . " c.id_model IN " . "(SELECT m.id_model FROM model m WHERE m.id_brand = " . "'" . $filters[$key][0] . "'";
                                            for ($j = 1; $j < count($filters[$llave]);  $j++) {
                                                $sql .= " OR m.id_brand = " . '"' . $filters[$key][$j] . '"';
                                            }
                                        } else {
                                            $sql .= " AND c.id_model IN (SELECT m.id_model FROM model m WHERE m.id_brand = " . "'" . $filters[$key][0] . "'";
                                        }
                                        $sql .= ")";
                                    }
                                }
                            } else if ($llave != "id_brand" && $llave != "orderBy") {
                                $sql .= " OR c." . $llave . " = " . '"' . $filters[$key][$i] . '"';
                            }
                    }

                }

                $sql .= " LIMIT $limitPage, 8";
                // return $sql;


                $result = $this->conn->query($sql);

                while ($row = mysqli_fetch_assoc($result)) {
                    $filtedCars[] = $row;
                }
            }
            return $filtedCars;
        }

        function addCount($carVIN) {
            $this->conn->connect();
            $sql = "UPDATE cars SET count = count + 1 WHERE vin_number = ";

            foreach ($carVIN as $key => $val) {
                $sql .= "'" . $val . "'";
            }

            $res = $this->conn->query($sql);

            if ($res) {
                return "Success";
            } else {
                return "Error";
            }

        }

        function loadLikes($token) {
            $this->conn->connect();
            $user = $this->auth_middleware->getUser($token);
            $sql = "SELECT vin_number FROM cars WHERE id IN (SELECT idCar FROM likes WHERE username LIKE '" . $user["username"] . "')";

            $res = $this->conn->query($sql);

            $n = mysqli_num_rows($res) > 0 ? true : false;

            if ($n == true) {
                while ($row = mysqli_fetch_assoc($res)) {
                    $id[] = $row;
                }
                return $id;
            } else {
                return ["message" => [
                    "cod" => 285,
                    "commentary" => "Usuario sin Likes."
                ]];
            }
        }

        function setLikeStatus($token, $idCar) {
            $this->conn->connect();
            $user = $this->auth_middleware->getUser($token);
            $sql = "SELECT * FROM likes WHERE username LIKE '" . $user["username"] . "' AND idCar LIKE '" . $idCar["idCar"] . "'";
            
            $res = $this->conn->query($sql)->num_rows;
            $status = $res > 0 ? true : false;

            if ($status) {
                return $this->setUnliked($user["username"], $idCar["idCar"]);
            } else if (!$status) {
                return $this->setLiked($user["username"], $idCar["idCar"]);
            }
        }

        private function setLiked($user, $idCar) {
            $this->conn->connect();
            $sql = "INSERT INTO likes (username, idCar) VALUES (" . "'" . $user . "'" . ", $idCar)";

            $res = $this->conn->query($sql);

            if ($res) {
                return ["message" => [
                    "cod" => 278,
                    "commentary" => "Like insertado"
                ]];
            } else {
                return ["message" => [
                    "cod" => 61,
                    "commentary" => "Error al insertar el like"
                ]];
            }
        }

        private function setUnliked($user, $idCar) {
            $this->conn->connect();
            $sql = "DELETE FROM likes WHERE username LIKE " . "'" . $user . "'" . "AND idCar LIKE " . $idCar;

            $res = $this->conn->query($sql);

            if ($res) {
                return ["message" => [
                    "cod" => 346,
                    "commentary" => "Like eliminado"
                ]];
            } else {
                return ["message" => [
                    "cod" => 62,
                    "commentary" => "Error al quitar el like"
                ]];
            }
        }
    }
<?php
    // $path = $_SERVER["DOCUMENT_ROOT"] . 'GConcesionario_PHP_JQUERY_OO_MVC';
    include_once('./model/Connection.php');

    class Car {
        private $conn;
        private $id;
        private $vin_number;
        private $number_plate;
        private $kms;
        private $color;
        private $price;
        private $n_doors;
        private $cv;
        private $cyear;
        private $id_model;
        private $id_body;
        private $id_cat;
        private $id_type;
    
        public function __construct($vin_number, $number_plate, $kms, $color, $price, $n_doors, $cv, $cyear, $id_model, $id_body, $id_cat, $id_type) {
            $this->id = 0;
            $this->vin_number = $vin_number;
            $this->number_plate = $number_plate;
            $this->kms = $kms;
            $this->color = $color;
            $this->price = $price;
            $this->n_doors = $n_doors;
            $this->cv = $cv;
            $this->cyear = $cyear;
            $this->id_model = $id_model;
            $this->id_body = $id_body;
            $this->id_cat = $id_cat;
            $this->id_type = $id_type;
            $this->conn = new Connection();
        }

        public static function fromMap($data) {
            $car = new Car(
                $data->vin_number,
                $data->number_plate,
                $data->kms,
                $data->color,
                $data->price,
                $data->n_doors,
                $data->cv,
                $data->cyear,
                $data->id_model,
                $data->id_body,
                $data->id_cat,
                $data->id_type,
            );

            return $car;
        }

        public static function fromArray($data) {
            $car = new Car(
                $data["vin_number"],
                $data["number_plate"],
                $data["kms"],
                $data["color"],
                $data["price"],
                $data["n_doors"],
                $data["cv"],
                $data["cyear"],
                $data["id_model"],
                $data["id_body"],
                $data["id_cat"],
                $data["id_type"],
            );

            return $car;
        }

        public static function fromArrayPositions($data) {
            $car = new Car(
                $data[1],
                $data[2],
                $data[3],
                $data[4],
                $data[5],
                $data[6],
                $data[7],
                $data[8],
                $data[9],
                $data[10],
                $data[11],
                $data[12],
            );

            return $car;
        }

        // GETTERS
        function getVinNumber() {
            return $this->vin_number;
        }
        function getNumberPlate() {
            return $this->number_plate;
        }
        function getKms() {
            return $this->kms;
        }
        function getColor() {
            return $this->color;
        }
        function getPrice() {
            return $this->price;
        }
        function getN_Doors() {
            return $this->n_doors;
        }
        function getCV() {
            return $this->cv;
        }
        function getYear() {
            return $this->cyear;
        }
        function getIdModel() {
            return $this->id_model;
        }
        function getIdBrand() {
            $modelId = $this->getIdModel();
            $this->conn->connect();
            $sql = "SELECT id_brand FROM brand WHERE id_brand = (SELECT id_brand FROM model WHERE id_model = '$modelId')";

            $result = $this->conn->query($sql);
            $this->conn->disconnect();

            return $result->fetch_assoc()["id_brand"];
        }
        function getBrandName() {
            $modelId = $this->getIdModel();
            $this->conn->connect();
            $sql = "SELECT brand_name FROM brand WHERE id_brand = (SELECT id_brand FROM model WHERE id_model = '$modelId')";

            $result = $this->conn->query($sql);
            $this->conn->disconnect();

            return $result->fetch_assoc()["brand_name"];
        }
        function getModelName() {
            $modelId = $this->getIdModel();
            $this->conn->connect();
            $sql = "SELECT model_name FROM model WHERE id_model = '$modelId'";

            $result = $this->conn->query($sql);
            $this->conn->disconnect();
        
            return $result->fetch_assoc()["model_name"];
        }

        function getIdBody() {
            return $this->id_body;
        }
        function getBodyName() {
            $id_body = $this->getIdBody();
            $this->conn->connect();
            $sql = "SELECT body_name FROM body WHERE id_body = '$id_body'";

            $result = $this->conn->query($sql);
            $this->conn->disconnect();

            return $result->fetch_assoc()["body_name"];
        }

        function getIdCat() {
            return $this->id_cat;
        }
        function getCatName() {
            $id_cat = $this->getIdCat();
            $this->conn->connect();
            $sql = "SELECT cat_name FROM category WHERE id_cat = '$id_cat'";

            $result = $this->conn->query($sql);
            $this->conn->disconnect();

            return $result->fetch_assoc()["cat_name"];
        }

        function getIdType() {
            return $this->id_type;
        }
        function getTypeName() {
            $id_type = $this->getIdType();
            $this->conn->connect();
            $sql = "SELECT type_name FROM type WHERE id_type = '$id_type'";

            $result = $this->conn->query($sql);
            $this->conn->disconnect();

            return $result->fetch_assoc()["type_name"];
        }

        function getId() {
            return $this->id;
        }

        // SETTERS
        function setVinNumber($newVin) {
            $this->vin_number = $newVin;
        }
        function setNumberPlate($newPlate) {
            $this->number_format = $newPlate;
        }
        function setKms($newKms) {
            $this->kms = $newKms;
        }
        function setColor($newColor) {
            $this->color = $newColor;
        }
        function setPrice($newPrice) {
            $this->price = $newPrice;
        }
        function setN_Doors($newDoors) {
            $this->n_doors = $newDoors;
        }
        function setCV($newCV) {
            $this->cv = $newCV;
        }
        function setYear($newYear) {
            $this->cyear = $newYear;
        }
        function setIdModel($newModel) {
            $this->id_model = $newModel;
        }
        function setIdBody($newBody) {
            $this->id_body = $newBody;
        }
        function setIdCat($newCat) {
            $this->id_cat = $newCat;
        }
        function setIdType($newType) {
            $this->id_type = $newType;
        }

        function setID($id) {
            $this->id = $id;
        } 
        
        function serialize() {
            return json_encode(get_object_vars($this));
        }
        
        function toArray() {
            return [
                'id' => $this->id,
                'vin_number' => $this->vin_number,
                'number_plate' => $this->number_plate,
                'kms' => $this->kms,
                'color' => $this->color,
                'price' => $this->price,
                'n_doors' => $this->n_doors,
                'cv' => $this->cv,
                'cyear' => $this->cyear,
                'id_model' => $this->id_model,
                'id_body' => $this->id_body,
                'id_cat' => $this->id_cat,
                'id_type' => $this->id_type
            ];
        }
    }
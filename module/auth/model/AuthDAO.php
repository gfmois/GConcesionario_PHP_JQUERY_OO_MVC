<?php
$path = $_SERVER["DOCUMENT_ROOT"] . '/GConcesionario_PHP_JQUERY_OO_MVC/';
include_once($path . 'model/Connection.php');
include_once($path . 'model/Car.php');
include_once($path . 'view/include/JWT.php');
include_once($path . 'view/include/auth_middleware.php');

session_start();

class AuthDAO {
    private $conn;
    private $jwt;
    private $jwtConfig;

    function __construct() {
        $this->conn = new Connection();
        $this->jwt = new JWT();
        $this->jwtConfig = parse_ini_file('../../../model/Config.ini', true);
    }

    function login($userInfo) {
        $this->conn->connect();

        $sql = "SELECT * FROM users WHERE username LIKE BINARY " . "'" . $userInfo['username'] . "';";

        $res = mysqli_num_rows($this->conn->query($sql)) > 0 ? get_object_vars($this->conn->query($sql)->fetch_object()) : null;

        if ($res == null) {
            return ["message" => [
                "cod" => 900,
                "commentary" => "Usuario no existe"
            ]];
        } else if (password_verify($userInfo["password"], $res["password"])) {
            try {
                $header = '{"typ": ' . '"' . $this->jwtConfig["Header"]["typ"] . '", "alg": ' . '"' . $this->jwtConfig["Header"]["alg"] . '"}';
                $key = $this->jwtConfig['Secret']['key'];
                $payload = '{"iat": ' . time() . ', "exp": ' . time() + (60 * 60) . ', "user": "' . $userInfo['username'] . '"}';

                $token = $this->jwt->encode($header, $payload, $key);

                $_SESSION['user'] = $res['username'];
                $_SESSION['time'] = time();

                return json_encode($token);
            } catch (Exception $e) {
                return ["message" => [
                    "cod" => 601,
                    "commentary" => "message en el JWT"
                ]];
            }
        } else {
            return ["message" => [
                "cod" => 704,
                "commentary" => "Contraseña o usuario no válido"
            ]];
        }
    }

    function newUser($newUserInfo) {
        $this->conn->connect();

        $sql = "SELECT * FROM users WHERE username LIKE " . "'" . $newUserInfo['username'] . "'" . " OR email LIKE " . "'" . $newUserInfo['email'] . "'" . ";";
        $res = $this->conn->query($sql);

        if (mysqli_num_rows($res) != 0) {
            return json_encode([
                "message" => [
                    "cod" => 4,
                    "commentary" => "Nombre de Usuario o Email ya utilizado."
                ]
            ]);
        } else {
            if ($newUserInfo['password'] === $newUserInfo['password_confirm']) {
                $insertUser = "INSERT INTO users(username, password, email, avatar) 
                VALUES (" . "'" . $newUserInfo['username'] . "', '" . password_hash($newUserInfo['password'], PASSWORD_DEFAULT, ["cost" => 12]) . "', " . "'" . $newUserInfo['email'] . "', '"  . $newUserInfo['avatar'] . "')";

                $res = $this->conn->query($insertUser);

                if ($res) {
                    return json_encode([
                        "success" => [
                            "cod" => 23,
                            "commentary" => "Usuario insertado correctamente"
                        ]
                    ]);
                } else {
                    return json_encode(["message" => [
                        "cod" => 56,
                        "commentary" => "message al insertar el usuario."
                    ]]);
                }
            } else {
                return json_encode(["message" => [
                    "cod" => 345,
                    "commentary" => "Contraseñas no coinciden"
                ]]);
            }
        }
    }

    function findByName($name) {
        $this->conn->connect();
        $sql = "SELECT username, email, avatar, type FROM users WHERE username LIKE " . "'" . $name . "'";
        $res = $this->conn->query($sql)->fetch_object();
        $res = get_object_vars($res);

        return $res;
    }

    function checkToken($token) {
        $jwtSecret = $this->jwtConfig['Secret']['key'];

        $jwtUser = $this->jwt->decode($token, $jwtSecret);
        $json = json_decode($jwtUser, true);

        $res = $this->findByName($json['user']);

        return $res;
    }

    function checkSession() {
        if (!isset($_SESSION['time'])){
            return json_encode(["message" => [
                "cod" => 64,
                "commentary" => "Usuario Inactivo"
            ]]);
        } else {
            if ((time() - $_SESSION["time"]) >= 900) {
                return json_encode(["message" => [
                    "cod" => 64,
                    "commentary" => "Usuario Inactivo"
                ]]);
            } else {
                return json_encode(["message" => [
                    "cod" => 63,
                    "commentary" => "Usuario Activo"
                ]]);
            }
        }
    }

    function userController() {
        if (isset($_SESSION["user"])) {
            return ["message" => [
                "cod" => 102,
                "commentary" => "Usuario Existe"
            ]];
        } else {
            return ["message" => [
                "cod" => 103,
                "commentary" => "Usuario no Existe"
            ]];
        }
    }

    function logout($user) {
        if ($user) {
            session_destroy();
            session_unset();
            return json_encode(["message" => [
                "cod" => 22,
                "commentary" => "Sesión Cerrada"
            ]]);
        }
    }
}

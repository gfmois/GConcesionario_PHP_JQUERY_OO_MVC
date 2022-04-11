<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/GConcesionario_PHP_JQUERY_OO_MVC/';
    include_once($path . 'module/auth/model/AuthDAO.php');

    $authDAO = new AuthDAO();

    switch ($_GET['op']) {
        case 'login':
            $userExists = $authDAO->login($_POST);
            echo json_encode($userExists, JSON_PRETTY_PRINT);
            break;
        case 'register':
            $newUser = $authDAO->newUser($_POST);
            echo json_encode($newUser, JSON_PRETTY_PRINT);
            break;
        case 'checkToken':
            $token = apache_request_headers()["token"];
            $user = $authDAO->checkToken($token);
            echo json_encode($user, JSON_PRETTY_PRINT);
            break;
        case 'logout':
            $token = apache_request_headers()["token"];
            $logout = $authDAO->logout($token);
            echo json_encode($logout, JSON_PRETTY_PRINT);
            break;
        case 'session':
            $userSession = $authDAO->checkSession();
            echo $userSession;
            break;
        case 'userControl':
            $control = $authDAO->userController();
            echo json_encode($control);
            break;

    }

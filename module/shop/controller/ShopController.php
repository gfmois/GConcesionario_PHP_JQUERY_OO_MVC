<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/GConcesionario_PHP_JQUERY_OO_MVC/';
    include_once($path . 'module/shop/model/ShopDAO.php');

    $shopDAO = new ShopDAO();

    switch ($_GET['op']) {
        case 'list':
            include_once($path . "module/shop/view/Shop.html");
            break;
        case 'fndAll':
            $cars = $shopDAO->findAll($_GET['page']);
            echo json_encode($cars, JSON_PRETTY_PRINT);
            break;
        case 'fndCar':
            $car = $shopDAO->findCar($_GET["id"]);
            echo json_encode($car, JSON_PRETTY_PRINT);
            break;
        case 'filters':
            $filters = $shopDAO->filterList($_POST, $_GET['page']);
            echo json_encode($filters, JSON_PRETTY_PRINT);
            break;
        case 'getCarsInfo': 
            $info = $shopDAO->getCarsInfo();
            echo json_encode($info, JSON_PRETTY_PRINT);
            break;
        case 'addCount':
            $carClicked = $shopDAO->addCount($_POST);
            echo json_encode($carClicked, JSON_PRETTY_PRINT);
            break;
        case 'likes':
            $token = apache_request_headers()["token"];
            $likes = $shopDAO->loadLikes($token);
            echo json_encode($likes, JSON_PRETTY_PRINT);
            break;
        case 'likeStatus':
            $token = apache_request_headers()["token"];
            $status = $shopDAO->setLikeStatus($token, $_POST);
            echo json_encode($status, JSON_PRETTY_PRINT);
            break;
    }
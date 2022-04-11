<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/GConcesionario_PHP_JQUERY_OO_MVC/';
    include_once($path . 'module/search/model/SearchDAO.php');

    $SearchDAO = new SearchDAO();

    switch($_GET["op"]) {
        case 'cat':
            $cats = $SearchDAO->getTypes();
            echo json_encode($cats, JSON_PRETTY_PRINT);
            break;
        case 'brand':
            $brands = $SearchDAO->getBrands();
            echo json_encode($brands, JSON_PRETTY_PRINT);
            break;
        case 'change':
            $options = $SearchDAO->findOptions($_POST);
            echo json_encode($options, JSON_PRETTY_PRINT);
            break;
    }
<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/GConcesionario_PHP_JQUERY_OO_MVC/';
    require_once($path . 'module/home/model/HomepageDAO.php');

    $hpDAO = new HomepageAccess();

    switch ($_GET['op']) {
        case 'list':
            include_once($path . 'module/home/view/homepage.html');
            break;
        case 'hpType':
            $sql = 'SELECT * FROM type';
            $carType = $hpDAO->selectFromQuery($sql);

            if (empty($carType)) {
                echo 'Sin resultados';
            } else {
                echo json_encode($carType);
            }
            break;
        case 'hpCat':
            $sql = "SELECT * FROM category";
            $carCategory = $hpDAO->selectFromQuery($sql);

            if (empty($carCategory)) {
                echo 'Sin resultados';
            } else {
                echo json_encode($carCategory);
            }
            break;
        case 'hpBrand':
            $sql = "SELECT * FROM brand";
            $carBrand = $hpDAO->selectFromQuery($sql);

            if (empty($carBrand)) {
                echo 'Sin resultados';
            } else {
                echo json_encode($carBrand);
            }
            break;
        default:
            include_once('view/include/404.html');
            break;
    }
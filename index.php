<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    
    if (isset($_GET['module']) && $_GET['module'] == "home") {
        include_once('./view/include/top_page_home.html');
    } elseif (!isset($_GET['module'])) {
        include_once('./view/include/top_page_home.html');
    } else {
        include_once('./view/include/top_page.html');
    }

    ?>
    <html>
        <head>
            <?php include_once('view/include/header.html'); ?>
        </head>
        <body>
            <?php 
                // Header - Home / Motorbike / About / Contact
                include_once('./view/include/menu.html');
                // Routing
                include_once('./view/include/pages.php');
                // Google Maps API & Webpage Info
                // include_once('./view/include/footer.html');
            ?>
        </body>
    </html>

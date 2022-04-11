<?php
    if (isset($_GET['module'])) {
        switch($_GET['module']) {
            case 'home':
                include_once('./view/include/slider.html');
                include_once('./view/include/content.html');
                include_once('./module/home/view/homepage.html');
                break;
            case 'shop': 
                include_once('module/shop/view/Shop.html');
                break;
            case 'about':
                include_once('./view/html/archive.html');
                break;
            case 'blog':
                include_once('./view/html/single.html');
                break;
            case 'auth':
                include_once('./module/auth/view/LoginForm.html');
                break;
        }
    } else {
        include_once('./view/include/slider.html');
        include_once('./view/include/content.html');
    }
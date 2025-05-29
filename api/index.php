<?php
session_start();
require_once 'config/database.php';

// Set cookie for session management
if (!isset($_COOKIE['user_session']) && isset($_SESSION['user_id'])) {
    setcookie('user_session', session_id(), time() + 3600, '/');
}

// Basic routing
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);

// Header
include 'components/header.php';

// Router
switch ($path) {
    case '/':
        include 'pages/home.php';
        break;
    case '/documents':
        include 'pages/documents.php';
        break;
    case '/maintenance':
        include 'pages/maintenance.php';
        break;
    case '/levies':
        include 'pages/levies.php';
        break;
    case '/strata-roll':
        include 'pages/strata-roll.php';
        break;
    default:
        include 'pages/404.php';
        break;
}

// Footer
include 'components/footer.php';
?> 
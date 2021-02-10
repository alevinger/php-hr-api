<?php
require "../bootstrap.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

$query_str = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
parse_str($query_str, $input);

// route the request to the right place
$controller_name = 'Src\\Controller\\' . ucfirst($uri[1]) . 'Controller';

$id = '';
if (class_exists($controller_name)) {
    if (isset($uri[2])) {
        $id = (int) $uri[2];
    }

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $controller = new $controller_name($dbConnection, $requestMethod, $id, $input);
    $controller->processRequest();

}

else {
    header("HTTP/1.1 404 Not Found");
    exit();
}

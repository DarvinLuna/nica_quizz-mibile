<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');


$routes->group('auth', static function($routes) {
    $routes->get('index',  'LoginContrtoller::index');
    $routes->post('login',  'LoginContrtoller::login');
    $routes->get('me',      'LoginContrtoller::me');
    $routes->post('logout', 'LoginContrtoller::logout');
});

$routes->group('usuarios', static function($routes) {
    $routes->get('/',        'UserController::index');          // listar
    $routes->get('(:num)',   'UserController::show/$1');        // ver
    $routes->post('/',       'UserController::store');          // crear
    $routes->put('(:num)',   'UserController::update/$1');      // actualizar (PUT)
    $routes->patch('(:num)', 'UserController::update/$1');      // actualizar (PATCH)
    $routes->delete('(:num)','UserController::destroy/$1');     // eliminar
});
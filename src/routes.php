<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/game', function (Request $request, Response $response, array $args) {
    return $this->renderer->render($response, 'game.phtml', $args);
});
$app->get('/movie', function (Request $request, Response $response, array $args) {
    return $this->renderer->render($response, 'movie.phtml', $args);
});
$app->get('/quiz', function (Request $request, Response $response, array $args) {
    return $this->renderer->render($response, 'quiz.phtml', $args);
});



$app->post('/switchOn/{pin}', \GPIOController::class.":switchOn");

$app->post('/TESTswitchOn/{pin}', function (Request $request, Response $response, array $args) {
    return 'on:';
});

$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    //$this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

<?php

use Slim\Slim;
use Slim\Http\Request;
use Slim\Http\Response;

class GPIOController
{

	public function __construct() {
	
		}
	
	public function boot() {
		$this->listen();
	}
	public function switchOn(Request $request, Response $response, array $args) {
		exec("python ".__DIR__."/../../python/switchOn.py ".$args['pin']." on");
		die("on");
	}
	public function switchOff(Request $request, Response $response, array $args) {
		exec("python ".__DIR__."/../../python/switchOn.py ".$args['pin']." off");
		die("off");
	}

}

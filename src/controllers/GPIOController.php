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
	    $pin = [1=>21, 2=>21, 3=>21, 4=>21];
		exec("python ".__DIR__."/../../python/switchOn.py ".$pin[$args['pin']]." on 1");
		die("on");
	}
	public function switchOff(Request $request, Response $response, array $args) {
		exec("python ".__DIR__."/../../python/switchOn.py ".$args['pin']." off");
		die("off");
	}

}

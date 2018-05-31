<?php

use Slim\Slim;
use PiPHP\GPIO\GPIO;
use PiPHP\GPIO\Pin\InputPinInterface;

class GPIOController
{

	public function __construct() {
	}
	
	public function boot() {
		$this->listen();
	}
	public function listen(){

		// Create a GPIO object
		$gpio = new GPIO();

		$pin = $gpio->getInputPin(13);
		$pin->setEdge(InputPinInterface::EDGE_BOTH);

		$interruptWatcher = $gpio->createWatcher();

		$interruptWatcher->register($pin, function (InputPinInterface $pin, $value) {
//			$activePin->setPin( $pin->getNumber(), 1 );
			echo 'Pin ' . $pin->getNumber() . ' clicked' . PHP_EOL;
			sleep(2);

			return true;
		});

		// Watch for interrupts, timeout after 5000ms (5 seconds)
		while ($interruptWatcher->watch(5000));


	}

}

<?php
require('../vendor/autoload.php');
//echo "11aa";exit;

class ActivePin {

  private $pins;

  public function __construct() {
  }

  public function setPin($pin, $value) {
    $this->pins[$pin] = $value;
  }

  public function getPin($pin) {
    return isset($this->pins[$pin]) ? $this->pins[$pin] : 0;
  }

}

use PiPHP\GPIO\GPIO;
use PiPHP\GPIO\Pin\InputPinInterface;

// Create a GPIO object
$gpio = new GPIO();

$pin = $gpio->getInputPin(13);
$pin->setEdge(InputPinInterface::EDGE_BOTH);

$interruptWatcher = $gpio->createWatcher();

$interruptWatcher->register($pin, function (InputPinInterface $pin, $value) use ($activePin) {
    $activePin->setPin( $pin->getNumber(), 1 );
    echo 'Pin ' . $pin->getNumber() . ' clicked' . PHP_EOL;
    sleep(2);

    return true;
});

// Watch for interrupts, timeout after 5000ms (5 seconds)
while ($interruptWatcher->watch(5000));


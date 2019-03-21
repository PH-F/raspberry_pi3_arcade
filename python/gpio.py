import RPi.GPIO as GPIO
import sys
from time import sleep

class GPIOhelper:

  def blink(self,pin):
    time = 0.5
    message = pin + ":on"
    
    pin = int(pin)

    if pin in [25,24,4,17,27,22]:
      GPIO.setwarnings(False)
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(int(pin), GPIO.OUT, initial=GPIO.HIGH)
      sleep(float(time));
      GPIO.output(int(pin), 0)
    else:
      message = "pin not found"

    GPIO.cleanup()
    return message

  def animation1(self):
    time = 0.5
    message = ""
    pins = ["25","24","7","8"]
    pinsReverse = ["8","7","24","25"]
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)

    #refactor when the pinnrs are know.
    for x in pins:
      GPIO.setup(int(x), GPIO.OUT, initial=GPIO.HIGH)
      sleep(float(time));
      GPIO.output(int(x), 0)
      for x in pinsReverse:
        GPIO.setup(int(x), GPIO.OUT, initial=GPIO.HIGH)
        sleep(float(time));
        GPIO.output(int(x), 0)
      GPIO.cleanup()
    return message

  def animation2(self):
    time = 0.5
    message = ""
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)

    for x in range(2):
      GPIO.setup(25, GPIO.OUT, initial=GPIO.HIGH)
      GPIO.setup(24, GPIO.OUT, initial=GPIO.HIGH)
      GPIO.setup(7, GPIO.OUT, initial=GPIO.HIGH)
      GPIO.setup(8, GPIO.OUT, initial=GPIO.HIGH)
      sleep(float(time));

      GPIO.output(25, 0)
      GPIO.output(24, 0)
      GPIO.output(7, 0)
      GPIO.output(8, 0)
      sleep(float(time));

    GPIO.cleanup()
    return message

  def switchOn(self,pin):
    pin = int(pin)
    message = ""

    if pin in [25,24,4,17,27,22]:
      GPIO.setwarnings(False)
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(int(pin), GPIO.OUT, initial=GPIO.HIGH)
    else:
      message = "pin not found"

    return message

  def switchOff(self,pin):
    pin = int(pin)
    message = ""

    if pin in [25,24,4,17,27,22]:
      GPIO.setwarnings(False)
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(int(pin), GPIO.OUT, initial=GPIO.LOW)
    else:
      message = "pin not found"

    return message

  def reset(self):
    message = ""
    pins = ["25","24","4","17","27","22"]
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)

    for x in pins:
      GPIO.setup(int(x), GPIO.OUT, initial=GPIO.LOW)

    GPIO.cleanup()
    return message

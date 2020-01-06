import RPi.GPIO as GPIO
import sys
from time import sleep

class GPIOhelper:

  def blink(self,pin):
    time = 0.5
    message = pin + ":on"
    
    pin = int(pin)

    if pin in [18,23,24]:
      GPIO.setwarnings(False)
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(int(pin), GPIO.OUT, initial=GPIO.HIGH)
      sleep(float(time))
      GPIO.output(int(pin), 0)
    else:
      message = "pin not found"

    GPIO.cleanup()
    return message

  def switchOn(self,pin):
    pin = int(pin)
    message = ""

    if pin in [18,23,24]:
      GPIO.setwarnings(False)
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(int(pin), GPIO.OUT, initial=GPIO.HIGH)
    else:
      message = "pin not found"

    return message

  def switchOff(self,pin):
    pin = int(pin)
    message = ""

    if pin in [18,23,24]:
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

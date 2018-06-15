import RPi.GPIO as GPIO
import sys
from time import sleep

class GPIOhelper:

    def blink(self,pin):
		time = 0.5
		message = pin + ":on"
		
		pin = int(pin)
		if pin == 1:
			pin = 21
		if pin == 2:
			pin = 21
		if pin == 3:
			pin = 21
		if pin == 4:
			pin = 21

		if pin in [21,11111,1112,1113]:
			GPIO.setwarnings(False)
			GPIO.setmode(GPIO.BCM)
			GPIO.setup(int(pin), GPIO.OUT, initial=GPIO.HIGH)
			sleep(float(time));
			GPIO.output(int(pin), 0)
		else:
		  message = "pin not found"

		GPIO.cleanup()
		return message

    def switchOn(self,pin):
		pin = int(pin)
		if pin == 1:
			pin = 21
		if pin == 2:
			pin = 21
		if pin == 3:
			pin = 21
		if pin == 4:
			pin = 21

		if pin in [21,11111,1112,1113]:
			GPIO.setwarnings(False)
			GPIO.setmode(GPIO.BCM)
			GPIO.setup(int(pin), GPIO.OUT, initial=GPIO.HIGH)
		else:
		  message = "pin not found"

		GPIO.cleanup()
		return message

    def switchOff(self,pin):
		pin = int(pin)
		if pin == 1:
			pin = 21
		if pin == 2:
			pin = 21
		if pin == 3:
			pin = 21
		if pin == 4:
			pin = 21

		if pin in [21,11111,1112,1113]:
			GPIO.setwarnings(False)
			GPIO.setmode(GPIO.BCM)
			GPIO.setup(int(pin), GPIO.OUT, initial=GPIO.LOW)
		else:
		  message = "pin not found"

		GPIO.cleanup()
		return message

    def switchAllOff(self):
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(21, GPIO.OUT, initial=GPIO.LOW)
        #GPIO.setup(21, GPIO.OUT, initial=GPIO.LOW)
        #GPIO.setup(21, GPIO.OUT, initial=GPIO.LOW)
        #GPIO.setup(21, GPIO.OUT, initial=GPIO.LOW)

		GPIO.cleanup()
		return message

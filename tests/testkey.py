import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(13, GPIO.IN, pull_up_down=GPIO.PUD_UP)

while True:
  if (GPIO.input(13) == False):
    print("Button Pressed")

GPIO.cleanup()

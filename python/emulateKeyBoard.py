import RPi.GPIO as GPIO
import time
from evdev import UInput, ecodes as e

GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(21, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(12, GPIO.IN, pull_up_down = GPIO.PUD_UP)

ui = UInput()

def button23(channel):
    ui.write(e.EV_KEY, e.KEY_SPACE ,1)
    ui.write(e.EV_KEY, e.KEY_SPACE ,0)
    ui.syn()

def button21(channel):
    ui.write(e.EV_KEY, e.KEY_S ,1)
    ui.write(e.EV_KEY, e.KEY_S ,0)
    ui.syn()

def button12(channel):
    ui.write(e.EV_KEY, e.KEY_R ,1)
    ui.write(e.EV_KEY, e.KEY_R ,0)
    ui.syn()

GPIO.add_event_detect(23, GPIO.FALLING, callback = button23, bouncetime = 500)
GPIO.add_event_detect(21, GPIO.FALLING, callback = button21, bouncetime = 500)
GPIO.add_event_detect(12, GPIO.FALLING, callback = button12, bouncetime = 500)

while 1:  
    time.sleep(1)  

import RPi.GPIO as GPIO
import time
from evdev import UInput, ecodes as e

GPIO.setmode(GPIO.BCM)
GPIO.setup(5, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(6, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(13, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(26, GPIO.IN, pull_up_down = GPIO.PUD_UP)

ui = UInput()

def button5(channel):
    ui.write(e.EV_KEY, e.KEY_S ,1)
    ui.write(e.EV_KEY, e.KEY_S ,0)
    ui.syn()

def button6(channel):
    ui.write(e.EV_KEY, e.KEY_F ,1)
    ui.write(e.EV_KEY, e.KEY_F ,0)
    ui.syn()

def button13(channel):
    ui.write(e.EV_KEY, e.KEY_SPACE ,1)
    ui.write(e.EV_KEY, e.KEY_SPACE ,0)
    ui.syn()

def button26(channel):
    ui.write(e.EV_KEY, e.KEY_R ,1)
    ui.write(e.EV_KEY, e.KEY_R ,0)
    ui.syn()

GPIO.add_event_detect(5, GPIO.FALLING, callback = button5, bouncetime = 500)
GPIO.add_event_detect(6, GPIO.FALLING, callback = button6, bouncetime = 500)
GPIO.add_event_detect(13, GPIO.FALLING, callback = button13, bouncetime = 500)
GPIO.add_event_detect(26, GPIO.FALLING, callback = button26, bouncetime = 500)

while 1:  
    time.sleep(1)  

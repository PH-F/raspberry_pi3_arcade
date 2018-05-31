import RPi.GPIO as GPIO
import time
from evdev import UInput, ecodes as e

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(17, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(22, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(13, GPIO.IN, pull_up_down = GPIO.PUD_UP)

ui = UInput()

def button18(channel):
    ui.write(e.EV_KEY, e.KEY_LEFT ,1)
    ui.write(e.EV_KEY, e.KEY_LEFT ,0)
    ui.syn()

def button17(channel):
    ui.write(e.EV_KEY, e.KEY_DOWN ,1)
    ui.write(e.EV_KEY, e.KEY_DOWN ,0)
    ui.syn()

def button22(channel):
    ui.write(e.EV_KEY, e.KEY_UP ,1)
    ui.write(e.EV_KEY, e.KEY_UP ,0)
    ui.syn()

def button13(channel):
    ui.write(e.EV_KEY, e.KEY_P ,1)
    ui.write(e.EV_KEY, e.KEY_P ,0)
    ui.syn()

GPIO.add_event_detect(18, GPIO.FALLING, callback = button18, bouncetime = 500)   
GPIO.add_event_detect(17, GPIO.FALLING, callback = button17, bouncetime = 500)   
GPIO.add_event_detect(22, GPIO.FALLING, callback = button22, bouncetime = 500)   
GPIO.add_event_detect(13, GPIO.FALLING, callback = button13, bouncetime = 500)   

while 1:  
    time.sleep(1)  

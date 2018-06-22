import RPi.GPIO as GPIO
import time
from evdev import UInput, ecodes as e

GPIO.setmode(GPIO.BCM)
GPIO.setup(5, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(6, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(13, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(19, GPIO.IN, pull_up_down = GPIO.PUD_UP)

GPIO.setup(16, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(20, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(21, GPIO.IN, pull_up_down = GPIO.PUD_UP)

ui = UInput()

def button5(channel):
    ui.write(e.EV_KEY, e.KEY_Q ,1)
    ui.write(e.EV_KEY, e.KEY_Q ,0)
    ui.syn()

def button6(channel):
    ui.write(e.EV_KEY, e.KEY_W ,1)
    ui.write(e.EV_KEY, e.KEY_W ,0)
    ui.syn()

def button13(channel):
    ui.write(e.EV_KEY, e.KEY_E ,1)
    ui.write(e.EV_KEY, e.KEY_E ,0)
    ui.syn()

def button19(channel):
    ui.write(e.EV_KEY, e.KEY_R ,1)
    ui.write(e.EV_KEY, e.KEY_R ,0)
    ui.syn()

def button16(channel):
    ui.write(e.EV_KEY, e.KEY_1 ,1)
    ui.write(e.EV_KEY, e.KEY_1 ,0)
    ui.syn()

def button20(channel):
    ui.write(e.EV_KEY, e.KEY_2 ,1)
    ui.write(e.EV_KEY, e.KEY_2 ,0)
    ui.syn()

def button21(channel):
    ui.write(e.EV_KEY, e.KEY_3 ,1)
    ui.write(e.EV_KEY, e.KEY_3 ,0)
    ui.syn()

GPIO.add_event_detect(5, GPIO.FALLING, callback = button5, bouncetime = 500)   
GPIO.add_event_detect(6, GPIO.FALLING, callback = button6, bouncetime = 500)   
GPIO.add_event_detect(13, GPIO.FALLING, callback = button13, bouncetime = 500)   
GPIO.add_event_detect(19, GPIO.FALLING, callback = button19, bouncetime = 500)   

GPIO.add_event_detect(16, GPIO.FALLING, callback = button16, bouncetime = 500)   
GPIO.add_event_detect(20, GPIO.FALLING, callback = button20, bouncetime = 500)   
GPIO.add_event_detect(21, GPIO.FALLING, callback = button21, bouncetime = 500)   

while 1:  
    time.sleep(1)  

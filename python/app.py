from flask import Flask, request, render_template
from datetime import datetime
import gpio

app = Flask(__name__)
@app.route("/")
def main():
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('index.html')

@app.route("/run")
def quiz():
    f = open("logfile.txt", "a")
    f.write('Start game %s\n' %datetime.now())
    f.close()
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('run.html')

@app.route('/result')
def quizResult():
    f = open("logfile.txt", "a")
    f.write('Finish game %s\n' %datetime.now())
    f.close()
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('result.html')

@app.route('/blink/<pin>',methods=['POST'])
def blink(pin):
    led = gpio.GPIOhelper()
    return led.blink(pin)

@app.route('/switchOn/<pin>',methods=['POST'])
def switchOn(pin):
    led = gpio.GPIOhelper()
    return led.switchOn(pin)

@app.route('/switchOff/<pin>',methods=['POST'])
def switchOff(pin):
    led = gpio.GPIOhelper()
    return led.switchOff(pin)

@app.route('/animation1',methods=['POST'])
def animation1():
    led = gpio.GPIOhelper()
    return led.animation1()

if __name__ == "__main__":
    app.run()



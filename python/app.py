from flask import Flask, request, render_template
from datetime import datetime
import gpio

app = Flask(__name__)
@app.route("/")
def main():
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('index.html')

@app.route("/game/<code1>/<code2>/<code3>",methods=['GET'])
def run(code1m code2, code3):
    f = open("logfile.txt", "a")
    f.write('\nDate %s Code' %datetime.now())
    f.write('%s' %code1)
    f.write('%s' %code2)
    f.write('%s' %code3)
    f.close()

    swapped = 0
    ok = 0

    if (not code1 == 1 and (code2 == 1 or code3 == 1)):
      swapped+=1
    if (not code2 == 2 and (code1 == 2 or code3 == 2)):
      swapped+=1
    if (not code3 == 4 and (code1 == 4 or code2 == 4)):
      swapped+=1

    if (code1 == 1):
      ok+=1
    if (code2 == 2):
      ok+=1
    if (code3 == 4):
      ok+=1

    led = gpio.GPIOhelper()
    led.reset()
    return render_template('run.html', ok=int(ok), swapped=int(swapped))

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



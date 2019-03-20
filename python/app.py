from flask import Flask, request, render_template
import gpio

app = Flask(__name__)
@app.route("/")
def main():
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('index.html')

@app.route("/quiz")
def quiz():
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('quiz_start.html')

@app.route("/quiz_run")
def quizRun():
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('quiz_run.html')

@app.route('/quiz_result/<result>')
def quizResult(result):
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('quiz_result.html', score=int(result))

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



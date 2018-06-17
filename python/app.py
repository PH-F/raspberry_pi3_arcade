from flask import Flask, request, render_template
import gpio

app = Flask(__name__)
@app.route("/")
def main():
    return render_template('index.html')

@app.route("/movie")
def movie():
    #led = gpio.GPIOhelper()
    #led.reset()
    return render_template('movie.html')

@app.route("/game")
def game():
    #led = gpio.GPIOhelper()
    #led.reset()
    return render_template('game_start.html')

@app.route("/game_run")
def gameRun():
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('game_run.html')

@app.route("/game_result/<result>")
def gameResult():
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('game_result.html', result=result)

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

@app.route("/quiz_result/<result>")
def quizResult():
    led = gpio.GPIOhelper()
    led.reset()
    return render_template('quiz_result.html', result=result)

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



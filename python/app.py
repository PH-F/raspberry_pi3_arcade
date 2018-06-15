from flask import Flask, request, render_template
import gpio

app = Flask(__name__)
@app.route("/")
def main():
    return render_template('index.html')

@app.route("/movie")
def movie():
    #led = gpio.GPIOhelper()
    #led.switchAllOff()
    return render_template('movie.html')

@app.route("/game")
def game():
    #led = gpio.GPIOhelper()
    #led.switchAllOff()
    return render_template('game_start.html')

@app.route("/game_run")
def gameRun():
    #led = gpio.GPIOhelper()
    #led.switchAllOff()
    return render_template('game_run.html')

@app.route("/quiz")
def quiz():
    #led = gpio.GPIOhelper()
    #led.switchAllOff()
    return render_template('quiz.html')

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

if __name__ == "__main__":
    app.run()



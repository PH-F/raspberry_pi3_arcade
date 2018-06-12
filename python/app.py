from flask import Flask, request, render_template
import gpio

app = Flask(__name__)
@app.route("/")
def main():
    return render_template('index.html')

@app.route("/movie")
def movie():
    return render_template('movie.html')

@app.route("/game")
def game():
    return render_template('game.html')

@app.route("/quiz")
def quiz():
    return render_template('quiz.html')

@app.route('/switchOn/<pin>',methods=['POST'])
def switchOn(pin):
    led = gpio.GPIOhelper()
    return led.switchOn(pin)

if __name__ == "__main__":
    app.run()



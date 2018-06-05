from flask import Flask, request, render_template
import gpio

app = Flask(__name__)
@app.route("/")
def main():
    return render_template('game.html')

@app.route('/switchOn/<pin>',methods=['POST'])
def switchOn(pin):
    led = gpio.GPIO()
    return led.switchOn(pin)

if __name__ == "__main__":
    app.run()



from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/sender/sign-up')
def signUp():
    return render_template("signUp.html")

 
if __name__ == '__main__':
    print("uruchamiamy")
    app.run()
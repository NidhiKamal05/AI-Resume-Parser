from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def index():
	# Renders the index.html file inside the templates folder
	return render_template('index.html')

@app.route('/analyze')
def parse_resume():
	# Renders the index.html file inside the templates folder
	return render_template('parse.html')

if __name__ == '__main__':
	app.run(debug = False)  # Ensures debug is False for production

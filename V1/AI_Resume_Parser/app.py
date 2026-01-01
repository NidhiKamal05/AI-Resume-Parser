from flask import Flask, render_template, url_for

app = Flask(_name_)

@app.route('/')
def index():
	# Renders the index.html file inside the templates folder
	return render_template('index.html')

if _name_ == '__main__':
	app.run(debug = False)  # Ensures debug is False for production
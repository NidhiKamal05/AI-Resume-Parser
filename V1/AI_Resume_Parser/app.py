from flask import Flask, render_template, url_for, jsonify

app = Flask(__name__)

@app.route('/')
def index():
	# Renders the index.html file inside the templates folder
	return render_template('index.html')

@app.route('/analyze')
def parse_resume():
	# Renders the index.html file inside the templates folder
	return render_template('parse.html')

@app.route('/api/read')
def read_pdf():
	raw_text = "Read Successfully...."
	return jsonify({'raw_text': raw_text})

@app.route('/api/analyze')
def analyze_resume():
	missing_skills = ["C++", "Machine Learning"]
	matched_skills = ["JavaScript", "Python"]
	score = 50
	result = {'Missing Skills': missing_skills, 'Matched Skills': matched_skills, 'Score': score}
	return jsonify({'result': result})

if __name__ == '__main__':
	app.run(debug = False)  # Ensures debug is False for production

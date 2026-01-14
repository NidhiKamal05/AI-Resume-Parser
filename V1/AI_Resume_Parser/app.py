from flask import Flask, render_template, url_for, jsonify, request
from models import parser


app = Flask(__name__)

@app.route('/')
def index():
	# Renders the index.html file inside the templates folder
	return render_template('index.html')

@app.route('/analyze')
def parse_resume():
	# Renders the index.html file inside the templates folder
	return render_template('parse.html')


@app.route('/api/read', methods=['POST'])
def read_pdf():
	if 'my_pdf' not in request.files:
		return jsonify({'error': 'No file uploaded'}), 400
	my_pdf = request.files['my_pdf']	
	try:
		raw_text = parser.extract_text_from_pdf(my_pdf)
		# raw_text =parser.read_resume("Read Successfully....")
		# raw_text = "Read Successfully...."
		return jsonify({'raw_text': raw_text})
	except Exception as e:
		return jsonify({'error' : str(e)}),500


@app.route('/api/contact', methods=['POST'])
def contact_info():
	if 'my_pdf' not in request.files:
		return jsonify({'error': 'No file uploaded'}), 400
	my_pdf = request.files['my_pdf']
	try:
		raw_text = parser.extract_text_from_pdf(my_pdf)
		contact = parser.extract_contact_info(raw_text)
		return jsonify({'contact': contact})
	except Exception as e:
		return jsonify({'error': str(e)}), 500


@app.route('/api/entities', methods=['POST'])
def resume_entities():
	if 'my_pdf' not in request.files:
		return jsonify({'error': 'No file uploaded'}), 400
	my_pdf = request.files['my_pdf']
	try:
		raw_text = parser.extract_text_from_pdf(my_pdf)
		entities = parser.extract_entities(raw_text)
		return jsonify({'entities': entities})
	except Exception as e:
		return jsonify({'error': str(e)}), 500


@app.route('/api/skills', methods=['POST'])
def find_skills():
	if 'my_pdf' not in request.files:
		return jsonify({'error': 'No file uploaded'}), 400
	my_pdf = request.files['my_pdf']
	try:
		raw_text = parser.extract_text_from_pdf(my_pdf)
		skills = parser.extract_skills(raw_text)
		return jsonify({'skills': skills})
	except Exception as e:
		return jsonify({'error': str(e)}), 500


@app.route('/api/jd_skills', methods=['POST'])
def find_jd_skills():
	job_desc = request.form.get('job_desc', "").strip()
	if not job_desc:
		return jsonify({'error': 'No job description provided'}), 400
	try:
		jd_skills = parser.extract_skills(job_desc)
		return jsonify({'jd_skills': jd_skills})
	except Exception as e:
		return jsonify({'error': str(e)}), 500


@app.route('/api/score', methods=['POST'])
def calc_score():
	if 'my_pdf' not in request.files:
		return jsonify({'error': 'No file uploaded'}), 400
	my_pdf = request.files['my_pdf']
	job_desc = request.form.get('job_desc', "").strip()
	if not job_desc:
		return jsonify({'error': 'No job description provided'}), 400
	try:
		raw_text = parser.extract_text_from_pdf(my_pdf)
		score = parser.calculate_match_score(raw_text, job_desc)
		return jsonify({'score': score})
	except Exception as e:
		return jsonify({'error': str(e)}), 500


@app.route('/api/analyze', methods=['POST'])
def analyze_resume():
	if 'my_pdf' not in request.files:
		return jsonify({'error': 'No file uploaded'}), 400
	my_pdf = request.files['my_pdf']
	jd = request.form.get('job_desc')
	try:
		missing_skills = ["C++", "Machine Learning"]
		matched_skills = ["JavaScript", "Python"]
		score = 50
		# result = {'Missing_Skills': missing_skills, 'Matched_Skills': matched_skills, 'Score': score}
		# return jsonify({'result': result})
		return jsonify({ 'Missing_Skills': missing_skills, 'Matched_Skills': matched_skills, 'Score': score })
	except Exception as e:
		return jsonify({'error' : str(e)}),500
	

if __name__ == '__main__':
	app.run(debug = False)  # Ensures debug is False for production

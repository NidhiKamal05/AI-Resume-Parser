# AI Resume Parser

AI Resume Parser is a web-based application that parses resumes (Text PDF format) and compares them with a given Job Description (text format).  
It extracts important details from the resume, matches skills with the job description, finds missing skills, calculates a matching score in percentage, and finally decides whether the candidate is eligible for the job or not.

---

## Features

- Upload resume in **PDF or Text format**
- Enter **Job Description** in text format  
- Parses resume content  
- Extracts **skills** from resume  
- Extracts **skills** from job description  
- Extracts **contact details** from resume:
  - Email  
  - Contact number  
  - GitHub profile link  
  - LinkedIn profile link  
- Extracts **entities** from resume:
  - Name  
- Finds **skill gaps** between resume and job description  
- Calculates **matching score (%)**  
- Analyzes and displays whether the **candidate is eligible or not**  
- Simple and responsive UI  
- No database used  

---

## Tech Stack

### Frontend
- HTML  
- Bootstrap  
- JavaScript  

### Backend
- Python  
- Flask  
- Model (`parser.py`) for resume parsing  

---

## Project Structure

AI-Resume-Parser
- V1
	- AI_Resume_Parser
		- models
			- parser.py
		- static
			- css
				- style.css
			- js
				- main.js
				- global.js
		- templates
			- index.html
		- app.py
		- requirement.txt
		
### Important Note

- The main project files are located inside:
- **`AI-Resume-Parser/V1/AI_Resume_Parser`**

- Make sure to navigate to this directory before installing dependencies and running the application.

---

## Deployment on Render

You can deploy this project on Render by pulling the main project folder from the repository.

### Steps

1. Clone the repository

2. Push the project to GitHub

3. Go to https://render.com and create a new **Web Service**.

4. Connect the GitHub repository.

5. Set the **Root Directory** to:
	*V1/AI_Resume_Parser*
	
6. Set the **Build Command**:
	*pip install -r reqirement.txt*
	
7. Set the **Start Command**:
	*python app.py*
	
8. Choose python environment and deploy.

Once deployed, Render will pull this folder from the repo and run the project.

---

## Working of the System

1. User uploads resume (PDF)
2. User enters Job Description (text)
3. Backend parses resume using model (parser.py)
4. Skills are extracted from resume and job description
5. Entities(like Name) are extracted from resume
6. Skill gaps are identified
7. Matching percentage is calculated
8. Final result shows whether the candidate is eligible or not

---

## Limitations

- Cannot read scanned images or image-based text (no OCR support)
- Biased towards English name; support for Indian names can be added in later versions
- Currently does not consider experience in the matching/comparison logic
- No security features at the moment (authentication and rate limiting can be added later)
- No database used

---

## Future Scope

- Add OCR support for scanned/image-based resumes
- Improve name entity recognition for Indian names
- Include experience-based weighting in matching logic
- Add authentication, authorization, and rate limiting
- Add databse for storing resumes and results
- Support DOCX resumes
- Resume ranking for multiple candidates
- Export result as PDF

---

## Author

Nidhi Kamal
GitHub: https://github.com/NidhiKamal05
LinkedIn: https://linkedin.com/in/nidhikamal05
Leetcode: https://leetcode.com/u/Nidhi_Kamal
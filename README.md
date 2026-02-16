# 🤖 AI Resume Parser

AI Resume Parser is a web-based application that parses resumes (Text PDF format) and compares them with a given Job Description (text format).  
It extracts important details from the resume, matches skills with the job description, finds missing skills, calculates a matching score in percentage, and finally decides whether the candidate is eligible for the job or not.

---

## 📌 Features

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

## 🛠️ Tech Stack

### Frontend
- HTML  
- Bootstrap  
- JavaScript  

### Backend
- Python  
- Flask  
- Model (`parser.py`) for resume parsing  

---
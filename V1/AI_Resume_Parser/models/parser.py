import fitz
import spacy
import re

from spacy.matcher import PhraseMatcher
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


nlp = spacy.load("en_core_web_sm")


def read_resume(text):
    return text



def extract_text_from_pdf(pdf_file):
    """
    PDF text reader
    """
    #return pdf_file.name
    try:
        # doc = fitz.open(pdf_file.name)
        # doc = fitz.open(stream=pdf_file.stream.read(), filetype="pdf")

        pdf_bytes = pdf_file.read()
        
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")

        text = ""

        for page in doc:
            text += page.get_text()

        doc.close()

        cleaned_text = " ".join(text.split())

        if not cleaned_text.strip():
            return "Error: No text found, either it's not in pdf form or it's scanned image"

        return cleaned_text

    except Exception as e:
        return f"Error occurred: {str(e)}"



def extract_contact_info(text):
    """
    Find specific contact details using Regex patterns
    """

    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails = re.findall(email_pattern, text)

    phone_pattern = r'[6-9]\d{9}'
    phones = re.findall(phone_pattern, text)

    linkedin = re.findall(r'linkedin\.com/in/[\w.-]+', text)

    github = re.findall(r'github\.com/[\w.-]+', text)

    return {
        "Emails": emails[0] if emails else "Email Not Found",
        "Phones": phones[0] if phones else "Phone Not Found",
        "LinkedIn": linkedin[0] if linkedin else "Link Not Found",
        "Github": github[0] if github else "Link Not Found"
    }



def extract_entities(text):
    """
    Identify Names and Organizations using spaCy
    """

    doc = nlp(text)
    entities = {
        "Name": [],
        "Organizations": []
    }

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            entities["Name"].append(ent.text)
        elif ent.label_ == "ORG":
            entities["Organizations"].append(ent.text)

    primary_name = entities["Name"][0] if entities["Name"] else "Not Identified"

    return {
        "Candidate_Name": primary_name,
        "All_Names_Found": list(set(entities["Name"])),
        "Companies/Institutions": list(set(entities["Organizations"]))
    }



def extract_skills(text):
    # nlp = spacy.load("en_core_web_sm")
    matcher = PhraseMatcher(nlp.vocab, attr = "LOWER")

    # Skill categories
    # skills_db = {
    #     "Programming": ["Python", "Java", "C++", "JavaScript", "SQL", "GO", "Rust"],
    #     "Machine Learning": ["PyTorch", "TensorFlow", "Scikit-learn", "NLP", "Computer Vision"],
    #     "Cloud": ["AWS", "Azure", "Docker", "Kubernetes", "GCP"],
    #     "Tools": ["Git", "Jira", "Excel", "Tableau"]
    # }

    skills_db = {
        "Programming": ["Python", "Java", "C++", "C", "JavaScript", "SQL", "Go", "Rust", "R", "PHP"],
        "Web Development": ["HTML", "CSS", "React", "Angular", "Node.js", "Django", "Flask", "Spring Boot"],
        "Database & Storage": ["MySQL", "PostgreSQL", "MongoDB", "Oracle", "Redis", "Firebase"],
        "Operating Systems & Networking": ["Linux", "Unix", "Windows Server", "Computer Networks", "TCP/IP", "Network Security"],
        "AI & Machine Learning": ["PyTorch", "TensorFlow", "Scikit-learn", "Keras", "NLP", "Computer Vision", "Reinforcement Learning"],
        "Data Science & Analytics": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Tableau", "Excel", "Big Data (Hadoop, Spark)"],
        "Cloud & DevOps": ["AWS", "Azure", "Google Cloud Platform", "Docker", "Kubernetes", "CI/CD", "Terraform", "Jenkins"],
        "Cybersecurity": ["Cryptography", "Ethical Hacking", "Penetration Testing", "Firewalls", "SIEM Tools", "Security Auditing"],
        "Software Engineering Concepts": ["OOP", "Design Patterns", "Agile", "Scrum", "Version Control (Git)", "Testing & QA"],
        "Tools": ["Git", "Jira", "Confluence", "VS Code", "IntelliJ IDEA", "Eclipse", "MATLAB"]
    }

    # Add petterns to matcher
    for category, skill_list in skills_db.items():
        patterns = [nlp.make_doc(skill) for skill in skill_list]
        matcher.add(category, patterns)
    
    doc = nlp(text)
    matches = matcher(doc)

    # Extraction of found skills
    found_skills = {}
    for match_id, start, end in matches:
        category = nlp.vocab.strings[match_id]
        skill = doc[start:end].text

        if category not in found_skills:
            found_skills[category] = set()
        
        found_skills[category].add(skill)
    
    # Conversion from sets to list for JSON output
    return {k: list(v) for k, v in found_skills.items()}



# def calculate_match_score(resume_text, job_description):
#     """
#     Similarity score between a resume and a JD
#     """

#     resume_skills_dict = extract_skills(resume_text)
#     jd_skills_dict = extract_skills(job_description)

#     resume_skills = ", ".join(set(sum(resume_skills_dict.values(), [])))
#     jd_skills = ", ".join(set(sum(jd_skills_dict.values(), [])))
    
#     text_list = [resume_skills, jd_skills]

#     # Initialize Vectorizer
#     vectorizer = TfidfVectorizer(stop_words='english')

#     # Transform text into a matrix of numbers(vectors)
#     tfidf_matrix = vectorizer.fit_transform(text_list)

#     # Calculate similarity
#     similarity_matrix = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])

#     # Score as a percentage
#     match_score = round(similarity_matrix[0][0] * 100, 2)

#     return match_score



def calculate_match_score(resume_skills_dict, jd_skills_dict):
    """
    Similarity score between a resume and a JD
    """

    resume_skills = ", ".join(set(sum(resume_skills_dict.values(), [])))
    jd_skills = ", ".join(set(sum(jd_skills_dict.values(), [])))
    
    text_list = [resume_skills, jd_skills]

    # Initialize Vectorizer
    vectorizer = TfidfVectorizer(stop_words='english')

    # Transform text into a matrix of numbers(vectors)
    tfidf_matrix = vectorizer.fit_transform(text_list)

    # Calculate similarity
    similarity_matrix = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])

    # Score as a percentage
    match_score = round(similarity_matrix[0][0] * 100, 2)

    return match_score



# def  analyze_skill_gap(resume_text, jd_text):
def  analyze_skill_gap(resume_skills_dict, jd_skills_dict):
    """
    Identifies which required skills are missing from the resume.
    """

    # resume_skills_dict = extract_skills(resume_text)
    # jd_skills_dict = extract_skills(jd_text)

    # Flatten both dictionaries into simple lists/sets of skills
    resume_skills_set = set([skill.lower() for sublist in resume_skills_dict.values() for skill in sublist])
    jd_skills_set = set([skill.lower() for sublist in jd_skills_dict.values() for skill in sublist])

    matched = jd_skills_set.intersection(resume_skills_set)
    missing = jd_skills_set.difference(resume_skills_set)

    return {
        "Matched Skills": list(matched),
        "Missing Skills": list(missing),
        "Skill Coverage": f"{len(matched)} / {len(jd_skills_set)}" if jd_skills_set else "N/A"
    }



def final_resume_analyzer(pdf_file, job_desc):
    # Pipeline Execution
    raw_text = extract_text_from_pdf(pdf_file)
    contacts = extract_contact_info(raw_text)
    entities = extract_entities(raw_text)
    resume_skills = extract_skills(raw_text)
    jd_skills = extract_skills(job_desc)

    # Logic layer
    score = calculate_match_score(resume_skills, jd_skills)
    gap_analysis = analyze_skill_gap(resume_skills, jd_skills)

    # Decision logic
    status = "Shortlist" if score > 70 else "Review" if score > 40 else "Reject"

    return {
        "Candidate Profile": {
            "Name": entities["Candidate_Name"],
            "Contact" : contacts,
            "Top Skills": resume_skills
        },
        "ATS Analysis": {
            "Match Score": f"{score}%",
            "Recommendation": status,
            "Missing Keywords": gap_analysis["Missing Skills"]
        }
    }
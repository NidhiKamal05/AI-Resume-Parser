import fitz
import spacy
import re

from spacy.matcher import PhraseMatcher


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
    nlp = spacy.load("en_core_web_sm")
    matcher = PhraseMatcher(nlp.vocab, attr = "LOWER")

    # Skill categories
    # skills_db = {
        # "Programming": ["Python", "Java", "C++", "JavaScript", "SQL", "GO", "Rust"],
        # "Machine Learning": ["PyTorch", "TensorFlow", "Scikit-learn", "NLP", "Computer Vision"],
        # "Cloud": ["AWS", "Azure", "Docker", "Kubernetes", "GCP"],
        # "Tools": ["Git", "Jira", "Excel", "Tableau"]
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
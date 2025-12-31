import streamlit as st
import json
import fitz # PyMuPDF
import spacy
import re
import os
# import nltk
# from nltk.corpus import stopwords
from spacy.matcher import PhraseMatcher
from spacy.tokens import Span

# Ensure NLTK data is downloaded for clean_resume_text
# These were already downloaded in the notebook, but good to ensure for a standalone app
# try:
#     nltk.data.find('corpora/stopwords')
# except nltk.downloader.DownloadError:
#     nltk.download('stopwords')
# try:
#     nltk.data.find('tokenizers/punkt')
# except nltk.downloader.DownloadError:
#     nltk.download('punkt')

@st.cache_resource
def get_nlp():
    try:
        return spacy.load("en_core_web_sm")
    except:
        # Fallback to download if not found, though it should be already from setup
        os.system("python -m spacy download en_core_web_sm")
        return spacy.load("en_core_web_sm")

nlp = get_nlp()

def extract_text_from_pdf(pdf_file):
    """
    PDF text Reader
    """
    try:
        doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        cleaned_text = " ".join(text.split())
        if not cleaned_text.strip():
            return "Error occurred: Either the PDF is empty or it is an image."
        return cleaned_text
    except Exception as e:
        return f"Error Occurred: {str(e)}"

def extract_contact_info(text):
    """
    Use Regex patterns to find specific contact details.
    """
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails = re.findall(email_pattern, text)

    phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    indian_phone_pattern = r'[6-9]\d{9}'
    phones = re.findall(phone_pattern, text)
    indian_phones = re.findall(indian_phone_pattern, text)

    linkedin = re.findall(r'linkedin\.com/in/[\w.-]+', text)
    github = re.findall(r'github\.com/[\w.-]+', text)

    # Prioritize Indian phone if found, otherwise use general phone
    final_phone = indian_phones[0] if indian_phones else (phones[0] if phones else "Not Found")

    return {
        "Emails": emails[0] if emails else "Not Found",
        "Phones": final_phone,
        "LinkedIn": linkedin[0] if linkedin else "Not Found",
        "GitHub": github[0] if github else "Not Found"
    }

# def clean_resume_text(text):
#     text = text.lower()
#     text = re.sub(r'\S+@\S+','',text)
#     text = re.sub(r'http\S+','',text)
#     text = re.sub(r'[^a-zA-Z\s]','',str(text))
#     stop_words = set(stopwords.words('english'))
#     words = nltk.word_tokenize(text)
#     filtered_text = [w for w in words if w not in stop_words]
#     return " ".join(filtered_text)

def extract_entities(text, nlp_model):
    """
    Identify name and organization using spacy
    """
    doc = nlp_model(text)
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
        "Candidate Name": primary_name,
        "All Names Found": list(set(entities["Name"])),
        "Companies/Institutions": list(set(entities["Organizations"]))
    }

def extract_skills(text, nlp_model):
    matcher = PhraseMatcher(nlp_model.vocab, attr = "LOWER")
    skills_db = {
        "Programming" : ["Python", "Java", "C++", "JavaScript", "SQL", "Go", "Rust"],
        "Machine Learning" : ["PyTorch", "TensorFlow", "Scikit-Learn", "NLP", "Computer Vision"],
        "Cloud" : ["AWS", "Azure", "Docker", "Kubernetes", "GCP"],
        "Tools" : ["Git", "Jira", "Excel", "Tableau"], # Added missing comma for Jira
        "Web Technologies": ["HTML", "CSS", "React", "Django", "Bootstrap"]
    }

    for category, skill_list in skills_db.items():
        patterns = [nlp_model.make_doc(skill) for skill in skill_list]
        matcher.add(category, patterns)

    doc = nlp_model(text)
    matches = matcher(doc)

    found_skills = {}
    for match_id, start, end in matches:
        category = nlp_model.vocab.strings[match_id]
        skill = doc[start:end].text

        if category not in found_skills:
            found_skills[category] = set()

        found_skills[category].add(skill)

    return {k: list(v) for k, v in found_skills.items()}

def segment_resume(text):
    sections = [
        "EDUCATION",
        "EXPERIENCE",
        "WORK EXPERIENCE",
        "PROJECTS",
        "SKILLS",
        "CERTIFICATIONS",
        "SUMMARY",
        "ABOUT",
        "CONTACT",
        "AWARDS",
        "PUBLICATIONS"
    ]

    header_pattern =r'(?i)\b(?:'+'|'.join(sections) + r')\b'

    matches = list(re.finditer(header_pattern,text))

    segmented_data = {}

    if not matches:
        return {"Full Text":text}

    for i in range(len(matches)):
        start_idx = matches[i].start()
        header_name = matches[i].group().upper()

        if i+1 < len(matches):
            end_idx = matches[i+1].start()
        else :
            end_idx = len(text)

        content = text[start_idx:end_idx].replace(header_name, "").strip()
        segmented_data[header_name] = content

    return segmented_data

def safe_resume_parser(pdf_file, nlp_model):
    try:
        raw_text = extract_text_from_pdf(pdf_file)

        if "Error" in raw_text:
            return {"Status" : "Failed", "Reason" : "Invalid PDF or Image based PDF"}

        contacts = extract_contact_info(raw_text)
        entities = extract_entities(raw_text, nlp_model) # Pass nlp_model
        segments = segment_resume(raw_text)
        skills = extract_skills(raw_text, nlp_model) # Pass nlp_model

        candidate_name = entities.get("Candidate Name", "Not Identified")
        if candidate_name == "Not Identified" and contacts["Emails"] != "Not Found" :
            # Heuristic: capitalize the part before @ as a potential name
            candidate_name = contacts["Emails"].split('@')[0].replace('.', ' ').replace('-', ' ').title()

        return {
            "Status" : "Success",
            "Metadata" : {
                "Filename" : pdf_file.name,
                "Text_Length" : len(raw_text)
            },
            "Extracted_Data" : {
                "Name" : candidate_name,
                "Contact" : contacts,
                "Sections_Detected" : list(segments.keys()),
                "Skills" : skills,
                "Resume_Sections": segments
            }
        }

    except Exception as e :
        return {"Status" : "Critical Error", "Details" : str(e)}


st.set_page_config(page_title="AI Resume Parser", layout="centered")
st.title("AI Resume Parser")
st.write("Upload Resume in PDF format to be parsed by AI.")

uploaded_file = st.file_uploader("Upload Resume (PDF only)", type=["pdf"])

if uploaded_file is not None:
    with st.spinner('Parsing resume...'):
        parsed_data = safe_resume_parser(uploaded_file, nlp)

    if parsed_data["Status"] == "Success":
        st.subheader("Structured Resume Data")
        st.json(parsed_data["Extracted_Data"])

        # Optionally display raw and cleaned text if needed for debugging/demonstration
        # raw_text_display = extract_text_from_pdf(uploaded_file)
        # cleaned_text_display = clean_resume_text(raw_text_display)
        # st.subheader("Raw Text")
        # st.text_area("", raw_text_display, height=200)
        # st.subheader("Cleaned Text")
        # st.text_area("", cleaned_text_display, height=200)
    else:
        st.error(f"Resume parsing failed: {parsed_data['Reason'] if 'Reason' in parsed_data else parsed_data['Details']}")
else:
    st.info("Please upload a PDF file to get started.")

# To run this Streamlit app, save this code as a .py file (e.g., app.py)
# and then run `streamlit run app.py` in your terminal.

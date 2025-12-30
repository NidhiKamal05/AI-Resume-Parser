import streamlit as st
import json
import fitz # PyMuPDF
import spacy
import re
import os

@st.cache_resource
def get_nlp():
    try:
        return spacy.load("en_core_web-sm")
    except:
        os.system("python -m spacy download en_core_web_sm")
        return spacy.load("en_core_web-sm")
        
    
    
nlp = get_nlp()
def extract_text_from_pdf(pdf_file):
  """
  PDF text reader
  """

  try:
    doc = fitz.open(pdf_file.name)

    text = ""
    for page in doc:
      text += page.get_text()

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

def resume_parser(pdf_file):
    raw_text="Test"
    # raw_text = extract_text_from_pdf(pdf_file)
    #contacts = extract_contact_info(raw_text)
    return raw_text
   

st.set_page_config(page_title="AI Resume Parser", layout="centered")
st.title("AI Resume Parser")
st.write("Upload Resume in PDF format to be parsed by AI.")

uploaded_file = st.file_uploader("Upload Resume (PDF only)", type=["pdf"])

if uploaded_file is not None:
    # Assuming resume_parser_v5 is defined in your notebook
    # and expects a file-like object (e.g., in-memory file from Streamlit)
    parsed_data = resume_parser(uploaded_file)
    
    st.subheader("Structured Resume Data")
    st.json(parsed_data)
else:
    st.info("Please upload a PDF file to get started.")

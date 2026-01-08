import fitz
import re

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
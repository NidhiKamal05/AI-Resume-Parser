def read_resume(text):
    return text

def extract_text_from_pdf(pdf_file):
  """
  PDF text reader
  """
  #return pdf_file.name
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
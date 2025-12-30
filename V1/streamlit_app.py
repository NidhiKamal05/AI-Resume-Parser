import streamlit as st
import json

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

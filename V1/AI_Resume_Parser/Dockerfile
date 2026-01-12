# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /AI-Resume-Parser/V1/AI_Resume_Parser

# Install system dependencies required by PyMuPDF
RUN apt-get update && apt-get install -y --no-install-recommends \
    libopenjp2-7 libpng16-16 libtiff5 liblcms2-2 libwebp6 libharfbuzz0b libfreetype6 libjpeg62-turbo \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY AI-Resume-Parser/V1/AI_Resume_Parser/requirements.txt ./requirements.txt
COPY AI-Resume-Parser/V1/AI_Resume_Parser/ .

RUN pip install --no-cache-dir -r requirements.txt

# Download spaCy model
RUN python -m spacy download en_core_web_sm

# Download NLTK data
RUN python -c "import nltk; nltk.download('stopwords'); nltk.download('punkt')"

# Copy the entire project
COPY . .

# Expose the port (Render will override with $PORT)
EXPOSE 8000

# Run the Flask app with Gunicorn, binding to Render's PORT
CMD ["gunicorn", "-b", "0.0.0.0:${PORT}", "app:app"]

# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /AI-Resume-Parser/V1/AI_Resume_Parser

# Install system dependencies required by PyMuPDF
RUN apt-get update && apt-get install -y --no-install-recommends \
    libopenjp2-7 libpng16-16 libtiff5 liblcms2-2 libwebp6 libharfbuzz0b libfreetype6 libjpeg62-turbo \
    && rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Download the spaCy model
RUN python -m spacy download en_core_web_sm

# Download NLTK data (punkt and stopwords are commonly used)
RUN python -c "import nltk; nltk.download('stopwords'); nltk.download('punkt')"

# Copy the Flask application
COPY app.py .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the Flask application with Gunicorn
ENTRYPOINT ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
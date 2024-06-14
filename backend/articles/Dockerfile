FROM python:3.10.13-slim-bullseye
LABEL authors="ivantom"

EXPOSE 8001

# Set Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create a virtual environment
RUN python -m venv /opt/venv

# Activate the virtual environment
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /articles

# Copy requirements
COPY requirements.txt .

# Install requirements
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r requirements.txt

RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy the application

COPY . /articles

# Create the NLTK data directory in the current directory if it doesn't exist
RUN if [ ! -d "nltk_data" ]; then \
        mkdir nltk_data; \
    fi

# Download NLTK resources to the current directory
RUN python -c "import nltk; \
               nltk.data.path.append('nltk_data'); \
               nltk.download('punkt', download_dir='nltk_data'); \
               nltk.download('stopwords', download_dir='nltk_data'); \
               nltk.download('averaged_perceptron_tagger', download_dir='nltk_data'); \
               nltk.download('wordnet', download_dir='nltk_data'); \
               nltk.download('maxent_ne_chunker', download_dir='nltk_data'); \
               nltk.download('vader_lexicon', download_dir='nltk_data'); \
               nltk.download('words', download_dir='nltk_data');"

# Migrate the database
RUN python manage.py makemigrations &&  python manage.py migrate

# Run Django management commands
RUN python manage.py create_categories
RUN python manage.py import_data

# Collect Static 
# RUN python manage.py collectstatic
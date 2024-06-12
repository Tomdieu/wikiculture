#!/bin/bash

# Create a virtual environment
python -m venv env

# Activate the virtual environment
source ./env/bin/activate

# Install requirements
pip install -r requirements.txt

python manage.py create_categories
python manage.py import_data

# Download NLTK data
python -c "import nltk; \
           nltk.download('punkt'); \
           nltk.download('stopwords'); \
           nltk.download('averaged_perceptron_tagger'); \
           nltk.download('wordnet'); \
           nltk.download('maxent_ne_chunker'); \
           nltk.download('vader_lexicon');  \
           nltk.download('words');"

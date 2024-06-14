#!/bin/bash

# Create a virtual environment
python -m venv env

# Activate the virtual environment
source ./env/bin/activate

# Install requirements
pip install -r requirements.txt

python manage.py create_categories
python manage.py import_data

# Create the NLTK data directory in the current directory if it doesn't exist
if [ ! -d "nltk_data" ]; then
    mkdir nltk_data
fi

# Download NLTK resources to the current directory
python -c "import nltk; \
           nltk.data.path.append('nltk_data'); \
           nltk.download('punkt', download_dir='nltk_data'); \
           nltk.download('stopwords', download_dir='nltk_data'); \
           nltk.download('averaged_perceptron_tagger', download_dir='nltk_data'); \
           nltk.download('wordnet', download_dir='nltk_data'); \
           nltk.download('maxent_ne_chunker', download_dir='nltk_data'); \
           nltk.download('vader_lexicon', download_dir='nltk_data'); \
           nltk.download('words', download_dir='nltk_data');"

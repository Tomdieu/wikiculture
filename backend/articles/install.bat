@echo off

rem Create a virtual environment
python -m venv env

rem Activate the virtual environment
call env\Scripts\activate

rem Install requirements
pip install -r requirements.txt

rem Run Django management commands
python manage.py create_categories
python manage.py import_data

python -c "import nltk; \
           nltk.download('punkt'); \
           nltk.download('stopwords'); \
           nltk.download('averaged_perceptron_tagger'); \
           nltk.download('wordnet'); \
           nltk.download('maxent_ne_chunker'); \
           nltk.download('vader_lexicon');  \
           nltk.download('words');"

rem Deactivate the virtual environment
deactivate

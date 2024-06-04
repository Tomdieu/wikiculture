@echo off

REM Activate the virtual environment
call .\env\Scripts\activate

REM Make migrations, apply migrations, and run the Django server
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000

REM Optionally, keep the command window open
pause

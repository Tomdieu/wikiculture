@echo off

REM Activate the virtual environment
call .\env\Scripts\activate

REM Run Django server on port 8001 and consumer concurrently
start cmd /k "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8001"
start cmd /k "python manage.py makemigrations && python manage.py migrate && python consumer.py"

REM Optionally, keep the initial command window open
pause

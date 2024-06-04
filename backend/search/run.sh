@echo off

REM Activate the virtual environment
call .\env\Scripts\activate

REM Run Django server on port 8004 in a new command prompt window
start cmd /k "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8004"

REM Run the consumer script in another new command prompt window
start cmd /k "call .\env\Scripts\activate && python manage.py makemigrations && python manage.py migrate && python consumer.py"

REM Optionally, keep the initial command window open
pause

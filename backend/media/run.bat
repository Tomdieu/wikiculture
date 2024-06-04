@echo off

rem Activate virtual environment and run Django server in a new command prompt window
start cmd /k call env\Scripts\activate && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8003

rem Run consumer script in another new command prompt window
start cmd /k call env\Scripts\activate && python manage.py makemigrations && python manage.py migrate && python consumer.py

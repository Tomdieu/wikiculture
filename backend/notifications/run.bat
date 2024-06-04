@echo off

rem Activate virtual environment and run Django server
start cmd /k call env\Scripts\activate && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8006

rem Run consumer script in a separate command prompt window
start cmd /k call env\Scripts\activate && python manage.py makemigrations && python manage.py migrate && python consumer.py

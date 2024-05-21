#!/bin/bash
# source ./env/bin/activate && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8001 & python consumer.py
source ./env/bin/activate && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8001 & source ./env/bin/activate && python manage.py makemigrations && python manage.py migrate && python consumer.py

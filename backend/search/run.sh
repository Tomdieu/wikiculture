#!/bin/bash
source ./env/bin/activate && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8004 & source ./env/bin/activate && python consumer.py
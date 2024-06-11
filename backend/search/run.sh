#!/bin/bash

# Activate the virtual environment and run Django server in the background
source ./env/bin/activate && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8004 &

# Activate the virtual environment and run the consumer script
source ./env/bin/activate && python manage.py makemigrations && python manage.py migrate && python consumer.py

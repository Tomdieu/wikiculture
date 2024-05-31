#!/bin/bash
source ./env/bin/activate && python manage.py import_data & source ./env/bin/activate && python manage.py create_categories
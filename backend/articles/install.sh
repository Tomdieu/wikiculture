#!/bin/bash

# Create a virtual environment
python -m venv env

# Activate the virtual environment
source ./env/bin/activate

# Install requirements
pip install -r requirements.txt

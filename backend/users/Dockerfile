FROM python:3.10.13-slim-bullseye
LABEL authors="ivantom"

EXPOSE 8000

# Set Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV INSIDE_DOCKER=1

# Create a virtual environment
RUN python -m venv /opt/venv

# Activate the virtual environment
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /users

# Copy requirements
COPY requirements.txt /users/requirements.txt

# Install requirements
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r /users/requirements.txt

RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy the application

COPY . /users

# Migrate the database
RUN python manage.py makemigrations &&  python manage.py migrate

# Collect Static 
# RUN python manage.py collectstatic
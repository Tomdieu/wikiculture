FROM python:3.10.13-slim-bullseye
LABEL authors="ivantom"

EXPOSE 8002

# Set Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create a virtual environment
RUN python -m venv /opt/venv

# Activate the virtual environment
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /media_files

# Copy requirements
COPY requirements.txt .

# Install requirements
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r requirements.txt

RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy the application

COPY . .

# Migrate the database
RUN python manage.py migrate

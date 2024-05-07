# Notification Service

This service is responsible for :

- Sending notifications to users

## Installation

To install the dependencies, run the following command:

- Create an virtual environment

  ```bash
  python3 -m venv env
  ```

- Activate the virtual environment
  
  ```bash
  source ./env/bin/activate
  ```

- Install the dependencies

  ```bash
  pip install -r requirements.txt
  ```

## Prerequisit

Make sure you have a running instance of `RabbitMq` running with :

```python
RABBITMQ_HOST = 'localhost'
RABBITMQ_PORT = 5672
RABBITMQ_USERNAME = 'guest'
RABBITMQ_PASSWORD = 'guest'
```

## Running

To run the service, run the following command:

```bash
python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8006
```

Or

Run with docker

```bash
docker compose up
```

## End points

- **Get All Notifications**
    
    Request :
  - Method : 'GET'
  - Path : 'http://localhost:8006/api/notifications/'
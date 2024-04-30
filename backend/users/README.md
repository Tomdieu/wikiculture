# User service

This is service is responsible for :

- Sign up
- Sign in
- List Users
- Update Users
- Delete Users

## Instalation

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
python manage.py runserver 0.0.0.0:8000
```

Or

Run with docker

```bash
docker compose up
```

## End points

- **Login**

    Request :

  - Method : `POST`
  - Path : `http://localhost:8000/api/login/`
  - Body :

    ```json
    {
        "username":"<username>",
        "password":"<password>"
    }
    ```

  - Response `400` :

    ```json
    {
        "message":"Invalid Credentials",
        "success": false
    }
    ```

  - Response `200` :

    ```json
    {
        "token":"<user_token>",
        "user":{
            "username":...,
            "first_name":...,
            "last_name":...,
            "email":...,
            "date_joined":...,
            "user_type":...,
        },
        "success": true
    }
    ```

- **Register**

  Request :
  - Method : `POST`
  - Path : `http://localhost:8000/api/register/`
  - Body :

    ```json
    {
        "username":"<username>",
        "first_name":"<first_name>",
        "last_name":"<last_name>",
        "email":"<email>",
        "password":"<password>",
        "user_type":"User|Moderator|Admin"
    }
    ```

  Resonse `201`:

  ```json
  {
        "username":"<username>",
        "first_name":"<first_name>",
        "last_name":"<last_name>",
        "email":"<email>",
        "user_type":"User|Moderator|Admin",
        "date_joined":"<date_joined>"
    }
  ```

- **List Users**

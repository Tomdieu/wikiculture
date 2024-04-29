# User service

This is service is responsible for :

- Sign up
- Sign in

## Instalation

To install the dependencies, run the following command:

```bash
pip install -r requirements.txt
```

## Prerequisit

Make sure you have a running instance of RabbitMq running with :

- host: `localhost`
- port : `9200`

## Running

To run the service, run the following command:

```bash
python manage.py runserver 8000 & python consumer.py
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
  - Path : ``

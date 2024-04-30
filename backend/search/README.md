# Search Service

## Description

This service is responsible for searching for some articles in the database base on the query passed in the path parameter of the url.

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

## Running

To run the service, run the following command:

```bash
python manage.py runserver 0.0.0.0:8004 & python consumer.py
```

Or

Run with docker

```sh
docker compose up
```

## Endpoints

### Search

#### Request

- Method: **GET**

- Path: `http://localhost:8004/api/search/<query>/`

- Path Parameters:
  - query: string

- Response

  ```json
  {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": 1,
        "title": "...",
        "content": "...",
        "tags": "...",
        "categories": "...",
        "author": {
          "id": 1,
          "first_name": "...",
          "last_name": "...",
          "username": "..."
        },
        "slug": "..."
      },
    ]
  }
  ```

## Technology

- Python
- Django
- Elastic Search
- Rabbit MQ

## Useful Links

- <https://testdriven.io/blog/django-drf-elasticsearch/>
- <https://tamerlan.dev/how-to-integrate-elasticsearch-with-drf/>
- <https://elasticsearch-dsl.readthedocs.io/en/latest/search_dsl.html#queries>

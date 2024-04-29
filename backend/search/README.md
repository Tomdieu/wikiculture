# Search Service

## Description

This service is responsible for searching for some articles in the database base on the query passed in the path parameter of the url.

## Installation

To install the dependencies, run the following command:

```bash
pip install -r requirements.txt
```

## Running

To run the service, run the following command:

```bash
python manage.py runserver & python consumer.py

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

- Path: `http://localhost:8000/api/search/<query>/`

- Path Parameters:
  - query: string

## Technology

- Python
- Django
- Elastic Search
- Rabbit MQ

## Useful Links

- <https://testdriven.io/blog/django-drf-elasticsearch/>
- <https://tamerlan.dev/how-to-integrate-elasticsearch-with-drf/>
- <https://elasticsearch-dsl.readthedocs.io/en/latest/search_dsl.html#queries>

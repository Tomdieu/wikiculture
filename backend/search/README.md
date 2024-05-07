# Search Service

This service is reponsible for searching

## Requirements

### RabbitMq

RabbitMQ is a robust and flexible message broker that plays a critical role in enabling communication and coordination within distributed systems. Its features and capabilities make it a popular choice for building scalable, resilient, and loosely coupled architectures

```yaml
version: '3.8'

services:

  rabbitmq:
    image: rabbitmq:3.10-management-alpine
    container_name: RabbitMq
    restart: unless-stopped
    environment:
      - RABBITMQ_DEFAULT_USER=guest
      - RABBITMQ_DEFAULT_PASS=guest
    ports:
      # AMQ protocol port
      - "5672:5672"
      # Http Managent UI
      - "15672:15672"
    volumes:
      - ./rabbitmq_data:/var/lib/rabbitmq

    extra_hosts:
      - host.docker.internal:host-gateway

```

### Elastic Search

Elasticsearch is a versatile and scalable tool that is used in a wide range of applications, including search engines, monitoring systems, e-commerce platforms, and more. Its distributed architecture and robust features make it a popular choice for organizations dealing with large volumes of data and complex search requirements.

```yaml
version: '3.8'  # Specify the Docker Compose file version

services:
  elasticsearch:
    image: elasticsearch:7.17.16
    container_name: elasticsearch
    restart: always  # Ensure automatic restarts
    ports:
      - "9200:9200"  # Expose port 9200 for external access
    environment:
      - discovery.type=single-node  # Configure for single-node setup
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"  # Optional: Set JVM memory limits
    volumes:
      - esdata:/usr/share/elasticsearch/data  # Create a volume for persistent data
    networks:
      - bridge
    mem_limit: 1073741824
    ulimits:
      memlock:
        soft: -1
        hard: -1

```

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
python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8004 & python consumer.py
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

import pika
from django.conf import settings
import json
from typing import Any

import logging

logger = logging.getLogger(__name__)

logger.setLevel(logging.INFO)


import pika
from django.conf import settings
import json
from typing import Any

import logging

logger = logging.getLogger(__name__)

logger.setLevel(logging.INFO)


def publish_article_approved(
    event_type: str,
    body: Any,
    exchange_name: str = "moderation",
    exchange_type: str = "direct",
    routing_key: str = "article-approved",
):
    try:
        credentials = pika.PlainCredentials(
            settings.RABBITMQ_USERNAME, settings.RABBITMQ_PASSWORD
        )
        parameters = pika.ConnectionParameters(
            settings.RABBITMQ_HOST, settings.RABBITMQ_PORT, "/", credentials
        )
        connection = pika.BlockingConnection(parameters)

        channel = connection.channel()

        channel.exchange_declare(
            exchange=exchange_name, exchange_type=exchange_type, durable=True
        )

        data: dict = {"event_type": event_type, "body": body}

        properties = pika.BasicProperties(
            content_type="application/json", delivery_mode=2
        )

        body = json.dumps(data, indent=4).encode("utf-8")

        channel.basic_publish(
            exchange=exchange_name,
            routing_key=routing_key,
            body=body,
            properties=properties,
        )
        logger.info("Article approval notification published successfully")
        print(
            "Article approval notification sent to Exchange: {}, Routing Key: {}".format(
                exchange_name, routing_key
            )
        )
        connection.close()

    except Exception as e:
        logger.error(e)
        print("An error occurred while connecting to RabbitMQ: ", e)

import pika
from django.conf import settings
import json
from typing import Any

import logging

logger = logging.getLogger(__name__)

logger.setLevel(logging.INFO)

def publish(event_type: str, body: Any, exchange_name: str = "article", exchange_type: str = "topic",
            routing_key: str = "article.*"):
    try:

        credentials = pika.PlainCredentials(settings.RABBITMQ_USERNAME, settings.RABBITMQ_PASSWORD)
        parameters = pika.ConnectionParameters(settings.RABBITMQ_HOST, settings.RABBITMQ_PORT, '/', credentials)
        connection = pika.BlockingConnection(parameters)

        channel = connection.channel()

        channel.exchange_declare(exchange=exchange_name, exchange_type=exchange_type, durable=True)

        data: dict = {
            'event_type': event_type,
            'body': body
        }

        properties = pika.BasicProperties(content_type=event_type, delivery_mode=2)

        body = json.dumps(data, indent=4).encode('utf-8')

        # Event.objects.create(event_type=event_type, data=body)

        channel.basic_publish(exchange=exchange_name, routing_key=routing_key, body=body, properties=properties)
        logger.info("Event published successfully")
        print("Event {} Sent to Topic Exchange".format(event_type))
        connection.close()


    except Exception as e:

        logger.error(e)
        print("An error occurred while connecting to rabbitmq : ", e)

import pika, os, json
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'moderator.settings')
django.setup()

from django.conf import settings
from api.models import User,Article
from api import events

from logs import logger

# Set the timeout to 3 hours (in seconds)
timeout_seconds = 3 * 60 * 60

credentials = pika.PlainCredentials(settings.RABBITMQ_USERNAME, settings.RABBITMQ_PASSWORD)
parameters = pika.ConnectionParameters(settings.RABBITMQ_HOST, settings.RABBITMQ_PORT, '/',
                                       credentials, socket_timeout=timeout_seconds)

connection = pika.BlockingConnection(parameters)

channel = connection.channel()

queue_name = "moderator_queue"

channel.queue_declare(queue=queue_name, durable=True)

# Declare a topic exchange for the media service

topic_exchange_name = "account"

channel.exchange_declare(exchange=topic_exchange_name, exchange_type='topic', durable=True)

# Bind queue to the topic exchange

channel.queue_bind(exchange=topic_exchange_name, queue=queue_name, routing_key="account.*")


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    logger.info(" [x] Received %r" % body)
    data = json.loads(body)
    event_type = data['event_type']
    body = data['body']

    if event_type == events.USER_CREATED:
        print(" [x] User created event received")
        logger.info(" [x] User created event received")
        print(" [x] Done")
        User.objects.create(user_id=body['id'],user_type=body['user_type'])
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    if event_type == events.ARTICLE_CREATED:
        print(" [x] Article created event received")
        logger.info(" [x] Article created event received")
        print(" [x] Done")
        Article.objects.create(article_id=body['id'])
        ch.basic_ack(delivery_tag=method.delivery_tag)

    print(" [x] Received %r" % data)
    print(" [x] Done")


channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=False)

print(' [*] Waiting for messages. To exit press CTRL+C')

channel.start_consuming()

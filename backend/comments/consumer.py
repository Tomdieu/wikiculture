import pika, os, json
import django
from api import events

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "comments.settings")
django.setup()

from django.conf import settings
from api.models import User,Article

# Set the timeout to 3 hours (in seconds)
timeout_seconds = 3 * 60 * 60

credentials = pika.PlainCredentials(settings.RABBITMQ_USERNAME, settings.RABBITMQ_PASSWORD)
parameters = pika.ConnectionParameters(settings.RABBITMQ_HOST, settings.RABBITMQ_PORT, '/',
                                       credentials, socket_timeout=timeout_seconds)

connection = pika.BlockingConnection(parameters)

channel = connection.channel()

queue_name = "comments_queue"

channel.queue_declare(queue=queue_name, durable=True)

topics_exchange = ['account', 'article']
routing_keys = ['account.*', 'article.*']

topic_routing = list(zip(topics_exchange, routing_keys))

# Declare a topic exchange for the article service

for topic in topics_exchange:
    channel.exchange_declare(exchange=topic, exchange_type="topic", durable=True)

# Bind queue to the topic exchange

for topic, routing in topic_routing:
    channel.queue_bind(exchange=topic, queue=queue_name, routing_key=routing)


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    data = json.loads(body)
    event_type = data['event_type']
    body = data['body']

    if event_type == events.USER_CREATED:
        print(" [x] User created event received")
        print(" [x] Done")
        User.objects.create(**body)
        ch.basic_ack(delivery_tag=method.delivery_tag)
        return

    elif event_type == events.USER_UPDATED:

        print(" [x] User updated event received")
        print(" [x] Done")
        User.objects.filter(id=body['id']).update(**body)
        ch.basic_ack(delivery_tag=method.delivery_tag)
        return

    elif event_type == events.USER_DELETED:

        print(" [x] User deleted event received")
        print(" [x] Done")
        User.objects.filter(id=body['id']).delete()
        ch.basic_ack(delivery_tag=method.delivery_tag)
        return

    # Articles Events

    elif event_type == events.ARTICLE_CREATED:
        print(" [x] Article created event received")
        print(" [x] Done")

        Article

    print(" [x] Received %r" % data)
    print(" [x] Done")


channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=False)

print(' [*] Waiting for messages. To exit press CTRL+C')

channel.start_consuming()

import pika, os, json
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "notifications.settings")
django.setup()

from django.conf import settings
from api.models import User

from api import events

# Set the timeout to 3 hours (in seconds)
timeout_seconds = 3 * 60 * 60

credentials = pika.PlainCredentials(settings.RABBITMQ_USERNAME, settings.RABBITMQ_PASSWORD)
parameters = pika.ConnectionParameters(settings.RABBITMQ_HOST, settings.RABBITMQ_PORT, '/',
                                       credentials, socket_timeout=timeout_seconds)
# credentials = pika.PlainCredentials("guest", "guest")
# parameters = pika.ConnectionParameters("localhost", 5672, "/", credentials)
connection = pika.BlockingConnection(parameters)

channel = connection.channel()

queue_name = "articles_queue"

channel.queue_declare(queue=queue_name, durable=True)

# Declare a topic exchange for the article service

topic_exchange_name = "account"

channel.exchange_declare(exchange=topic_exchange_name, exchange_type='topic', durable=True)

# Bind queue to the topic exchange

channel.queue_bind(exchange=topic_exchange_name, queue=queue_name, routing_key="account.*")


moderation_topic_exchange_name = "moderation"
channel.exchange_declare(exchange=moderation_topic_exchange_name, exchange_type='topic', durable=True)
channel.queue_bind(exchange=moderation_topic_exchange_name, queue=queue_name, routing_key="moderation.*")


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

    print(" [x] Received %r" % data)
    print(" [x] Done")
    # ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=False)

print(' [*] Waiting for messages. To exit press CTRL+C')

channel.start_consuming()

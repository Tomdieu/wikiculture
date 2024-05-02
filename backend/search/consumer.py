import pika,os,json
from api import events
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "search.settings")
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

queue_name = "search_queue"

channel.queue_declare(queue=queue_name,durable=True)

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
        exists = User.objects.filter(id=body['id']).exists()
        if exists:
            ch.basic_ack(delivery_tag=method.delivery_tag)
        else:
            User.objects.create(**body)
            ch.basic_ack(delivery_tag=method.delivery_tag)
        print(" [x] Done")

    elif event_type == events.USER_UPDATED:

        print(" [x] User updated event received")
        User.objects.filter(id=body['id']).update(**body)
        ch.basic_ack(delivery_tag=method.delivery_tag)
        print(" [x] Done")

    elif event_type == events.USER_DELETED:

        print(" [x] User deleted event received")
        User.objects.filter(id=body['id']).delete()
        ch.basic_ack(delivery_tag=method.delivery_tag)
        print(" [x] Done")

    # Articles Events

    elif event_type == events.ARTICLE_CREATED:
        print(" [x] Article created event received")
        
        del body['history']
        del body['updated']
        
        tags = ', '.join(body['tags'])
        categories = ', '.join(body['categories'])
        
        author = body['author']
        author_obj = None
        
        if author is not None:
            
            user = User.objects.filter(id=author['id'])
            
            if not user.exists():
                
                author_obj=User.objects.create(**author)
            author_obj = User.objects.get(id=author['id'])
                
        else:
            author_obj = User.objects.get(id=author['id'])
            
        print("Author : ",author)
        
        body['tags'] = tags
        body['categories'] = categories
        body['author'] = author_obj
        
        print("Body : ",body)
        
        # if author_obj:
        
        Article.objects.create(**body)
    
        print(" [x] Done")
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    elif event_type == events.ARTICLE_UPDATED:
        print(" [x] Article updated event received")

        del body['history']
        del body['updated']
        
        
        tags = ', '.join(body['tags'])
        categories = ', '.join(body['categories'])
        
        author = body['author']
        author_obj = None
        
        if author is not None:
            
            user = User.objects.filter(id=author['id'])
            
            if not user.exists():
                
                author_obj=User.objects.create(**author)
        else:
            author_obj = User.objects.get(id=author['id'])
        
        body['tags'] = tags
        body['categories'] = categories
        body['author'] = author_obj
        
        # if author_obj:
            
        Article.objects.filter(id=body['id']).update(**body)
        ch.basic_ack(delivery_tag=method.delivery_tag)
        print(" [x] Done")
    
    elif event_type == events.ARTICLE_DELETED:
        print(" [x] Article deleted event received")
        Article.objects.filter(id=body['id']).delete()
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    print(" [x] Done")


channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=False)

print(' [*] Waiting for messages. To exit press CTRL+C')

channel.start_consuming()

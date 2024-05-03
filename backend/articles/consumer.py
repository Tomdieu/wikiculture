import pika, os, json
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "articles.settings")
django.setup()

from django.conf import settings
from api.models import Event,User,Article

from api.serializers import ArticleDetailSerializer

from api import events

from logs import logger

# Set the timeout to 3 hours (in seconds)
timeout_seconds = 3 * 60 * 60

credentials = pika.PlainCredentials(settings.RABBITMQ_USERNAME, settings.RABBITMQ_PASSWORD)
print(credentials)
parameters = pika.ConnectionParameters(host=settings.RABBITMQ_HOST,port= settings.RABBITMQ_PORT, virtual_host='/',
                                       credentials=credentials, socket_timeout=timeout_seconds)
print(parameters)
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
channel.queue_bind(exchange=moderation_topic_exchange_name, queue=queue_name, routing_key="moderation.article.*")


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    logger.info(" [x] Received %r" % body)
    data = json.loads(body)
    event_type = data['event_type']
    body = data['body']
    Event.objects.create(event_type=event_type, data=body)

    if event_type == events.USER_CREATED:
        print(" [x] User created event received")
        logger.info("[x] User Created event received body : %r" % body)
        exists = User.objects.filter(id=body['id']).exists()
        if exists:
            ch.basic_ack(delivery_tag=method.delivery_tag)
        else:
            user = User.objects.create(**body)
            logger.info("[x] User Created : %r" % user)
            ch.basic_ack(delivery_tag=method.delivery_tag)
        print(" [x] Done")
        
        

    elif event_type == events.USER_UPDATED:

        print(" [x] User updated event received ")
        logger.info("[x] User updated event received body : %r" % body)
        user = User.objects.filter(id=body['id']).update(**body)
        logger.info("[x] User updated : %r " % user)
        ch.basic_ack(delivery_tag=method.delivery_tag)
        print(" [x] Done")
        
        

    elif event_type == events.USER_DELETED:

        print(" [x] User deleted event received")
        print(" [x] Done")
        User.objects.filter(id=body['id']).delete()
        ch.basic_ack(delivery_tag=method.delivery_tag)
        

    # handles events from the moderator service

    if event_type == events.ARTICLE_APPROVED:

        article = body['article']['article_id']
        feedback = body['feedback']
        
        
        articles = Article.objects.filter(id=article)
        
        if articles.exists():
            
            article = articles.first()
            
            article.approved = True
            
            article.save()
            
            notification_data = {
                "article":ArticleDetailSerializer(article),
                "message":feedback,
                "user_id":article.author.id
            }
            
            event_type = events.ARTICLE_APPROVED
    
    if event_type == events.ARTICLE_REJECTED:
        
        article = body['article']['article_id']
        feedback = body['feedback']
        
        articles = Article.objects.filter(id=article)
        
        if articles.exists():
            
            article = articles.first()
            article.approved = False
            article.save()
            
            notification_data = {
                "article":ArticleDetailSerializer(article),
                "message":feedback,
                "user_id":article.author.id
            }
            
            event_type = events.ARTICLE_REJECTED
            
            
        

    print(" [x] Received %r" % data)
    print(" [x] Done")
    # ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=False)

print(' [*] Waiting for messages. To exit press CTRL+C')

channel.start_consuming()

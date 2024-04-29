docker run -d --name elasticsearch --restart always -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" -v esdata:/usr/share/elasticsearch/data --network bridge elasticsearch:7.17.16

docker run --name es01 --net elastic -p 9200:9200 -it -m 1GB docker.elastic.co/elasticsearch/elasticsearch:8.13.2

# docker run --name es4 --net elastic -p 9200:9200/tcp -p 9300:9300/tcp -it -m 1GB elasticsearch:8.13.0

# docker run --name elasticsearch --net elastic -p 9200:9200/tcp -p 9300:9300/tcp -it -m 1GB elasticsearch:8.13.0

# python manage.py search_index --create

# docker pull elasticsearch:7.14.2
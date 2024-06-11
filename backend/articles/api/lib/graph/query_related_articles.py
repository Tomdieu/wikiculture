from rdflib import Graph, URIRef
from api.models import Article


def query_related_articles(graph: Graph, article_id: int):
    query = """
    SELECT ?related_article WHERE {
        ?article ex:title ?title .
        ?article ex:hasKeyword ?keyword .
        ?related_article ex:hasKeyword ?keyword .

        OPTIONAL {
            ?article ex:isLocatedIn ?village .
            ?village ex:isPartOf ?region .
            ?region ex:isPartOf ?cultural_area .
            ?related_article ex:isLocatedIn ?village .
        }

        OPTIONAL {
            ?article ex:isLocatedIn ?village .
            ?village ex:isPartOf ?region .
            ?related_article ex:isLocatedIn ?village .
        }

        OPTIONAL {
            ?article ex:isLocatedIn ?village .
            ?related_article ex:isLocatedIn ?village .
        }

        FILTER (?article != ?related_article)
    }
    """
    article_uri = URIRef(f"http://example.org/article/{article_id}")
    results = graph.query(query, initBindings={"article": article_uri})

    related_articles = []
    for row in results:
        related_article_id = row.related_article.split("/")[-1]
        related_articles.append(Article.objects.get(id=related_article_id))

    return related_articles

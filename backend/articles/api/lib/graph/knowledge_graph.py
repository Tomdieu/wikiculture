import rdflib
from rdflib import Graph, Literal, RDF, URIRef
from rdflib.namespace import FOAF, XSD, Namespace
import json

from django.conf import settings

from api.models import Article,ArticleAnalysis
from urllib.parse import quote

# Define your namespaces
EX = Namespace("http://example.org/")

def create_knowledge_graph():
    g = Graph()

    # Bind a few prefix, namespace pairs for easier readability
    g.bind("foaf", FOAF)
    g.bind("ex", EX)

    # Create the articles and their relationships
    for article in Article.objects.all():
        article_uri = URIRef(f"http://example.org/article/{article.id}")

        # Add basic properties
        g.add((article_uri, RDF.type, EX.Article))
        g.add((article_uri, EX.title, Literal(article.title, datatype=XSD.string)))
        g.add((article_uri, EX.content, Literal(article.content, datatype=XSD.string)))

        # Add keywords
        article_analysis = ArticleAnalysis.objects.get(article=article)
        for keyword, _ in article_analysis.keywords:
            keyword_encoded = quote(keyword)
            keyword_uri = URIRef(f"http://example.org/keyword/{keyword_encoded}")
            g.add((article_uri, EX.hasKeyword, keyword_uri))
            g.add((keyword_uri, RDF.type, EX.Keyword))
            g.add((keyword_uri, EX.name, Literal(keyword, datatype=XSD.string)))

        # Add named entities
        for entity in article_analysis.named_entities:
            entity_encoded = quote(entity)
            entity_uri = URIRef(f"http://example.org/entity/{entity_encoded}")
            g.add((article_uri, EX.hasEntity, entity_uri))
            g.add((entity_uri, RDF.type, EX.Entity))
            g.add((entity_uri, EX.name, Literal(entity, datatype=XSD.string)))

        # Add categories
        for category in article.categories.all():
            category_uri = URIRef(f"http://example.org/category/{category.id}")
            g.add((article_uri, EX.belongsToCategory, category_uri))
            g.add((category_uri, RDF.type, EX.Category))
            g.add((category_uri, EX.name, Literal(category.name, datatype=XSD.string)))

        # Add village, region, and cultural area relationships
        if article.village:
            village = article.village
            village_uri = URIRef(f"http://example.org/village/{village.id}")
            g.add((article_uri, EX.isLocatedIn, village_uri))
            g.add((village_uri, RDF.type, EX.Village))
            g.add((village_uri, EX.name, Literal(village.name, datatype=XSD.string)))

            region = village.region
            region_uri = URIRef(f"http://example.org/region/{region.id}")
            g.add((village_uri, EX.isPartOf, region_uri))
            g.add((region_uri, RDF.type, EX.Region))
            g.add((region_uri, EX.name, Literal(region.name, datatype=XSD.string)))

            cultural_area = region.cultural_area
            cultural_area_uri = URIRef(f"http://example.org/cultural_area/{cultural_area.id}")
            g.add((region_uri, EX.isPartOf, cultural_area_uri))
            g.add((cultural_area_uri, RDF.type, EX.CulturalArea))
            g.add((cultural_area_uri, EX.name, Literal(cultural_area.name, datatype=XSD.string)))

    # Save the graph to a file
    graph_file = settings.BASE_DIR/'graph/knowledge_graph.ttl'
    g.serialize(destination=graph_file, format='turtle')
    print(f"Graph saved to {graph_file}")

    return g

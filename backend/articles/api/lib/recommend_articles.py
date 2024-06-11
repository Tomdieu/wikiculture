from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics import pairwise_distances
import numpy as np
from collections import defaultdict
from itertools import chain
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from django.db.models import QuerySet
from api.models import Article,Category

from .get_user_preferences import get_user_preferences

from .clean_text import clean_text

def get_categories_as_string(article:Article):

    categories:list[Category] = article.categories.all()
    categories_name = [cat.name for cat in categories]
    return ' '.join(categories_name)

def get_village_detail(article:Article|None):

    if article.village:
        village_name = article.village.name
        region_name = article.village.region.name
        cultural_area_name = article.village.region.cultural_area.name

        return ",".join([village_name,region_name,cultural_area_name])

    return ""

def get_tags_to_str(tags):

    return ','.join([tag.name for tag in tags])

def calculate_similarity():
    # Fetch all articles from the database
    articles = Article.objects.all()
    articles_content = [clean_text(article.content if article.content is not None else "") + " " + get_tags_to_str(article.tags.all()) + " "+get_categories_as_string(article)+ " "+get_village_detail(article) for article in articles]

    print(articles_content)

    # Vectorize the articles' content and tags
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(articles_content)

    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    return cosine_sim, articles

def recommend_articles(article_id, num_recommendations=5):
    cosine_sim, articles = calculate_similarity()

    # Get the index of the given article
    article_idx = [i for i, article in enumerate(articles) if article.id == article_id][0]

    # Get similarity scores for the article
    sim_scores = list(enumerate(cosine_sim[article_idx]))

    # Sort the articles based on similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the indices of the most similar articles
    sim_indices = [i[0] for i in sim_scores[1:num_recommendations+1]]

    # Get the recommended articles
    recommended_articles = [articles[i] for i in sim_indices]

    return recommended_articles

def recommend_articles_by_preferences(user, num_recommendations=5, exclude_article_ids=[]):
    category_preferences, tag_preferences = get_user_preferences(user)

    # Get articles based on category preferences
    category_articles = Article.objects.filter(categories__name__in=[c[0] for c in category_preferences])
    
    # Get articles based on tag preferences
    tag_articles = Article.objects.filter(tags__name__in=[t[0] for t in tag_preferences])
    
    # Combine the querysets and remove duplicates
    recommended_articles = (category_articles | tag_articles).distinct().order_by('-created_at')[:num_recommendations]

    # Exclude specified article IDs
    recommended_articles = recommended_articles.exclude(id__in=exclude_article_ids)
    
    return recommended_articles


def recommend_similar_articles(article_id, top_n=5):
    article = Article.objects.get(id=article_id)
    article_analysis = article.analysis

    # Get all articles excluding the current one
    all_articles = Article.objects.exclude(id=article_id)
    similarities = []

    for other_article in all_articles:
        other_article_analysis = other_article.analysis
        similarity_score = 0

        # Calculate similarity based on keywords
        keywords_overlap = set(article_analysis.keywords) & set(other_article_analysis.keywords)
        similarity_score += len(keywords_overlap)

        # Calculate similarity based on named entities
        entities_overlap = set(article_analysis.named_entities) & set(other_article_analysis.named_entities)
        similarity_score += len(entities_overlap)

        similarities.append((other_article, similarity_score))

    # Sort articles based on similarity score and return top_n articles
    similarities.sort(key=lambda x: x[1], reverse=True)
    recommended_articles = [article for article, score in similarities[:top_n]]
    return recommended_articles

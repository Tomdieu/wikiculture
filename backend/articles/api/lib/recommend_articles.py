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
    articles_content = [clean_text(article.content) + " " + get_tags_to_str(article.tags.all()) + " "+get_categories_as_string(article)+ " "+get_village_detail(article) for article in articles]

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


# def recommend_articles(
#     user_likes: list[int], articles: QuerySet[Article], n_recommendations=5
# ):
#     # Concatenate article titles and content to create documents
#     documents = [article.title + " " + article.content for article in articles]

#     # Create TF-IDF vectorizer
#     tfidf_vectorizer = TfidfVectorizer(stop_words="english")

#     # Fit and transform the vectorizer
#     tfidf_matrix = tfidf_vectorizer.fit_transform(documents)

#     # Compute cosine similarity matrix
#     cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

#     # Get the indices of articles the user has liked
#     liked_indices = [article.id - 1 for article in user_likes]

#     # Calculate average similarity scores for user liked articles
#     avg_similarity = np.mean(cosine_sim[liked_indices], axis=0)

#     # Get indices of top n similar articles
#     similar_indices = avg_similarity.argsort()[::-1][1 : n_recommendations + 1]

#     # Return recommended articles
#     return [articles[i] for i in similar_indices]

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics import pairwise_distances
import numpy as np
from collections import defaultdict
from itertools import chain

from django.db.models import QuerySet
from articles.api.models import Article


def recommend_articles(
    user_likes: list[int], articles: QuerySet[Article], n_recommendations=5
):
    # Concatenate article titles and content to create documents
    documents = [article.title + " " + article.content for article in articles]

    # Create TF-IDF vectorizer
    tfidf_vectorizer = TfidfVectorizer(stop_words="english")

    # Fit and transform the vectorizer
    tfidf_matrix = tfidf_vectorizer.fit_transform(documents)

    # Compute cosine similarity matrix
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    # Get the indices of articles the user has liked
    liked_indices = [article.id - 1 for article in user_likes]

    # Calculate average similarity scores for user liked articles
    avg_similarity = np.mean(cosine_sim[liked_indices], axis=0)

    # Get indices of top n similar articles
    similar_indices = avg_similarity.argsort()[::-1][1 : n_recommendations + 1]

    # Return recommended articles
    return [articles[i] for i in similar_indices]

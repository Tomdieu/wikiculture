from collections import Counter

from api.models import UserArticleInteraction

def get_user_preferences(user):
    interactions = UserArticleInteraction.objects.filter(user=user, interaction_type='view')
    category_counter = Counter()
    tag_counter = Counter()

    for interaction in interactions:
        article = interaction.article
        for category in article.categories.all():
            category_counter[category.name] += 1
        for tag in article.tags.all():
            tag_counter[tag.name] += 1

    return category_counter.most_common(), tag_counter.most_common()

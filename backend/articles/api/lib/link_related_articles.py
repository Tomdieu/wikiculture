from api.models import Article

def link_related_articles(content:str, named_entities:list[str]):
    for entity in named_entities:
        articles = Article.objects.filter(title__icontains=entity)
        for article in articles:
            content = content.replace(entity, f'<a href="/articles/{article.slug}/">{entity}</a>')
    return content
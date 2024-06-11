from django.core.management.base import BaseCommand
from api.models import Article, ArticleAnalysis

class Command(BaseCommand):
    help = 'Populate ArticleAnalysis for existing articles'

    def handle(self, *args, **kwargs):
        articles = Article.objects.all()
        for article in articles:
            if not hasattr(article, 'analysis'):

                analysis_data = article.get_text_analysis()
                ArticleAnalysis.objects.update_or_create(
                    article=article,
                    defaults={
                        'keywords': analysis_data['keywords'],
                        'named_entities': analysis_data['named_entities'],
                        'sentiment': analysis_data['sentiment'],
                    }
                )

        self.stdout.write(self.style.SUCCESS('Successfully populated ArticleAnalysis for existing articles'))

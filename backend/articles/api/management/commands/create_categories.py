from django.core.management.base import BaseCommand
from api.models import Category

CATEGORIES = [
    {"name": "Art and Design", "is_cultural": True, "description": "Visual Arts, Architecture, Graphic Design, Fashion"},
    {"name": "Music", "is_cultural": True, "description": "Genres, Music History, Artist Profiles, Album Reviews"},
    {"name": "Literature", "is_cultural": True, "description": "Book Reviews, Author Interviews, Literary Criticism, Poetry"},
    {"name": "Film and Television", "is_cultural": True, "description": "Movie Reviews, TV Show Reviews, Filmmaker Interviews, Industry News"},
    {"name": "Theatre and Performing Arts", "is_cultural": True, "description": "Play Reviews, Dance Performances, Theatre Criticism, Performer Profiles"},
    {"name": "Culinary Arts", "is_cultural": True, "description": "Recipes, Restaurant Reviews, Food Culture, Chef Interviews"},
    {"name": "History and Heritage", "is_cultural": True, "description": "Historical Events, Cultural Heritage Sites, Biographies of Historical Figures, Cultural Traditions"},
    {"name": "Lifestyle and Trends", "is_cultural": False, "description": "Fashion Trends, Health and Wellness, Travel, Home and Living"},
    {"name": "Science and Technology in Culture", "is_cultural": True, "description": "Science Communication, Technological Innovations, Science Fiction, Impact of Technology on Society"},
    {"name": "Philosophy and Ideas", "is_cultural": True, "description": "Philosophical Concepts, Interviews with Thinkers, Essays on Modern Issues, Debates and Discussions"},
    {"name": "Cultural Commentary and Criticism", "is_cultural": True, "description": "Social Issues, Political Commentary, Cultural Trends Analysis, Opinion Pieces"},
    {"name": "Events and Festivals", "is_cultural": True, "description": "Cultural Festivals, Art Exhibitions, Music Concerts, Film Festivals"},
    {"name": "Global Cultures", "is_cultural": True, "description": "Cultural Practices from Around the World, Profiles of Different Countries, Global Art Movements, Cross-Cultural Interactions"},
    {"name": "Education and Learning", "is_cultural": True, "description": "Educational Resources, Cultural Workshops, Learning Programs, Book Clubs and Study Groups"},
    {"name": "Digital Culture", "is_cultural": True, "description": "Social Media Trends, Digital Art, Online Communities, Impact of the Internet on Culture"},
]

class Command(BaseCommand):
    help = 'Create predefined categories if they do not exist'

    def handle(self, *args, **kwargs):
        for category_data in CATEGORIES:
            category, created = Category.objects.get_or_create(
                name=category_data["name"],
                defaults={
                    "is_cultural": category_data["is_cultural"],
                    "description": category_data["description"],
                },
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Category "{category.name}" created successfully.'))
            else:
                self.stdout.write(self.style.WARNING(f'Category "{category.name}" already exists.'))
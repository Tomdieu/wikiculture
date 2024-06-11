from django.core.management.base import BaseCommand
from api.models import Category

CATEGORIES = [
    {"name": "Ethnic Groups and Tribes", "is_cultural": True, "description": "Information about the different ethnic groups in Cameroon, including their history and customs."},
    {"name": "Languages", "is_cultural": True, "description": "Overview of the major and indigenous languages spoken in Cameroon, including language preservation efforts."},
    {"name": "Traditional Clothing and Fashion", "is_cultural": True, "description": "Traditional attire and contemporary fashion influenced by Cameroonian designs."},
    {"name": "Music and Dance", "is_cultural": True, "description": "Traditional music styles, instruments, and dances of Cameroon, along with famous musicians and bands."},
    {"name": "Festivals and Celebrations", "is_cultural": True, "description": "Major cultural festivals and community celebrations in Cameroon."},
    {"name": "Cuisine", "is_cultural": True, "description": "Traditional Cameroonian dishes and regional culinary specialties, including recipes."},
    {"name": "Arts and Crafts", "is_cultural": True, "description": "Traditional arts, crafts, and the contemporary art scene in Cameroon."},
    {"name": "History and Heritage", "is_cultural": True, "description": "Historical landmarks, cultural heritage sites, and the history of Cameroon."},
    {"name": "Religion and Spirituality", "is_cultural": True, "description": "Major religions, spiritual practices, and places of worship in Cameroon."},
    {"name": "Folklore and Oral Traditions", "is_cultural": True, "description": "Popular myths, legends, and the role of storytelling in Cameroonian culture."},
    {"name": "Nature and Environment", "is_cultural": True, "description": "Natural landscapes, sacred sites, and conservation efforts in Cameroon."},
    {"name": "Modern Culture and Lifestyle", "is_cultural": True, "description": "Influence of globalization, urban vs. rural cultural dynamics, and contemporary trends."},
    {"name": "Notable Personalities and Influencers", "is_cultural": True, "description": "Prominent figures and the contributions of the Cameroonian diaspora to global culture."},
    {"name": "Traditional Healing Practices", "is_cultural": True, "description": "Traditional healing methods, herbal medicine, and spiritual healing practices in Cameroonian culture."},
    {"name": "Marriage Customs", "is_cultural": True, "description": "Traditional marriage customs and ceremonies among different ethnic groups in Cameroon."},
    {"name": "Traditional Festivals and Ceremonies", "is_cultural": True, "description": "Detailed descriptions of traditional festivals, rituals, and ceremonies specific to various communities in Cameroon."},
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

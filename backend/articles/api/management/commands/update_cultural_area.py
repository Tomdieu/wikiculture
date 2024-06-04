from typing import Any
from django.core.management.base import BaseCommand
from api.models import CulturalArea
from api.utils.cultural_area_description import CULTURAL_AREA_DESCRIPTION


class Command(BaseCommand):

    help = "Update the cultural area description"

    def handle(self, *args: Any, **options: Any) -> str | None:
        
         # Define the cultural areas data
        cultural_areas_data = {
            "Western Highlands (Grassfields)": [
                "Northwest Region",
                "West Region",
                "Southwest Region",
            ],
            "Coastal and Forest Zones": ["Littoral Region", "South Region"],
            "Northern Savanna": ["Adamawa Region", "North Region", "Far North Region"],
            "Eastern Forest": ["East Region", "Central Region"],
        }

        for cultural_area_name, regions in cultural_areas_data.items():
            cultural_area, created = CulturalArea.objects.get_or_create(
                name=cultural_area_name, defaults={"description": CULTURAL_AREA_DESCRIPTION[cultural_area_name]}
            )
            if created:
                self.stdout.write(self.style.SUCCESS("Cultural Area Created"))
            else:
                cultural_area.description = CULTURAL_AREA_DESCRIPTION[cultural_area_name]
                cultural_area.save()
                self.stdout.write(self.style.SUCCESS("Cultural Area : ")+f"{cultural_area_name} description updated")

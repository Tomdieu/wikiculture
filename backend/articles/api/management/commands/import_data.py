import json
import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from api.models import CulturalArea, Region, Village

class Command(BaseCommand):
    help = 'Import commune data from Wikipedia and store it in the database'

    def handle(self, *args, **kwargs):
        # URL of the Wikipedia page
        url = "https://en.wikipedia.org/wiki/Communes_of_Cameroon"

        # Send a request to the webpage
        self.stdout.write(self.style.HTTP_INFO('Fetching Data'))
        
        response = requests.get(url)
        response.raise_for_status()  # Ensure the request was successful

        # Parse the page content
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all tables with the class "wikitable"
        tables = soup.find_all('table', class_='wikitable')

        # Initialize an empty list to store commune data
        communes = []

        # Iterate over each table and extract data
        for table in tables:
            # Iterate over each row in the table
            for row in table.find_all('tr')[1:]:  # Skip the header row
                cells = row.find_all('td')
                if len(cells) == 3:
                    commune = cells[0].get_text(strip=True)
                    department = cells[1].get_text(strip=True)
                    province = cells[2].get_text(strip=True)
                    communes.append({"commune": commune, "department": department, "province": province})

        # Mapping from French province names to English region names
        province_to_region = {
            "Extrême-Nord": "Far North Region",
            "Nord": "North Region",
            "Adamaoua": "Adamawa Region",
            "Nord-Ouest": "Northwest Region",
            "Sud-Ouest": "Southwest Region",
            "Ouest": "West Region",
            "Littoral": "Littoral Region",
            "Centre": "Central Region",
            "Est": "East Region",
            "Sud": "South Region"
        }

        # Define the cultural areas data
        cultural_areas_data = {
            "Western Highlands (Grassfields)": [
                "Northwest Region", "West Region", "Southwest Region"
            ],
            "Coastal and Forest Zones": [
                "Littoral Region", "South Region"
            ],
            "Northern Savanna": [
                "Adamawa Region", "North Region", "Far North Region"
            ],
            "Eastern Forest": [
                "East Region","Central Region"
            ]
        }

        # Create Cultural Areas and Regions
        cultural_area_map = {}
        region_map = {}

        self.stdout.write(self.style.HTTP_INFO('Inserting into database'))


        for cultural_area_name, regions in cultural_areas_data.items():
            cultural_area, created = CulturalArea.objects.get_or_create(
                name=cultural_area_name,
                defaults={"description": ""}
            )
            cultural_area_map[cultural_area_name] = cultural_area

            for region_name in regions:
                region, created = Region.objects.get_or_create(
                    name=region_name,
                    defaults={"description": "", "cultural_area": cultural_area}
                )
                region_map[region_name] = region

        # Create Villages
        for commune in communes:
            region_name = province_to_region.get(commune['province'])
            if region_name in region_map:
                region = region_map[region_name]
                Village.objects.get_or_create(
                    name=commune['commune'],
                    defaults={"description": f"{commune['department']} Department", "region": region}
                )

        self.stdout.write(self.style.SUCCESS('Data imported successfully'))

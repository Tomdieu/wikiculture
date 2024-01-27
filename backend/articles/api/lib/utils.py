import json
from typing import List
from dataclasses import dataclass


@dataclass
class UserInfo:
    id: int
    username: str
    first_name: str
    last_name: str
    email: str
    date_joined: str
    user_type: str


def extract_fields_as_dataclass(
    json_data: dict,
    fields_to_extract: List[str] = [
        "id",
        "username",
        "first_name",
        "last_name",
        "email",
        "date_joined",
        "user_type",
    ],
):
    """Extracts the specified fields from a JSON data string and returns them as a dataclass instance.

    Args:
        json_data (dict): The dict data.
        fields_to_extract (list): A list of field names to extract.

    Returns:
        UserInfo: A dataclass instance containing the extracted fields.
    """

    # data = json.loads(json_data)
    data = json_data
    extracted_data = {field: data.get(field) for field in fields_to_extract}
    return UserInfo(
        **extracted_data
    )  # Unpack the dictionary into the dataclass constructor

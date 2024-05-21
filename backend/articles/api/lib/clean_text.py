from bs4 import BeautifulSoup

def clean_text(text):
  """
  This function removes all tags using BeautifulSoup's get_text().
  """
  soup = BeautifulSoup(text, 'html.parser')
  clean_text = soup.get_text(separator='\n')  # Combine text with newlines (optional)
  return clean_text
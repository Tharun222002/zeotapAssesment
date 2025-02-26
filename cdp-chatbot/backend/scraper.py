import requests
from bs4 import BeautifulSoup

CDP_URLS = {
    "Segment": "https://segment.com/docs/",
    "mParticle": "https://docs.mparticle.com/",
    "Lytics": "https://docs.lytics.com/",
    "Zeotap": "https://docs.zeotap.com/home/en-us/"
}

def scrape_cdp_docs(url):
    """Scrapes and extracts text from the given CDP documentation URL."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        paragraphs = soup.find_all("p")  # Extracts all <p> elements
        text_content = "\n".join([p.get_text() for p in paragraphs if p.get_text().strip()])
        return text_content[:1000]  # Limit output to avoid excessive text
    except requests.exceptions.RequestException as e:
        return f"Error fetching {url}: {e}"

def fetch_all_docs():
    """Scrapes all CDP documentation pages and returns structured data."""
    scraped_data = {}
    for name, url in CDP_URLS.items():
        scraped_data[name] = scrape_cdp_docs(url)
    return scraped_data

if __name__ == "__main__":
    docs = fetch_all_docs()
    for name, content in docs.items():
        print(f"\n{name} Documentation:\n{content[:500]}...")  # Show first 500 characters


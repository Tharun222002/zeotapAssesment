from fastapi import FastAPI
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup

app = FastAPI()

class QueryRequest(BaseModel):
    question: str

# Dummy function to simulate scraping docs
def fetch_cdp_data():
    return {
        "Segment": "To set up a new source in Segment, go to Sources and click 'Add New'.",
        "mParticle": "To create a user profile in mParticle, use the Profile API.",
        "Lytics": "To build an audience segment in Lytics, navigate to the Audience Builder."
    }

@app.post("/chatbot/")
def chatbot_query(request: QueryRequest):
    data = fetch_cdp_data()
    for key, value in data.items():
        if key.lower() in request.question.lower():
            return {"response": value}
    return {"response": "I couldn't find an exact answer. Try rewording your question!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

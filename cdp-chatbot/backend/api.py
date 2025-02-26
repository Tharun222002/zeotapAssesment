from fastapi import FastAPI
from pydantic import BaseModel
from indexer import search_docs  # Import the function to retrieve relevant documentation

app = FastAPI()

class QueryRequest(BaseModel):
    question: str

@app.post("/chatbot/")
def chatbot_query(request: QueryRequest):
    answer = search_docs(request.question)  # Search documentation for an answer
    return {"response": answer}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

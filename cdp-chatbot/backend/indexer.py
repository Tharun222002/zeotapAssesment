from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Sample documentation data (This should be replaced with actual CDP documentation)
DOCUMENTS = {
    "Segment": "To set up a new source in Segment, go to the Sources page and click 'Add New'.",
    "mParticle": "To create a user profile in mParticle, use the Profile API.",
    "Lytics": "To build an audience segment in Lytics, navigate to the Audience Builder.",
    "Zeotap": "To integrate Zeotap, go to the Zeotap dashboard and configure the API keys."
}

# Load the sentence transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Convert documents into embeddings
doc_keys = list(DOCUMENTS.keys())
doc_texts = list(DOCUMENTS.values())
doc_embeddings = model.encode(doc_texts)

# Initialize FAISS index for fast searching
index = faiss.IndexFlatL2(doc_embeddings.shape[1])
index.add(np.array(doc_embeddings))

def search_docs(query):
    """Search the best-matching documentation based on the user query."""
    query_embedding = model.encode([query])
    _, indices = index.search(query_embedding, k=1)  # Get the closest document

    best_match = doc_keys[indices[0][0]]  # Retrieve the corresponding key
    return DOCUMENTS[best_match]  # Return relevant documentation text


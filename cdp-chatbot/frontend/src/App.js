import React, { useState } from "react";

const Chatbot = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const sendQuery = async () => {
        const res = await fetch("http://localhost:8000/chatbot/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: query }),
        });
        const data = await res.json();
        setResponse(data.response);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a CDP question..."
            />
            <button onClick={sendQuery}>Ask</button>
            <p>Response: {response}</p>
        </div>
    );
};

export default Chatbot;


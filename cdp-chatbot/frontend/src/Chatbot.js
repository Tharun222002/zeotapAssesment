import React, { useState } from "react";

const Chatbot = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const sendQuery = async () => {
        if (!query.trim()) return; // Prevent empty requests
        try {
            const res = await fetch("http://localhost:8000/chatbot/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: query }),
            });
            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            setResponse("Error connecting to chatbot server.");
        }
    };

    return (
        <div className="chat-container">
            <h2>CDP Chatbot</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.va


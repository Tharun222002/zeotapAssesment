import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const ROWS = 10;
const COLS = 5;

const Spreadsheet = () => {
    const [cells, setCells] = useState(Array(ROWS).fill().map(() => Array(COLS).fill("")));
    const [draggedValue, setDraggedValue] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/load").then(response => {
            if (response.data.length) setCells(response.data);
        });
    }, []);

    const handleChange = (row, col, value) => {
        const newCells = [...cells];
        newCells[row][col] = value;
        setCells(newCells);
    };

    const saveData = () => {
        axios.post("http://localhost:5000/save", cells)
            .then(() => alert("Data saved successfully!"));
    };

    // Handle Dragging
    const handleDragStart = (e, row, col) => {
        setDraggedValue(cells[row][col]); // Store dragged cell's value
    };

    const handleDrop = (e, row, col) => {
        if (draggedValue !== "") {
            handleChange(row, col, draggedValue); // Set dragged value to new cell
        }
    };

    return (
        <div>
            <button onClick={saveData}>Save</button>
            <table className="spreadsheet">
                <tbody>
                    {cells.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>
                                    <input
                                        value={cell}
                                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                                        onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                                        onDragOver={(e) => e.preventDefault()} // Allow dropping
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Spreadsheet;

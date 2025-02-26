import React, { useState } from "react";
import "./styles.css";

const ROWS = 10;
const COLS = 5;

const Spreadsheet = () => {
    const [cells, setCells] = useState(Array(ROWS).fill().map(() => Array(COLS).fill("")));

    const handleChange = (row, col, value) => {
        const newCells = [...cells];
        newCells[row][col] = value;
        setCells(newCells);
    };

    return (
        <table className="spreadsheet">
            <tbody>
                {cells.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex}>
                                <input
                                    value={cell}
                                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                />
                            </td>
                        ))} 
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Spreadsheet;


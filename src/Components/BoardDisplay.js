import React, { useState } from "react";
import BoardDisplayStyles from "./BoardDisplay.css";

import ListDisplay from "./ListDisplay";

export default function BoardDisplay({board}) {

    const [currentBoard, setBoard] = useState(board);

    console.log(`current board ${JSON.stringify(currentBoard)}`)

    return (
        <div className = "task-board"> 
            <input className="task-board-title" defaultValue= {currentBoard.title}/> 
            <ListDisplay cards = {currentBoard.cards} />
        </div>
    )
}
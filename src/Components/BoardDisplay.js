import React, { useState, useContext} from "react";
import BoardDisplayStyles from "./BoardDisplay.css";

import ListDisplay from "./ListDisplay";

import { useBoard, useBoardUpdate } from "./BoardContext";

export default function BoardDisplay() {

    const board = useBoard();

    return (
        <div className = "task-board"> 
            <input className="task-board-title" value = {board.title} /> 
            <ListDisplay cards = {board.cards}/>
        </div>
    )
}
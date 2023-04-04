import React from "react";
import BoardDisplayStyles from "./BoardDisplay.css";

import ListDisplay from "./ListDisplay";
import cardData from "../cardData";

export default function BoardDisplay() {
    return (
        <div className = "task-board"> 
            <input className="task-board-title" defaultValue={"Main Board"}/> 
            <ListDisplay cards = {cardData} />
        </div>
    )
}
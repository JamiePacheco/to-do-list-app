import React from "react";
import ListDisplayStyles from "./ListDisplayStyles.css";

import ListCard from "./ListCard";

export default function ListDisplay({cards}) {

    const [listCards, setListCards] = React.useState(cards);

    console.log(listCards);

    function addListCards() {

        const newCard = {
            id : listCards.length + 1,
            title : "New List",
            tasks: []
        };

        setListCards([...listCards, newCard]);
    }


    const cardElements = listCards.map((card) => {
        return <ListCard key = {card.id} tasks = {card.tasks} boardName = {card.title}/>
    })


    return (
        <div className = "list-container">
            {cardElements}
        
            <div className = "list--button-container"> 
                <button className="list--add-card-button" onClick={() => addListCards()}> Add New List <i className="fa-solid fa-plus"></i> </button>
            </div>
        </div>
    )
}
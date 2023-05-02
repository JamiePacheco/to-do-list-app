import React, {useContext, useEffect, useState} from "react";
import ListDisplayStyles from "./ListDisplayStyles.css";
import ListCard from "./ListCard";
import { useBoard } from "./BoardContext";

export default function ListDisplay({cards}) {

    const board = useBoard();

    const [listCards, setListCards] = useState(cards);

    useEffect(() => {
        setListCards(cards)
    }, [cards]);

    function addCard() {
        const newCard = {
            id : board.cards.length + 1,
            title : "New List",
            deletable: true,
            tasks : []
        }

        setListCards(prevCards => [...prevCards, newCard]);
        board.cards.push(newCard);
    }

    console.log(`Cards ${listCards}`);
    const cardElements = listCards.map((card) => {
        return <ListCard id = {card.id} key = {card.id} tasks = {card.tasks} title = {card.title}/>
    })

    return (
        <div className = "list-container">
            {cardElements}
        
            <div className = "list--button-container"> 
                <button className="list--add-card-button" onClick={() => addCard()}> Add New List <i className="fa-solid fa-plus"></i> </button>
            </div>
        </div>
    )
}
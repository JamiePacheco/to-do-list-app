import React, {useRef, useState} from "react"
import AppStyles from "../App.css"
import { useBoardUpdate, useBoards } from "./BoardContext"

export default function Taskbar({extended}) {

    const listBoards = useBoards();
    const changeBoard = useBoardUpdate();

    const [inputValue, setInputValue] = useState("");

    const [creatingBoard, setCreatingBoard] = useState(false);

    function createNewBoard(e) {

      if (e.key !== "Enter") {
        return;
      }

      const newBoard = {
        id : listBoards.length + 1,
        title : inputValue === "" ? "New Board" : inputValue, 
        deletable : true,
        cards : [
            {
                id : 1,
                title : "Main List",
                deletable : false,
                tasks : []
            } 
        ]
    }

    listBoards.push(newBoard);
    setCreatingBoard(!createNewBoard);
    setInputValue("");
  }

    const boardButtons = listBoards.map(board => {
        return (
        <li key = {board.id}>
          <button
          className = "buttons-list--button"
          key = {board.id}
          onClick={() => changeBoard(board.id)}
          >
              <i className="fa-regular fa-clipboard"></i> {board.title}
          </button>
        </li>
        )
    })
    
    return (<div className = {`main-sidebar ${(extended) ? 'extended' : "contracted"}`}>
          {
            extended
            &&
            <>
              <h1 className = "main-sidebar--header"> To-Do-List </h1>

              <ul className = "main-sidebar--buttons-list">

                {boardButtons}

                {
                  !creatingBoard
                  &&
                  <li className = "buttons-list--item">
                    <button
                      onClick={() => setCreatingBoard(!creatingBoard)}
                      className = "buttons-list--button"
                    >
                    <i className="fa-solid fa-plus"></i>New Board 
                    </button>
                  </li>
                }

                {
                  creatingBoard
                  && 
                  <li className = "buttons-list--item">
                    <input 
                      className = "buttons-list--new-board-input"
                      autoFocus
                      placeholder="New Board Name"
                      value = {inputValue}
                      onBlur={() => setCreatingBoard(!creatingBoard)}
                      onKeyDown={(e) => createNewBoard(e) }
                      onChange={(e) => setInputValue(e.target.value)}
                    >

                    </input>
                  </li>
                }

                
              </ul>
            </>
          }

    </div>)
}
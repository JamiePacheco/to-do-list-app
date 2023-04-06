import logo from './logo.svg';
import './App.css';

import BoardDisplay from './Components/BoardDisplay';
import { useState } from 'react';

import boardData from './cardData';
export default function App() {

  const [taskbar, setTaskBar] = useState(false);
  const [listBoards, setListBoards] = useState(boardData);
  const [currentBoard, setCurrentBoard] = useState(0);

  function changeBoard(id) {
    setCurrentBoard(id - 1);
    console.log(`id ${currentBoard}`);

    // console.log(currentBoard);

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


  return (
    <div className = "main">
      <div className = {`main-sidebar ${(taskbar) ? 'extended' : "contracted"}`}>
        {
          taskbar
          &&
          <>
            <h1 className = "main-sidebar--header"> To-Do-List </h1>

            <ul className = "main-sidebar--buttons-list">

              {boardButtons}


              <li className = "buttons-list--item">
                <button className = "buttons-list--button">
                <i className="fa-solid fa-plus"> </i>New Board 
                </button>
              </li>
            </ul>
          </>
        }

      </div>
    
      {
        taskbar 
        &&
        <div className = "grey-filter" onClick={() => setTaskBar(!taskbar)} ></div>
      }

      <header className = "main-header"> 
        <span className = "main-menu-button" onClick={() => setTaskBar(!taskbar)}><i className="fa-solid fa-bars"></i></span>
        <h1 className = "main-header-title"> To-Do-List </h1>
      </header>

      <div className = {"main-content " + (taskbar ? " greyed" : "")}>
        <BoardDisplay board = {listBoards[currentBoard]}> </BoardDisplay>        
      </div>

    </div>
    )
}


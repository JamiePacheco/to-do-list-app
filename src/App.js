import React, {useState} from 'react';
import BoardDisplay from './Components/BoardDisplay';
import Taskbar from './Components/BoardTaskBar';

import AppStyles from './App.css';
import { BoardProvider } from "./Components/BoardContext"

export default function App() {

  const [taskbar, setTaskBar] = useState(false);

  return (
    <BoardProvider>
      <div className = "main">
        <Taskbar extended = {taskbar}></Taskbar>
      
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
          <BoardDisplay> </BoardDisplay>        
        </div>
      </div>
    </BoardProvider>

    
    )
}


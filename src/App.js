import logo from './logo.svg';
import './App.css';

import BoardDisplay from './Components/BoardDisplay';

export default function App() {
  return (
    <div className = "main">
      <header className = "main-header"> 
        <h1 className = "main-header-title"> To-Do-List </h1>
      </header>

      <div className = "main-content">
        <BoardDisplay> </BoardDisplay>        
      </div>

    </div>
  )
}


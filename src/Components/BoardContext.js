import React, {useState, useContext} from 'react'
import boardData from '../cardData';

const BoardContext = React.createContext()
const BoardUpdateContext = React.createContext()
const BoardsContext = React.createContext()

export function useBoard() {
    return useContext(BoardContext);
}

export function useBoards() {
    return useContext(BoardsContext);
}

export function useBoardUpdate() {
    return useContext(BoardUpdateContext);
}

export function BoardProvider({children}) {

    console.log(boardData);

    const [currentBoard, setCurrentBoard] = useState(boardData[0]);
    const [boards, setBoards] = useState(boardData);
    

    function changeBoard(id) {
        setCurrentBoard(boardData[id - 1]);
    } 

    return (
        <BoardContext.Provider value = {currentBoard}>
            <BoardUpdateContext.Provider value = {changeBoard}>
                <BoardsContext.Provider value = {boards}> 
                    {children}
                </BoardsContext.Provider>
            </BoardUpdateContext.Provider>
        </BoardContext.Provider>
    )
}
import React, { useState, useMemo, useEffect } from "react";
import ListCardStyles from "./ListCardStyles.css";

import Task from "./Task";
import cardData from "../cardData";
import { useBoard, useBoardUpdate } from "./BoardContext";

export default function ListCard({tasks, title, id}) {
    
    console.log(`Task Property: ${JSON.stringify(tasks)}`);

    const [newTaskTitle, setNewTaskTitle] = React.useState("");
    const [cardTasks, setCardTasks] = useState(tasks);
    const [popUpMenu, setPopUpMenu] = useState(true);
    const board = useBoard();
    const cardData =  useMemo(() => {
        return board.cards.find((card) => card.id === id);
    }, [tasks])

    useEffect(() => {
        setCardTasks(tasks);
    }, [tasks])
    
    
    function addTask() {
        const newTask = {
            id : cardTasks.length + 1,
            title: newTaskTitle === "" ? ("New Task " + (cardData.tasks.length + 1)): newTaskTitle,
            description: "",
            active: true
        }

        setCardTasks(prevCardTasks => [...prevCardTasks, newTask]);        
        cardData.tasks.push(newTask)
    }


    const dataChange = (data) => {
    }

    const deleteTask = (taskId) => {
        cardData.tasks = cardData.tasks.filter((task) => {
            if (task.id !== taskId) {
                return task; 
            }
        })

        setCardTasks(cardData.tasks);
    }

    function enterNewTask(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    function openPopUpMenu() {
        setPopUpMenu(true);
        console.log(popUpMenu);
    } 

    const taskListItems = cardTasks.map((task) => {
        console.log(`Task: ${JSON.stringify(task)}`)
        return (<Task 
            title={task.title} 
            key={task.id} 
            id = {task.id}
            description={task.description}
            active = {task.active}
            changeFunc = {dataChange} 
            deleteFunc = {deleteTask} 
            />)
    })

    return(
        <div className = "card-container">
            <div className = "list-card">
                <div className = "card--header-container">
                    <input className = "card--title no-outline" type="text" value = {title}/>
                    <button className = "card--edit-button" onClick = {() => setPopUpMenu(prevPopup => !prevPopup)}> <i className="fa-solid fa-ellipsis-vertical"></i> </button>    
                </div>

                <div className = "card--new-task-container">
                    <input className = "card--new-task-input no-outline" type="text" onKeyDown={(event) => enterNewTask(event)} onChange={(event) => setNewTaskTitle(event.target.value)}/>
                    <button className = "card--add-task-button" onClick={() => addTask()}> <i className="fa-solid fa-plus"></i> </button>    
                </div>

                <div className = "card--task-list-container">
                    {cardTasks.length === 0 && <h1 className = "card--task-empty-title"> List Empty </h1>}

                    {cardTasks.length > 0 && 
                        <ul className="card--task-list">
                            {taskListItems}
                        </ul>
                    }
                </div>
            </div>

            {   
                popUpMenu 
                &&
                <div className = "list-card--pop-up-menu"> 
                    <ul className = "pop-up--list">
                        <li className = "pop-up--list-item">
                            <h1 className = "pop-up--sub-header"> Sort List </h1>
                        </li>
                        <li className = "pop-up--list-item">
                            <button className = "pop-up--button"> <i class="fa-solid fa-pen-to-square"></i> Edit Title  </button>
                        </li>
                        <li className = "pop-up--list-item">
                            <button className = "pop-up--button"> <i class="fa-solid fa-trash-can"></i> delete board</button>
                        </li>
                    </ul>
                </div>
                }
        </div>
    )
}
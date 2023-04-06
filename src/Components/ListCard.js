import React from "react";
import ListCardStyles from "./ListCardStyles.css";

import Task from "./Task";

export default function ListCard(props) {

    const [listTasks, setListTasks] = React.useState(props.tasks)

    const [newTaskTitle, setNewTaskTitle] = React.useState("");

    const dataChange = (data) => {
        setListTasks(prevTasks => { 
            return prevTasks.map((task) => {
                if (task.id === data.id) {
                    if (data.changed === "title") {
                        task.title = data.title;
                    } else if (data.changed === "active") {
                        task.active = data.activated;
                    } else if (data.changed === "description") {
                        task.description = data.description;
                    }
                    return task;
                }
            })
        })

        console.log(listTasks);
    }

    const deleteTask = (taskId) => {
        setListTasks(prevListTasks => {
            return prevListTasks.filter((task) => {
                if (task.id !== taskId) {
                    return task;
                }
            })
        })
    }

    function addTask() {
        const newTask = {
            id : listTasks.length + 1,
            title: newTaskTitle === "" ? "New Task" : newTaskTitle,
            description:  "",
            active: true
        }
        
        setListTasks(prevListTasks => [...prevListTasks, newTask])
    }

    function enterNewTask(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    const taskListItems = listTasks.map((task) => {
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
        <div className = "list-card">
            <div className = "card--header-container">
                <input className = "card--title no-outline" type="text" defaultValue = {props.boardName}/>
                <button className = "card--edit-button"> <i className="fa-solid fa-ellipsis-vertical"></i> </button>    
            </div>

            <div className = "card--new-task-container">
                <input className = "card--new-task-input no-outline" type="text" onKeyDown={(event) => enterNewTask(event)} onChange={(event) => setNewTaskTitle(event.target.value)}/>
                <button className = "card--add-task-button" onClick={() => addTask()}> <i className="fa-solid fa-plus"></i> </button>    
            </div>

            <div className = "card--task-list-container">
                {listTasks.length === 0 && <h1 className = "card--task-empty-title"> List Empty </h1>}

                {listTasks.length > 0 && 
                    <ul className="card--task-list">
                        {taskListItems}
                    </ul>
                }


            </div>
        </div>
    )
}
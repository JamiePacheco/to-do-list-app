import React, { useRef, useState } from "react";

import ReactStyles from "./Task.css"
import userEvent from "@testing-library/user-event";

export default function Task({title, id, changeFunc, deleteFunc, description = "Task Description", active = true}) {

    const [taskTitle, setTaskTitle] = useState(title);
    const [taskFocused, setFocused] = useState(false);
    const [taskActive, setActive] = useState (active);
    const [taskDescription, setDescription] = useState(description)

    const [newTaskTitle, setNewTaskTitle] = useState(taskTitle);
    const [newTaskDescription, setNewTaskDescription] = useState(description);

    function changeTitle(event) {

        if (event.key === "Enter"){
            setTaskTitle(newTaskTitle);

            let changeData = {
                id : id,
                title : newTaskTitle,
                changed : "title"
            };

            changeFunc(changeData);
        }
    }

    function changeActiveStatus(event) {
        setActive(!event.target.checked);
        setFocused(false)

        let changeData = {
            id : id,
            activated: !taskActive,
            changed : "active"
        }
        changeFunc(changeData)
    }

    function changeDescription(event) {

        if (event.key === "Enter") {
            setDescription(newTaskDescription);
            let changeData = {
                id : id,
                description: newTaskDescription,
                changed : "description"
            }

            changeFunc(changeData);

            event.target.taskFocused = false;
        }
    }

    function changeFocus(e) {
        e.stopPropagation();
        if (!taskFocused && taskActive) {
            setFocused(true);
        } else {
            setFocused(false);
        }
    }

    return (
        <li 
        className = {"task " + (taskFocused ? "task--expanded" : "task--contracted") + (taskActive ? "" : " task--checked")} 
        onClick={(e) => {changeFocus(e)}}
        >   
            <div className="task--contracted-content">
                <input 
                className = "task--check-input" 
                type = "checkbox"
                onChange={(event) => changeActiveStatus(event)}
                />

                <input 
                className = {"task--name-input " + (taskActive ? "" : "task--checked")}   
                type = "text" 
                defaultValue = {taskTitle}
                onChange={event => setNewTaskTitle(event.target.value)}
                onKeyDown={event => changeTitle(event)}
                onClick={(e) => taskFocused && e.stopPropagation()}
                readOnly = {!taskActive}
                 />  
            </div>
            
            {
               taskFocused 
               &&
                <div className = "task--expanded-content" onFocus={() => setFocused(true)}>
                    <textarea 
                        onClick={(e) => {e.stopPropagation()}}
                        className = "task--description-textarea" 
                        defaultValue={description} 
                        placeholder="Task Description" 
                        onChange={(event) => setNewTaskDescription(event.target.value)}
                        onKeyDown={(event) => changeDescription(event)}
                    />

                    <div className = "task--button-container"> 
                        <button className = "button task--delete-button" onClick={() => deleteFunc(id) } ><i className="fa-solid fa-trash-can"></i> delete </button>
                    </div>
                </div>

            }
        </li>
    )
}
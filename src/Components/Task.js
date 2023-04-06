import React, { useState } from "react";

import ReactStyles from "./Task.css"
import userEvent from "@testing-library/user-event";

export default function Task({title, id, changeFunc, deleteFunc, description = "Task Description", active = true}) {

    const [taskTitle, setTaskTitle] = useState(title);
    const [focused, setFocused] = useState(false);
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
        console.log(changeData);
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

            event.target.focused = false;
        }
    }


    function changeFocus() {
        if (taskActive) { 
            setFocused(true);
        }
    }

    return (
        <li 
        className = {"task " + (focused ? "task--expanded" : "task--contracted") + (taskActive ? "" : " task--checked")} 
        onClick={() => changeFocus()}
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
                 readOnly = {!taskActive}
                 />  
            </div>
            
            {
               focused 
               &&
                <div className = "task--expanded-content" onFocus={() => setFocused(true)}>
                    <textarea 
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
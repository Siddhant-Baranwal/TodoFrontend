import React from "react";

const TodoItem = ({title, description, id, isCompleted, updateHandler, deleteHandler}) => {
    return ( 
    <div className="todo">
        <div className="one">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
        <div className="two">
            <input onChange={()=>updateHandler(id)} type="checkbox" checked={isCompleted}  />
            <button onClick={()=>deleteHandler(id)} className="btn">Delete</button>
        </div>
    </div> 
    );
}
 
export default TodoItem;
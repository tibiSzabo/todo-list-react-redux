import { useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_TODO, TOGGLE_TODO } from "../../store/actionTypes";

const TodoItem = props => {
    const [ editing, setEditing ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState(null);

    const dispatch = useDispatch();
    const deleteIconClickHandler = () => dispatch({ type: DELETE_TODO, id: props.todo.id });
    const editIconClickHandler = () => { };
    const toggleIconClickHandler = () => dispatch({ type: TOGGLE_TODO, id: props.todo.id })

    const todoIcons = props.todo.done ?
        (
            <div className="todo-item-icons">
                <i className="far fa-trash-alt" onClick={deleteIconClickHandler}></i>
                <i className="far fa-sticky-note" onClick={toggleIconClickHandler}></i>
            </div>
        ) :
        (
            <div className="todo-item-icons">
                <i className="far fa-trash-alt" onClick={deleteIconClickHandler}></i>
                <i className="far fa-edit"></i>
                <i className="far fa-check-square" onClick={toggleIconClickHandler}></i>
            </div>
        );

    return (
        <div className={`todo-item${props.todo.done ? ' todo-item-done' : ''}`}>
            <div>{props.todo.name}</div>
            {todoIcons}
        </div>
    )
}

export default TodoItem;
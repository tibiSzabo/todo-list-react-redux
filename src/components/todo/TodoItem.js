import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_TODO, TOGGLE_TODO, EDIT_TODO } from "../../store/actionTypes";
import ErrorMessage from "../UI/ErrorMessage";
import { todoWithNameExists, todoNameInvalid } from "../../Functions"

const TodoItem = props => {

    const { todo } = props;

    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const inputRef = useRef(null);

    const dispatch = useDispatch();

    const todoItemListSelector = state => state?.todoItemList;
    const todoItemList = useSelector(todoItemListSelector);


    useEffect(() => {
        if (editing) {
            inputRef.current.addEventListener('keydown', event => {
                switch (event.code) {
                    case 'Enter': handleEditName(); break;
                    case 'Escape': setEditing(false); setError(false); break;
                }
            });
        }
    }, [editing]);

    const handleEditName = () => {
        const newTodoName = inputRef.current.value;
        if (!todoHasNameError(newTodoName) && !todoHasPreviousName()) {
            dispatch({ type: EDIT_TODO, newName: newTodoName, id: todo.id });
            setEditing(false);
        }
    }

    const todoHasNameError = name => {
        if (todoNameInvalid(name)) {
            setError(true);
            setErrorMsg('Invalid name, min. 3 characters.');
        } else if (todoWithNameExists(name, todoItemList) && !todoHasPreviousName()) {
            setError(true);
            setErrorMsg('Name already exists.');
        } else {
            setError(false);
            return false;
        }
        return true;
    }

    const deleteIconClickHandler = () => dispatch({ type: DELETE_TODO, id: todo.id });
    
    const editIconClickHandler = () => setEditing(!editing);

    const toggleIconClickHandler = () => dispatch({ type: TOGGLE_TODO, id: todo.id });

    const todoHasPreviousName = () => todo.name === inputRef.current.value.trim();

    const todoTitle = editing ?
        <div className="edit-todo-container">
            <input type="text" ref={inputRef} defaultValue={todo.name} autoFocus />
            <button>Save</button>
            { error && <ErrorMessage msg={errorMsg} /> }
        </div>
        : <div>{todo.name}</div>;

    const todoIcons = todo.done ?

        <div className="todo-item-icons">
            <i className="far fa-trash-alt" onClick={deleteIconClickHandler} />
            <i className="far fa-sticky-note" onClick={toggleIconClickHandler} />
        </div>
        :

        <div className="todo-item-icons">
            <i className="far fa-trash-alt" onClick={deleteIconClickHandler} />
            <i className="far fa-edit" onClick={editIconClickHandler}></i>
            <i className="far fa-check-square" onClick={toggleIconClickHandler} />
        </div>;

    return (
        <div className={`todo-item${todo.done ? ' todo-item-done' : ''}`}>
            {todoTitle}
            {todoIcons}
        </div>
    )
}

export default TodoItem;
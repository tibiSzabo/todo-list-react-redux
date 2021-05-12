import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { ADD_TODO } from "../../store/actionTypes";
import ErrorMessage from "../UI/ErrorMessage"

const AddTodoForm = props => {
    console.log(new Date(), 'todo')
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const dispatch = useDispatch();

    const inputRef = useRef(null);

    useEffect(() => {
        const newTodoName = inputRef.current.value;
        if (!error && newTodoName) {
            dispatch({ type: ADD_TODO, todoTitle: newTodoName });
            props.closeHandler();
        }
    });

    const handleAddTodo = () => {
        const newTodoName = inputRef.current.value;
        checkForTodoNameErrors(newTodoName);
    }

    useEffect(() => {
        inputRef.current.focus();
        inputRef.current.addEventListener('keydown', event => {
            if (event.code === 'Enter') {
                handleAddTodo();
            }
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const todoWithNameExists = name => props.todoItemList.find(todo => todo.name === name.trim());

    const todoNameInvalid = name => name.trim().length < 3;

    const checkForTodoNameErrors = name => {
        if (todoNameInvalid(name)) {
            setError(true);
            setErrorMsg('Invalid name, min. 3 characters.');
        } else if (todoWithNameExists(name)) {
            setError(true);
            setErrorMsg('Name already exists.');
        } else {
            setError(false);
        }
    }

    return (
        <div className="form">
            <div className="input-group">
                <span className="label">Name:</span>
                <input type="text" ref={inputRef} />
            </div>
            { error && <ErrorMessage msg={errorMsg} />}
            <div className="submit">
                <button onClick={handleAddTodo}>Add</button>
            </div>
        </div>
    )

}

export default connect(
    state => ({ todoItemList: state.todoItemList })
)(AddTodoForm);
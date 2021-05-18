import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { todoNameInvalid, todoWithNameExists } from "../../Functions";

import * as todoActions from "../../store/actions/todoActions"
import ErrorMessage from "../UI/ErrorMessage"

const AddTodoForm = props => {
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const dispatch = useDispatch();

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.addEventListener('keydown', event => {
            if (event.code === 'Enter') {
                handleAddTodo();
            }
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddTodo = () => {
        const newTodoName = inputRef.current.value;
        if (!todoHasNameError(newTodoName)) {
            dispatch(todoActions.addTodo(newTodoName));
            props.closeHandler();
        }
    }

    const todoHasNameError = name => {
        if (todoNameInvalid(name)) {
            setError(true);
            setErrorMsg('Invalid name, min. 3 characters.');
        } else if (todoWithNameExists(name, props.todoItemList)) {
            setError(true);
            setErrorMsg('Name already exists.');
        } else {
            setError(false);
            return false;
        }
        return true;
    }

    return (
        <div className="form">
            <div className="input-group">
                <span className="label">Name:</span>
                <input type="text" ref={inputRef} autoFocus />
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
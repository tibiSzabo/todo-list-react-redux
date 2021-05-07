import React, { useRef } from "react";
import { connect } from "react-redux";
import { ADD_TODO } from "../../store/actionTypes";

const AddTodoForm = (props) => {

    const textInputRef = useRef(null);

    const handleFormSubmit = () => {
        props.addTodoItem(textInputRef.current.value);
    }

    return (
        <div className="form">
            <div className="input-group">
                <span className="label">Name:</span>
                <input type="text" ref={textInputRef} />
            </div>
            <div className="submit">
                <button onClick={handleFormSubmit}>Add</button>
            </div>
        </div>
    )
}

export default connect(
    state => ({ todoItemList: state.todoItemList }),
    dispatch => ({ addTodoItem: (todoTitle) => dispatch({ type: ADD_TODO, todoTitle: todoTitle }) })
)(AddTodoForm);
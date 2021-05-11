import React from "react";
import { connect, useSelector } from "react-redux";

import { ADD_TODO } from "../../store/actionTypes";
import ErrorMessage from "../UI/ErrorMessage"

class AddTodoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: false, errorMsg: null }
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.focus();
        this.inputRef.current.addEventListener('keydown', this.inputKeydownHandler);
    }

    inputKeydownHandler = event => {
        if (event.code === 'Enter') {
            this.handleAddTodo();
        }
    }

    handleAddTodo = () => {
        const newTodoName = this.inputRef.current.value;
        this.checkForTodoNameErrors(newTodoName);
        if (!this.state.error) {
            this.props.addTodoItem(newTodoName);
            this.props.closeHandler();
        }
    }

    todoWithNameExists = name => this.props.todoItemList.find(todo => todo.name === name.trim());

    todoNameInvalid = name => name.trim().length < 3;

    checkForTodoNameErrors = name => {
        if (this.todoNameInvalid(name)) {
            this.setState({ error: true, errorMsg: 'Invalid name! (min. 3 characters)' });
        } else if (this.todoWithNameExists(name)) {
            this.setState({ error: true, errorMsg: 'Todo with name already exists!' });
        } else {
            this.setState({ error: false });
        }
    }

    render() {
        const error = this.state.error ? <ErrorMessage msg={this.state.errorMsg}></ErrorMessage> : null;
        return (
            <div className="form">
                <div className="input-group">
                    <span className="label">Name:</span>
                    <input type="text" ref={this.inputRef} />
                </div>
                {error}
                <div className="submit">
                    <button onClick={this.handleAddTodo}>Add</button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ todoItemList: state.todoItemList }),
    dispatch => ({ addTodoItem: (todoTitle) => dispatch({ type: ADD_TODO, todoTitle: todoTitle }) })
)(AddTodoForm);
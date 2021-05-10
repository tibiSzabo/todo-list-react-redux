import React from "react";
import { connect } from "react-redux";

import { ADD_TODO } from "../../store/actionTypes";
import ErrorMessage from "../UI/ErrorMessage"

class AddTodoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: false }
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    handleAddTodo = () => {
        const newTodoName = this.inputRef.current.value;
        const error = this.todoWithNameExists(newTodoName)
        this.setState({ error: error })
        if (!error) {
            this.props.addTodoItem(newTodoName);
        }
    }

    todoWithNameExists = name => this.props.todoItemList.filter(todo => todo.name === name).length > 0;

    render() {
        const error = this.state.error ? <ErrorMessage msg="Todo already exists"></ErrorMessage> : null;
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
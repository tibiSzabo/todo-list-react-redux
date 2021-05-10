import { connect } from "react-redux";
import { DELETE_TODO, TOGGLE_TODO } from "../../store/actionTypes";

const TodoItem = props => {

    const deleteIconClickHandler = () => props.deleteTodoItem(props.todo.id);
    const editIconClickHandler = () => {};
    const doneIconClickHandler = () => props.toggleTodoItem(props.todo.id);

    return (
        <div className="todo-item">
            <div>{props.todo.name}</div>
            <div className="todo-item-icons">
                <i className="far fa-trash-alt" onClick={deleteIconClickHandler}></i>
                <i className="far fa-edit"></i>
                <i className="far fa-check-square" onClick={doneIconClickHandler}></i>
            </div>
        </div>
    )
}

export default connect(
    null,
    dispatch => ({ 
        deleteTodoItem: (todoId) => dispatch({ type: DELETE_TODO, id: todoId }),
        toggleTodoItem: (todoId) => dispatch({ type: TOGGLE_TODO, id: todoId })
 })
)(TodoItem);
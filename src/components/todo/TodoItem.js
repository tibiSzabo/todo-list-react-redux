const TodoItem = props => {
    return (
        <div className="todo-item">
            <div>{props.name}</div>
            <div className="todo-item-icons">
                <i className="far fa-trash-alt"></i>
                <i className="far fa-edit"></i>
                <i className="far fa-check-square"></i>
            </div>
        </div>
    )
}

export default TodoItem;
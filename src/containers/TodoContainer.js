import React from 'react';
import TodoItem from '../components/todo/TodoItem';

const TodoContainer = props => {

    return (
        <div className="todo-container">
            {props.todoList && props.todoList.map(todoItem =>
                    <TodoItem todo={todoItem} key={todoItem.id}></TodoItem>)}
        </div>
    );

};

export default TodoContainer;
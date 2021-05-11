import React from 'react';
import TodoItem from '../components/todo/TodoItem';

const DoneContainer = (props) => {

    const todoList = props.todoList ?
        props.todoList.map(todoItem => todoItem.done ? <TodoItem todo={todoItem} key={todoItem.id}></TodoItem> : null)
        : null;

    return (
        <div className="todo-container todo-container-done">
            {todoList}
        </div>
    );
};

export default DoneContainer;
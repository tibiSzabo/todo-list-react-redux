import React from 'react';
import TodoItem from '../components/todo/TodoItem';

const DoneContainer = (props) => {

    const todoList = props.todoList ? props.todoList.map(todoItem => {
        if (todoItem.done) {
            return <TodoItem todo={todoItem} key={todoItem.id}></TodoItem>
        }
    }) : null;

    return (
        <div className="todo-container todo-container-done">
            {todoList}
        </div>
    );
};

export default DoneContainer;
import React from 'react';
import TodoItem from '../components/todo/TodoItem';

const TodoContainer = props => {

    const todoList = props.todoList ? props.todoList.map(todoItem => {
        if (!todoItem.done) {
            return <TodoItem todo={todoItem} key={todoItem.id}></TodoItem>
        }
        return null;
    }) : null;

    return (
        <div className="todo-container">
            {todoList}
        </div>
    );

};

export default TodoContainer;
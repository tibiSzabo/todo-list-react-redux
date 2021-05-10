import React from 'react';
import TodoItem from '../components/todo/TodoItem';

const TodoContainer = props => {

    const todoList = props.todoList.map(todoItem => {
        if (!todoItem.done) {
            return <TodoItem name={todoItem.name} key={todoItem.id}></TodoItem>
        }
        return null;
    });

    console.log(todoList);

    return (
        <div className="todo-container">
            {todoList}
        </div>
    );

};

export default TodoContainer;
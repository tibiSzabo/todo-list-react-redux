import React from 'react';
import TodoItem from '../components/todo/TodoItem';

const TodoContainer = props => {

    const { todoList } = props;

    return (
        <div className="todo-container">
            {todoList && todoList.map(todoItem =>
                <TodoItem todo={todoItem} key={todoItem.id} />)}
        </div>
    );

};

export default TodoContainer;
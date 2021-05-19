import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import TodoItem from '../components/todo/TodoItem';
import * as todoActionTypes from "../store/actions/todoActions";


const TodoContainer = props => {

    const { todoList, doneContainer } = props;

    const dispatch = useDispatch();

    const onTodoDrop = event => {
        const droppedTodoId = +event.dataTransfer.getData('id');
        const droppedToOwnContainer = todoList.find(i => i.id === droppedTodoId);
        const droppedOnTodoEl = droppedOnTodo(event.nativeEvent);

        if (!droppedToOwnContainer) {
            if (!doneContainer && droppedOnTodoEl) {
                // done -> todo: toggle & reorder
                console.log(`dropped on element id: ${droppedOnTodoEl.dataset.id} order: ${droppedOnTodoEl.dataset.order} under: ${droppedUnderTodo(event.nativeEvent)}`);
                const newOrder = +droppedOnTodoEl.dataset.order + (droppedUnderTodo(event.nativeEvent) ? 1 : 0);
                dispatch(todoActionTypes.toggleAndReorderTodo(droppedTodoId, newOrder));
            } else {
                // todo -> done: only toggle
                dispatch(todoActionTypes.toggleTodo(droppedTodoId));
            }
        } else {
            if (!doneContainer && droppedOnTodoEl) {
                // todo -> todo: reorder
                const newOrder = +droppedOnTodoEl.dataset.order + (droppedUnderTodo(event.nativeEvent) ? 1 : 0);
                dispatch(todoActionTypes.reorderTodo(droppedTodoId, newOrder));
            }
        }

    }

    const droppedOnTodo = dragEvent => {
        const droppedOnTodo = dragEvent.path.find(el => el.className === 'todo-item');
        return droppedOnTodo ? droppedOnTodo : null;
    }

    const droppedUnderTodo = dragEvent => {
        const droppedOn = dragEvent.path.find(el => el.className === 'todo-item');
        var rect = droppedOn.getBoundingClientRect();
        return dragEvent.clientY > (rect.top + rect.bottom) / 2;
    }

    return (
        <div className={clsx('todo-container', doneContainer && 'todo-container-done')}
            onDragOver={event => event.preventDefault()}
            onDrop={onTodoDrop}>
            {todoList && todoList.map(todoItem =>
                <TodoItem todo={todoItem} key={todoItem.id} />)}
        </div>
    );

};

export default TodoContainer;
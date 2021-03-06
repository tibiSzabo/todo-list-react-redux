import * as actionTypes from './actionTypes';

export const addTodo = title => {
    return { type: actionTypes.ADD_TODO, todoTitle: title };
};

export const editTodo = (id, newName) => {
    return { type: actionTypes.EDIT_TODO, newName: newName, id: id };
};

export const deleteTodo = id => {
    return { type: actionTypes.DELETE_TODO, id: id };
};

export const toggleTodo = id => {
    return { type: actionTypes.TOGGLE_TODO, id: id };
};

export const reorderTodo = (id, newOrder) => {
    return { type: actionTypes.REORDER_TODO, id: id, newOrder: newOrder };
};

export const toggleAndReorderTodo = (id, newOrder) => {
    return dispatch => {
        dispatch(toggleTodo(id));
        dispatch(reorderTodo(id, newOrder));
    }
};

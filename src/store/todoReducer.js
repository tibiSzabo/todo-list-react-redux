import { ADD_TODO, DELETE_TODO } from "./actionTypes";

const initialState = {
    todoItemList: [
        // { name: String, id: Number, done: Boolean, order: Number }
    ],
    nextId: 0
};

const todoReducer = (state = initialState, action) => {
    console.log('[todoReducer] : ', action);

    const getHighestOrder = todoList => {
        if (todoList.length === 0) return 0;
        return Math.max.apply(Math, todoList.map(t => t.order));
    };

    switch (action.type) {

        case ADD_TODO:
            return {
                ...state,
                todoItemList: [
                    ...state.todoItemList.map(i => ({ ...i })),
                    {
                        name: action.todoTitle.trim(),
                        id: state.nextId,
                        done: false,
                        order: getHighestOrder(state.todoItemList.filter(i => !i.done)) + 1
                    }
                ],
                nextId: state.nextId + 1
            };

        case DELETE_TODO:
            return {
                ...state,
                todoItemList: [
                    ...state.todoItemList.reduce((acc, curr) => {
                        if (curr.id !== action.id) {
                            acc.push({ ...curr })
                        }
                        return acc;
                    }, [])
                ]
            }

        default: {
            return state;
        }
    }

}

export default todoReducer;
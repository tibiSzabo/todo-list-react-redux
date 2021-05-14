import { ADD_TODO, DELETE_TODO, EDIT_TODO, TOGGLE_TODO } from "./actionTypes";

const initialState = {
    todoItemList: [
        // { name: String, id: Number, done: Boolean, order: Number }
    ],
    nextId: 0
};

const todoReducer = (state = initialState, action) => {
    console.log('[todoReducer] : ', action);

    const createMaxOrder = () => {
        const todoList = state.todoItemList.filter(i => !i.done);
        if (todoList.length === 0) return 1;
        return Math.max.apply(Math, todoList.map(t => t.order)) + 1;
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
                        order: createMaxOrder()
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

        case TOGGLE_TODO:
            return {
                ...state,
                todoItemList: [
                    ...state.todoItemList.reduce((acc, curr) => {
                        if (curr.id === action.id) {
                            curr.done = !curr.done;
                            curr.order = curr.done ? null: createMaxOrder();
                        }
                        acc.push({ ...curr })
                        return acc;
                    }, [])
                ]
            }

        case EDIT_TODO:
            return {
                ...state,
                todoItemList: [
                    ...state.todoItemList.reduce((acc, curr) => {
                        if (curr.id === action.id) {
                            curr.name = action.newName;
                        }
                        acc.push({ ...curr })
                        return acc;
                    }, [])
                ]
            }

        default:
            return state;
    }

}

export default todoReducer;
const initialState = {
    todoItemList: []
};

const todoReducer = (state = initialState, action) => {
    console.log('[todoReducer] : ', action)
    return state;
}

export default todoReducer;
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import todoReducer from "./todoReducer";

let preloadedState;
const storageData = localStorage.getItem('store');

if (storageData) { preloadedState = JSON.parse(storageData); }

export default createStore(
  todoReducer,
  preloadedState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

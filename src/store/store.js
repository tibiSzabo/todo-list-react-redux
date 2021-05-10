import { createStore } from "redux";
import todoReducer from "./todoReducer";

let preloadedState;
const storageData = localStorage.getItem('store');

if (storageData) {
  preloadedState = JSON.parse(storageData);
}

export default createStore(todoReducer, preloadedState);
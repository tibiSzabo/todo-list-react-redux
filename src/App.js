import Title from './components/UI/Title';
import TodoContainer from './containers/TodoContainer';
import Modal from './components/UI/Modal';
import AddTodoForm from './components/todo/AddTodoForm'
import './App.sass';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import store from './store/store';

const App = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const todoItemListSelector = state => state?.todoItemList;
    const todoItemList = useSelector(todoItemListSelector);

    useEffect(() => {
        const storeSub = store.subscribe(persistStoreListener);
        return () => { storeSub.unsubscribe(); }
    }, []);

    const addTodoHander = () => setModalOpen(true);

    const closeModalHandler = () => setModalOpen(false);

    const persistStoreListener = () => localStorage.setItem('store', JSON.stringify(store.getState()));

    return (
        <div className="main">
            <Title title="Todo list" />
            <Modal title="Add TODO" closeHandler={closeModalHandler} open={modalOpen}>
                <AddTodoForm closeHandler={closeModalHandler} />
            </Modal>
            <TodoContainer todoList={todoItemList.filter(i => !i.done)} />
            <button onClick={addTodoHander}>Add</button>
            <TodoContainer todoList={todoItemList.filter(i => i.done)} doneContainer={true} />
        </div>
    );
}

export default App;

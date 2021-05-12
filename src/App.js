import Title from './components/UI/Title';
import TodoContainer from './containers/TodoContainer';
import Modal from './components/UI/Modal';
import AddTodoForm from './components/todo/AddTodoForm'
import './App.sass';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import store from './store/store';

const App = props => {

    const [modalOpen, setModalOpen] = useState(false);

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
                <AddTodoForm closeHandler={closeModalHandler}></AddTodoForm>
            </Modal>
            <TodoContainer todoList={props.todoList}></TodoContainer>
            <button onClick={addTodoHander}>Add</button>
            <TodoContainer todoList={props.doneList}></TodoContainer>
        </div>
    );
}

export default connect(
    state => ({
            todoList: state.todoItemList.filter(i => !i.done),
            doneList: state.todoItemList.filter(i => i.done)
        })
)(App);

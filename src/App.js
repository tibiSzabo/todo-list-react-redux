import Title from './components/UI/Title';
import DoneContainer from './containers/DoneContainer';
import TodoContainer from './containers/TodoContainer';
import Overlay from './components/UI/Overlay'
import Modal from './components/UI/Modal'
import AddTodoForm from './components/todo/AddTodoForm'
import './App.sass';
import React from 'react';
import { connect } from 'react-redux';
import store from './store/store';

class App extends React.Component {
    state = {
        modalOpen: false
    }

    componentDidMount() {
        this.storeSub = store.subscribe(this.persistStoreListener);
    }

    componentWillUnmount() {
        this.storeSub.unsubscribe();
    }

    addTodoHander = () => this.setState({ modalOpen: true });

    closeModalHandler = () => this.setState({ modalOpen: false });

    persistStoreListener = () => localStorage.setItem('store', JSON.stringify(store.getState()));

    render() {
        const addTodoModal = this.state.modalOpen ? (
            <React.Fragment>
                <Overlay clickHandler={this.closeModalHandler}></Overlay>
                <Modal title="Add TODO" closeHandler={this.closeModalHandler}>
                    <AddTodoForm closeHandler={this.closeModalHandler}></AddTodoForm>
                </Modal>
            </React.Fragment>
        ) : null;

        return (
            <div className="main">
                <Title title="Todo list" />
                {addTodoModal}
                <TodoContainer todoList={this.props.todoItemList}></TodoContainer>
                <button onClick={this.addTodoHander}>Add</button>
                {/* <DoneContainer></DoneContainer> */}
            </div>
        );
    }
}

export default connect(
    state => ({todoItemList: state.todoItemList})
)(App);

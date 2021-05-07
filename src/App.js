import Title from './components/UI/Title';
import DoneContainer from './containers/DoneContainer';
import TodoContainer from './containers/TodoContainer';
import Overlay from './components/UI/Overlay'
import Modal from './components/UI/Modal'
import AddTodoForm from './components/todo/AddTodoForm'
import './App.sass';
import React from 'react';

class App extends React.Component {
    state = {
        modalOpen: false
    }
    
    componentDidMount() {
        
    }

    addTodoHander = () => this.setState({ modalOpen: true });

    closeModalHandler = () => this.setState({ modalOpen: false });

    initStateFromLocalStorage = () => {
        // const localStorageData = localStorage.getItem()
    }

    render() {
        const addTodoModal = this.state.modalOpen ? (
            <React.Fragment>
                <Overlay clickHandler={this.closeModalHandler}></Overlay>
                <Modal title="Add TODO">
                    <AddTodoForm></AddTodoForm>
                </Modal>
            </React.Fragment>
        ) : null;

        return (
            <div className='main'>
                <Title title="Todo list" />
                {addTodoModal}
                <TodoContainer></TodoContainer>
                <button onClick={this.addTodoHander}>Add</button>
                <DoneContainer></DoneContainer>
            </div>
        );
    }
}

export default App;

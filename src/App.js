import Title from './components/UI/Title';
import DoneContainer from './containers/DoneContainer';
import TodoContainer from './containers/TodoContainer';
import Overlay from './components/UI/Overlay'
import Modal from './components/UI/Modal'
import './App.sass';
import React from 'react';

class App extends React.Component {
    state = {
        modalOpen: false
    }

    addTodoHander = () => this.setState({ modalOpen: true });

    closeModalHandler = () => this.setState({ modalOpen: false });

    render() {
        const modal = this.state.modalOpen ? (
            <React.Fragment>
                <Overlay clickHandler={this.closeModalHandler}></Overlay>
                <Modal></Modal>
            </React.Fragment>
        ) : null;

        return (
            <div className='main'>
                <Title title="Todo list" />
                {modal}
                <TodoContainer></TodoContainer>
                <button onClick={this.addTodoHander}>Add</button>
                <DoneContainer></DoneContainer>
            </div>
        );
    }
}

export default App;

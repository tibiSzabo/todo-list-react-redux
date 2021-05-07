import Title from './Title';

const Modal = (props) => (
    <div className='modal'>
        <Title title={props.title}></Title>
        {props.children}
    </div>
);

export default Modal;
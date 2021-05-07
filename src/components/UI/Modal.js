import Title from './Title';

const Modal = (props) => (
    <div className="modal">
        <Title title={props.title}></Title>
        <div className="modal-body">
            {props.children}
        </div>
    </div>
);

export default Modal;
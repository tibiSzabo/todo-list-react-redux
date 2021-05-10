import { useEffect, useRef } from 'react';
import Title from './Title';

const Modal = (props) => {

    let modalRef = useRef(null);

    useEffect(() => {
        modalRef.current.addEventListener('keydown', handleKeydown)
        console.log(modalRef)
    });

    const handleKeydown = event => {
        if (event.code === 'Escape') {
            props.closeHandler();
        }
    }

    return (
        <div className="modal" ref={modalRef}>
            <Title title={props.title}></Title>
            <div className="modal-body">
                {props.children}
            </div>
        </div>
    )
};

export default Modal;
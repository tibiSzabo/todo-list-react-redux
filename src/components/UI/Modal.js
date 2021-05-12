import { useEffect, useRef } from 'react';
import Title from './Title';
import Overlay from './Overlay';

const Modal = (props) => {

    let modalRef = useRef(null);

    useEffect(() => {
        if (props.open) {
            modalRef.current.addEventListener('keydown', handleKeydown);
        }
    });

    const handleKeydown = event => {
        if (event.code === 'Escape') {
            props.closeHandler();
        }
    };

    return props.open ? (
        <>
            <Overlay clickHandler={props.closeHandler}></Overlay>
            <div className="modal" ref={modalRef}>
                <Title title={props.title}></Title>
                <div className="modal-body">
                    {props.children}
                </div>
            </div>
        </>
    ) : null;
};

export default Modal;
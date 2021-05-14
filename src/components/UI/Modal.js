import { useEffect, useRef } from 'react';
import Title from './Title';
import Overlay from './Overlay';

const Modal = (props) => {

    const { open, closeHandler, children } = props;

    let modalRef = useRef(null);

    useEffect(() => {
        if (open) {
            modalRef.current.addEventListener('keydown', handleKeydown);
        }
    });

    const handleKeydown = event => {
        if (event.code === 'Escape') {
            closeHandler();
        }
    };

    return open ? (
        <>
            <Overlay clickHandler={closeHandler}></Overlay>
            <div className="modal" ref={modalRef}>
                <Title title={props.title}></Title>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </>
    ) : null;
};

export default Modal;
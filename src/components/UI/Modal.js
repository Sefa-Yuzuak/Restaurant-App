import { Fragment, } from 'react';
import  ReactDOM  from 'react-dom';

import classes from './Modal.module.css'

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
};

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays');

const Modal = props => {
    return (
      <Fragment>
        {/* <Backdrop />
        <ModalOverlay>{props.children}</ModalOverlay> */}


        {/* React portal, bir child component’ini DOM hiyerarşisinden ayrı olarak,
        React component ağacı üzerinden event propagation’ının default
        davranışlarını bozmadan render etmek istediğiniz zaman avantaj
        sağlamaktadır. Modal, tooltip, popup mesajları ve daha fazlasını render
        ederken fayda sağlar. */}

        
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
        {ReactDOM.createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          portalElement
        )}
      </Fragment>
    );
}

export default Modal;
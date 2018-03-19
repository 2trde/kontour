import React from 'react';
import {Modal} from 'react-overlays'

const MyModal = ({show, onHide, width, children}) => {
  const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
  };
  const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
  };
  const dialogStyle = function() {
    let top = 50;
    let left = 50;

    return {
      position: 'absolute',
      width: width,
      top: top + '%', left: left + '%',
      transform: `translate(-${top}%, -${left}%)`,
      border: '1px solid #e5e5e5',
      backgroundColor: 'white',
      boxShadow: '0 5px 15px rgba(0,0,0,.5)',
      padding: 20
    };
  };
  return <Modal 
        aria-labelledby='modal-label'
        style={modalStyle}
        backdropStyle={backdropStyle}
        show={show}
        onHide={onHide}>
    <div style={dialogStyle()} >
      {children}
    </div>
  </Modal>
}

export {MyModal}

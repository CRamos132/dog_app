import React from 'react';
import './index.css';
import { Dialog, Typography, Button } from '@material-ui/core';

interface modalState {
    aberto: boolean,
    texto: string,
    extra: Function
}
interface ModalProps {
    modal: modalState,
    altera: Function,
    valoresIniciais: modalState
}

function Modal({ modal, altera, valoresIniciais }: ModalProps) {
  function handleClose() {
    modal.extra();
    altera(valoresIniciais);
  }
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={modal.aberto}>
      <div className="modal_main">
        <Typography data-testid="modal_txt" >{modal.texto}</Typography>
        <Button className="modal_btn" variant="contained" color="primary" onClick={handleClose}>
          Ok
        </Button>
      </div>
    </Dialog>
  );
}

export default Modal;

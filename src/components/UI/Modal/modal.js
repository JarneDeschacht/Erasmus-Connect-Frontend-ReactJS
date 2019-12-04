import React from "react";
import Modal from "@material-ui/core/Modal";
import classes from './modal.module.css';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const SimpleModal = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.onClose}
      >
        <div style={modalStyle} className={classes.Modal}>
        <CloseOutlinedIcon className={classes.Close} onClick={props.onClose}/>
          {props.children}
        </div>
      </Modal>
    </div>
  );
};

export default SimpleModal;

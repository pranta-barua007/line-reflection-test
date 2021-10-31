import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import{ Modal, Backdrop, Fade, Button }from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#1b2021',
    borderRadius: '8px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'white'
  },
}));

export const CustomPopUpButton = ({ PopUpModal, CustomIcon, buttonName, ...otherProps }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" 
        onClick={handleOpen}
        variant="contained"
        color="primary"
        startIcon={<CustomIcon/>}
        {...otherProps}
      >
        {buttonName}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{buttonName}</h2>
            <PopUpModal isModelOpen={open}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default CustomPopUpButton;
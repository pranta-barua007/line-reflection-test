import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIconon from '@material-ui/icons/AddCircleOutline';
import{ Modal, Backdrop, Fade, Button }from '@material-ui/core';

import BookingModal from '../../modals/booking-modal/booking-modal.component';

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

export const BookingButton = () => {
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
        startIcon={<AddCircleOutlineIconon/>}
      >
        Book Item
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
            <h2 id="transition-modal-title">Book a product</h2>
            <BookingModal />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default BookingButton;
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

export default function DeleteModal(props) {
  const { open, handleOpen } = props;
  
  const onConfirm = () => {
    // TODO - For now, we'll only close the modal...
    handleOpen(false);
  };
  const onCancel = () => {
    // TODO - For now, we'll only close the modal...
    handleOpen(false);
  };

  return(
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert--dialog-title">Are you sure you want to delete this resource?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The operation cannot be undone
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} color="primary">Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
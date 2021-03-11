import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

class SettingsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.config = props.config;
    this.state = {
      open: props.open,
      data: {},
    };
  }

  handleClose() {
    console.log("Closed");
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.state.open}>
        <DialogTitle>设置</DialogTitle>
      </Dialog>
    );
  }
};


export default SettingsDialog;

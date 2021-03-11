import React from "react"
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

class MyButton extends React.Component {
  constructor(props) {
    super(props)
    this.icon = props.icon;
    this.text = props.text;
    this.color = props.color ? props.color : "primary";
    this.onClick = props.onClick;
  }
  render() {
    return (<div style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <IconButton aria-label="play" color={this.color} onClick={this.onClick}>
        <this.icon />
      </IconButton>
      <Typography variant="caption" display="block" style={{ color: "#9e9e9e" }}>
        {this.text}
      </Typography>
    </div>);
  }
};

export default MyButton;
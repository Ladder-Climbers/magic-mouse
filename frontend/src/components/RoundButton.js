import React from "react"
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

class RoundButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // 就直接返回按钮好了
    return (<div style={{ width: "100%" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button color="primary">·</Button>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Button color="primary" style={{ height: "100%" }}>·</Button>
        <IconButton aria-label="play">
          <PlayArrowIcon />
        </IconButton>
        <Button color="primary" style={{ height: "100%" }}>·</Button>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button color="primary">·</Button>
      </div>
    </div>);
  }
};

export default RoundButton;
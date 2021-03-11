import React from "react"
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MouseIcon from '@material-ui/icons/Mouse';

class RoundButton extends React.Component {
  render() {
    // 就直接返回按钮好了
    return (<div style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button size="large" color="primary" style={{ width: 100 }}>·</Button>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Button size="large" color="primary" style={{ height: 100 }}>·</Button>
        <IconButton aria-label="play" style={{ height: 100, width: 100 }}>
          <MouseIcon style={{ height: 100, width: 100 }}/>
        </IconButton>
        <Button size="large" color="primary" style={{ height: 100 }}>·</Button>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Button size="large" color="primary" style={{ width: 100 }}>·</Button>
      </div>
    </div>);
  }
};

export default RoundButton;
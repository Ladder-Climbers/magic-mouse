import React from "react"
import { Button } from '@material-ui/core';
import RoundButton from "./components/RoundButton"
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class App extends React.Component {
  API = "wws://www.chiro.work:14514/api/v1/ws";
  constructor(props) {
    super(props)
    this.orientationHandler = this.orientationHandler.bind(this);
    // this.motionHandler = this.motionHandler.bind(this);

    this.state = {
      orientation: {},
      motion: {}
    };

    // if (window.DeviceMotionEvent) {
    //   window.addEventListener("devicemotion", this.throttle(this.motionHandler, 30, 45), false);
    // } else {
    //   console.log("Does not support devicemotion!");
    // }

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.throttle(this.orientationHandler, 30, 45), false);
    } else {
      console.log("Does not support deviceorientation!");
    };
  }

  throttle(method, delay, duration) {
    var timer = null,
      begin = new Date();
    return function () {
      var context = this,
        args = arguments,
        current = new Date();
      clearTimeout(timer);
      if (current - begin >= duration) {
        method.apply(context, args);
        begin = current;
      } else {
        timer = setTimeout(function () {
          method.apply(context, args);
        }, delay);
      }
    }
  }

  orientationHandler = (event) => {
    console.log("orientation", event);
    this.setState({
      orientation: event
    });
  }

  // motionHandler = (event) => {
  //   console.log("motion", event);
  //   this.setState({
  //     motion: event
  //   });
  // }

  render() {
    return (<div>
      <Container maxWidth="xs">
        <div style={{ width: "100%" }}>

        </div>
        <div>
          <RoundButton></RoundButton>
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ButtonGroup size="large" color="primary">
            <Button>左键</Button>
            <Button>中键</Button>
            <Button>右键</Button>
          </ButtonGroup>
        </div>
        <div>
          <span>Orientation: </span><div>
            {JSON.stringify({
              alpha: Math.floor(360 - this.state.orientation.alpha),
              beta: Math.floor(this.state.orientation.beta),
              gamma: Math.floor(this.state.orientation.gamma)
            })}
          </div>
        </div>
      </Container>
    </div>)
  }
};

export default App;
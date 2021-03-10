import React from "react"
import { Button } from '@material-ui/core';
import RoundButton from "./components/RoundButton"
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Config from "./Config"
import MyButton from "./components/MyButton"
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import SettingsIcon from '@material-ui/icons/Settings';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class App extends React.Component {
  API = "wws://www.chio.work:14514/api/v1/ws";

  constructor(props) {
    super(props)
    this.orientationHandler = this.orientationHandler.bind(this);
    // this.motionHandler = this.motionHandler.bind(this);

    this.config = new Config();

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
      window.addEventListener("deviceorientation", this.throttle(this.orientationHandler, 60, 60), false);
    } else {
      console.log("Does not support deviceorientation!");
    };
    console.log(this.config);
    console.log(this.config.theme);
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
      <ThemeProvider theme={this.config.theme}>
        <Container maxWidth="xs">
          <div style={{ width: "100%" }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <MyButton icon={SettingsIcon} text={"设置"}></MyButton>
              </Grid>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={6}>
                <Alert severity="info">正在计时...</Alert>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <MyButton icon={PowerSettingsNewIcon} color="secondary" text={"连接"}></MyButton>
              </Grid>
              <Grid item xs={4}>
                <MyButton icon={AvTimerIcon} text={"计时"}></MyButton>
              </Grid>
              <Grid item xs={4}>
                <MyButton icon={ExitToAppIcon} text={"断开"}></MyButton>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <ButtonGroup color="primary">
                    <Button>开始</Button>
                    <Button>退出</Button>
                  </ButtonGroup>
                </div>
              </Grid>
              <Grid item xs={7}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <ButtonGroup color="primary">
                    <Button variant="contained" disableElevation>书写</Button>
                    <Button>激光</Button>
                    <Button variant="contained" disableElevation>墨迹</Button>
                  </ButtonGroup>
                </div>
              </Grid>
            </Grid>
          </div>
          <RoundButton></RoundButton>
          {/* 便捷单手操作 */}
          <div style={{ width: "60%", display: "flex", justifyContent: "flex-end", alignItems: "center", position: "fixed", bottom: "8%", right: "10%" }}>
            <ButtonGroup size="large" variant="contained" color="primary" disableElevation>
              <Button>&lt;  后退</Button>
              <Button>前进  &gt;</Button>
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
      </ThemeProvider>
    </div >)
  }
};

export default App;
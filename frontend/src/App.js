import React from "react"
import { Button } from '@material-ui/core';
import MouseIcon from '@material-ui/icons/Mouse';
import IconButton from '@material-ui/core/IconButton';
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
import SettingsDialog from './components/SettingsDialog'
import { dataAngleFrame, dataWrapper } from "./utils/DataBeans"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.orientationHandler = this.orientationHandler.bind(this);
    this.render = this.render.bind(this);
    this.connectStart = this.connectStart.bind(this);
    this.connectEnd = this.connectEnd.bind(this);
    this.handleButtons = this.handleButtons.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);

    this.config = new Config();
    // 没开始连接，未初始化
    this.ws = null;
    this.connecting = false;
    // 初始化
    this.angleInit = null;

    this.state = {
      orientation: {},
      openSettings: false,
      connected: false,
      playing: false,
      writing: false,
      laser: false,
      ink: true,
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.throttle(this.orientationHandler, 40, 40), false);
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
    if (!this.state.connected || !this.ws) return;
    if (typeof (event.alpha) === 'null') {
      console.warn("Handle: null event!");
      return;
    }
    if (!this.angleInit) {
      this.angleInit = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      }
    }
    this.ws.send(JSON.stringify(dataAngleFrame({
      alpha: event.alpha - this.angleInit.alpha,
      beta: event.beta - this.angleInit.beta,
      gamma: event.gamma - this.angleInit.gamma
    })));
    // console.log("orientation", event);
  }

  connectStart() {
    this.connecting = true;
    try {
      this.ws = new WebSocket(this.config.data.api);
      this.ws.onopen = () => {
        console.log("Ws: connected.");
        this.ws.send(JSON.stringify(dataWrapper("start")));
        this.setState({
          connected: true
        });
      };
      this.ws.onclose = () => {
        this.setState({
          connected: false
        });
        console.log("Ws: closed.");
        this.ws = null;
      };
      this.ws.onerror = () => {
        console.error("Websocket Error!!!");
      };
    } catch (e) {
      console.error('Error when trying to connect!', e);
    }
    this.connecting = false;
    console.log('this.ws', this.ws);
  }

  connectEnd() {
    if (!this.ws || !this.state.connected || this.connecting) return;
    this.ws.close();
    this.angleInit = null;
  }

  connectStop() {
    if (!this.ws || !this.state.connected || this.connecting) return;
    this.ws.send(JSON.stringify(dataWrapper("stop_from_client")));
    this.connectEnd();
  }

  handleButtons(button) {
    console.log("handleButtons:", button);
    if (!button || !this.state.connected || !this.ws) return;
    let keys = this.config.key_mapping[button];
    if (!keys) return;

    this.ws.send(JSON.stringify(dataWrapper("key", {
      keys: keys
    })));
  }

  handleMouseClick(button) {
    console.log("handleMouseClick:", button);
    if (!this.state.connected || !this.ws) return;

    this.ws.send(JSON.stringify(dataWrapper("mouse", {
      mouse_key: button
    })));
  }

  render() {
    return (<div>
      <ThemeProvider theme={this.config.theme}>
        <SettingsDialog open={this.state.openSettings} config={this.config} />
        <Container maxWidth="xs">
          <div style={{ width: "100%" }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <MyButton icon={SettingsIcon} text={"设置"} onClick={() => {
                  this.setState({
                    openSettings: true
                  });
                }}></MyButton>
              </Grid>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={6}>
                <Alert severity="info">正在计时...</Alert>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <MyButton icon={PowerSettingsNewIcon} color="success" text={"连接"} onClick={() => {
                  if (this.connecting) return;
                  if (!this.state.connected) {
                    this.connectStart();
                  } else {
                    this.connectEnd();
                  }
                }}></MyButton>
              </Grid>
              <Grid item xs={4}>
                <MyButton icon={AvTimerIcon} text={"计时"}></MyButton>
              </Grid>
              <Grid item xs={4}>
                <MyButton icon={ExitToAppIcon} text={"关闭"} onClick={() => {
                  this.connectStop();
                }}></MyButton>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <ButtonGroup color="primary">
                    <Button onClick={() => {
                      this.handleButtons("start");
                      this.setState({ playing: true });
                    }}>开始</Button>
                    <Button onClick={() => {
                      this.handleButtons("stop");
                    }}>退出</Button>
                  </ButtonGroup>
                </div>
              </Grid>
              <Grid item xs={7}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <ButtonGroup color="primary">
                    <Button variant={this.state.writing ? "contained" : "outlined"} disableElevation onClick={() => {
                      this.handleButtons("writing");
                      this.setState({ writing: !this.state.writing, laser: this.state.laser ? false : this.state.laser });
                    }}>书写</Button>
                    <Button variant={this.state.laser ? "contained" : "outlined"} disableElevation onClick={() => {
                      this.handleButtons("laser");
                      this.setState({ laser: !this.state.laser, writing: this.state.writing ? false : this.state.writing });
                    }}>激光</Button>
                    <Button variant={this.state.ink ? "contained" : "outlined"} disableElevation onClick={() => {
                      this.handleButtons("ink");
                      this.setState({ ink: !this.state.ink });
                    }}>墨迹</Button>
                  </ButtonGroup>
                </div>
              </Grid>
            </Grid>
          </div>
          <div style={{ width: "100%", height: "100%" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Button size="large" color="primary" style={{ width: 100 }} onClick={() => { this.handleButtons("up"); }}>·</Button>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button size="large" color="primary" style={{ height: 100 }} onClick={() => { this.handleButtons("left"); }}>·</Button>
              <IconButton aria-label="play" style={{ height: 100, width: 100 }} onClick={() => { this.handleMouseClick(0); }}>
                <MouseIcon style={{ height: 100, width: 100 }} />
              </IconButton>
              <Button size="large" color="primary" style={{ height: 100 }} onClick={() => { this.handleButtons("right"); }}>·</Button>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Button size="large" color="primary" style={{ width: 100 }} onClick={() => { this.handleButtons("down"); }}>·</Button>
            </div>
          </div>
          {/* 便捷单手操作 */}
          <div style={{ width: "60%", display: "flex", justifyContent: "flex-end", alignItems: "center", position: "fixed", bottom: "8%", right: "10%" }}>
            <ButtonGroup size="large" variant="contained" color="primary" disableElevation>
              <Button onClick={() => { this.handleButtons("left"); }}>&lt;  后退</Button>
              <Button onClick={() => { this.handleButtons("right"); }}>前进  &gt;</Button>
            </ButtonGroup>
          </div>
        </Container>
      </ThemeProvider>
    </div >)
  }
};

export default App;
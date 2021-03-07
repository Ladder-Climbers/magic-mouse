
// function App() {
//   return (
//     <div className="App">
//       <p>
//         阁下：<span id="alpha">0</span>
//       </p>
//       <p>
//         前后：<span id="beta">0</span>
//       </p>
//       <p>
//         扭转：<span id="gamma">0</span>
//       </p>
//       <p>
//         指北针指向：<span id="heading">0</span>度
// 	</p>
//       <p>
//         指北针精度：<span id="accuracy">0</span>度
// 	</p>
//       <hr />
//       <p>
//         x轴加快度：<span id="x">0</span>米每二次方秒
// 	</p>
//       <p>
//         y轴加快度：<span id="y">0</span>米每二次方秒
// 	</p>
//       <p>
//         z轴加快度：<span id="z">0</span>米每二次方秒
// 	</p>
//       <hr />
//       <p>
//         x轴加快度(推敲重力加快度)：<span id="xg">0</span>米每二次方秒
// 	</p>
//       <p>
//         y轴加快度(推敲重力加快度)：<span id="yg">0</span>米每二次方秒
// 	</p>
//       <p>
//         z轴加快度(推敲重力加快度)：<span id="zg">0</span>米每二次方秒
// 	</p>
//       <hr />
//       <p>
//         阁下扭转速度：<span id="Ralpha">0</span>度每秒
// 	</p>
//       <p>
//         前后扭转速度：<span id="Rbeta">0</span>度每秒
// 	</p>
//       <p>
//         扭转速度：<span id="Rgamma">0</span>度每秒
// 	</p>
//       <hr />
//       <p>
//         前次收到通知的间隔：<span id="interval">0</span>毫秒
// 	</p>
//     </div>
//   );
// }

import React from "react"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      orientation: {},
      motion: {}
    };

    if (window.DeviceMotionEvent){
      window.addEventListener("devicemotion", this.motionHandler, false);
    } else {
      // document.body.innerHTML = "What user agent u r using???";
      console.log("Does not support devicemotion!");
    }
    
    if (window.DeviceOrientationEvent){
      window.addEventListener("deviceorientation", this.orientationHandler, false);
    } else {
      // document.body.innerHTML = "What user agent u r using???";
      console.log("Does not support deviceorientation!");
    };

    this.orientationHandler = this.orientationHandler.bind(this);
    this.motionHandler = this.motionHandler.bind(this);
  }

  orientationHandler = (event) => {
    // document.getElementById("alpha").innerHTML = event.alpha;
    // document.getElementById("beta").innerHTML = event.beta;
    // document.getElementById("gamma").innerHTML = event.gamma;
    // document.getElementById("heading").innerHTML = event.webkitCompassHeading;
    // document.getElementById("accuracy").innerHTML = event.webkitCompassAccuracy;
    console.log("orientation", event);
    this.setState({
      orientation: event
    });
  }
  
  motionHandler = (event) => {
    // document.getElementById("interval").innerHTML = event.interval;
    // var acc = event.acceleration;
    // document.getElementById("x").innerHTML = acc.x;
    // document.getElementById("y").innerHTML = acc.y;
    // document.getElementById("z").innerHTML = acc.z;
    // var accGravity = event.accelerationIncludingGravity;
    // document.getElementById("xg").innerHTML = accGravity.x;
    // document.getElementById("yg").innerHTML = accGravity.y;
    // document.getElementById("zg").innerHTML = accGravity.z;
    // var rotationRate = event.rotationRate;
    // document.getElementById("Ralpha").innerHTML = rotationRate.alpha;
    // document.getElementById("Rbeta").innerHTML = rotationRate.beta;
    // document.getElementById("Rgamma").innerHTML = rotationRate.gamma;
    console.log("motion", event);
    this.setState({
      motion: event
    });
  }
  
  render() {
    return (<div>
      test
    </div>)
  }
};

export default App;
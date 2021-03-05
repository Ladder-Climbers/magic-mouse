# MagicMouse

网页版的无线飞鼠，使用移动硬件的陀螺仪控制鼠标。

## 控制原理

HTML5网页能获取到移动设备的陀螺仪信息，可以利用这个信息控制屏幕上的鼠标移动。

## 计划

### 可行性验证

- [x] HTML5能否获取陀螺仪信息

  - [x] https://blog.csdn.net/qq_30100043/article/details/73323617

    <img src="README.assets/20170616111218449-1614946685636.jfif" alt="img" style="zoom:25%;" /><img src="README.assets/20170616111445577-1614946699217.jfif" alt="img" style="zoom:25%;" /><img src="README.assets/20170616111531843.jfif" alt="img" style="zoom:25%;" />
- [ ] 陀螺仪信息处理
  
  - [ ] 映射方式1：计算角度和初始的差，直接
- [x] 后端能否简便使用Websocket
  - [x] NodeJS的websocket原生支持
  - [x] [Go websocket](https://blog.csdn.net/swan_tang/article/details/103530311)
- [x] 后端能否控制鼠标移动
  - [ ] [RobotJs](https://blog.csdn.net/qq_34995862/article/details/106501587)
  - [x] [RobotGo](https://www.ctolib.com/robotgo.html)
- [ ] 后端能否在屏幕绘图起到提示作用
- [ ] 前端跨平台特性
  
  - [ ] 判断平台对陀螺仪硬件/软件的支持
- [ ] 后端跨平台特性
- [ ] 后端软件封装

### 接口

**API**

1. `/`：静态网页
2. `/api/v1/ws`：websocket接口

**Websocket数据帧**

```json
// 测试连接
{
  "cmd": "test",
  // "data": {}
}
// -> 
{
  "code": 0,
  "message"： "OK",
  "data": {}
}

// 单个角数据帧
{
  "cmd": "angle_frame",
  "data": {
    "alpha": 120.8, // 0 ~ 360
    "beta": 10.64,  // -19 ~ 90
    "gamma": 100,   // -180 ~ 180
  }
}
```

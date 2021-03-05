# MagicMouse

网页版的无线飞鼠，使用移动硬件的陀螺仪控制鼠标。

## 控制原理

HTML5网页能获取到移动设备的陀螺仪信息，可以利用这个信息控制屏幕上的鼠标移动。

## 计划

### 可行性验证

1. [x] HTML5能否获取陀螺仪信息
2. [ ] 陀螺仪信息处理
   1. [ ] 映射方式1：
3. [x] 后端能否简便使用Websocket
   1. [x] NodeJS的websocket原生支持
   2. [x] [Go websocket](https://blog.csdn.net/swan_tang/article/details/103530311)
4. [x] 后端能否控制鼠标移动
    - [RobotJs](https://blog.csdn.net/qq_34995862/article/details/106501587)
    - [RobotGO](https://www.ctolib.com/robotgo.html)
5. [ ] 后端能否在屏幕绘图起到提示作用
6. [ ] 前端跨平台特性
   1. [ ] 判断平台对陀螺仪硬件/软件的支持
7. [ ] 后端跨平台特性
8. [ ] 后端软件封装


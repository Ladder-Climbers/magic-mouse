package mvmouse

import (
	"github.com/go-vgo/robotgo"
	"magic_mouse/app/model/mgmtype"
	"math"
)

func MoveMouse(oriAngle, curAngle mgmtype.Angle, screen mgmtype.Screen, distance float32) {
	robotgo.MoveMouse(
		screen.Width/2-int(float32(math.Tan(float64(curAngle.Alpha-oriAngle.Alpha)*math.Pi/180))*distance),
		screen.Height/2-int(float32(math.Tan(float64(curAngle.Beta-oriAngle.Beta)*math.Pi/180))*distance))
}

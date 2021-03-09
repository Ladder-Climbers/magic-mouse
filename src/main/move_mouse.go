package main

import (
	"github.com/go-vgo/robotgo"
	"math"
)

func moveMouse(oriAngle, curAngle Angle, screen Screen, distance float32) {
	// Hawaii Guitar here!
	robotgo.MoveMouse(screen.Width/2-int(float32(math.Tan(float64(curAngle.Alpha-oriAngle.Alpha)*math.Pi/180))*distance),
		screen.Height/2-int(float32(math.Tan(float64(curAngle.Beta-oriAngle.Beta)*math.Pi/180))*distance))
}

package main

import "github.com/go-vgo/robotgo"

func mouseKeyPress(key int) {
	switch key {
	case 0:
		robotgo.MouseClick("left", false)
	case 1:
		robotgo.MouseClick("right", false)
	case 2:
		robotgo.ScrollMouse(10, "up")
	case 3:
		robotgo.ScrollMouse(10, "down")
	}
}

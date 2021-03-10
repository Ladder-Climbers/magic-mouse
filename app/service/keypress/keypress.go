package keypress

import "github.com/go-vgo/robotgo"

func MouseKeyPress(key int) {
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

func KeyBoardPress(keys []string) {
	// Hawaiian Guitar...
}
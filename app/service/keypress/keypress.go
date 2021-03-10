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
	for _, key := range keys {
		robotgo.KeyToggle(key, "down")
		robotgo.MilliSleep(50)
	}
	robotgo.MilliSleep(100)
	for _, key := range keys {
		robotgo.KeyToggle(key, "up")
	}
}

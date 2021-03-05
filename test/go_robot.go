package main

import (
	"github.com/go-vgo/robotgo"
)

func main() {
	robotgo.SetMouseDelay(0)
	for i := 0; i < 1000; i++ {
		robotgo.MoveMouse(i, 200)
		// time.Sleep(time.Duration(2) * time.Second)
	}
}

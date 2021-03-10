package main

import (
	"github.com/gogf/gf/frame/g"
	_ "magic_mouse/boot"
	_ "magic_mouse/router"
)

func main() {
	g.Server().Run()
}

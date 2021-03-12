package main

import (
	"fmt"
	"github.com/gogf/gf/frame/g"
	"magic_mouse/app/service/droperror"
	"magic_mouse/app/service/ipget"
	_ "magic_mouse/boot"
	_ "magic_mouse/router"
)

func main() {
	fmt.Println("MagicMouse v0.1")
	fmt.Println("(C) Chiro Liang & Hans Wan. Licensed under MIT License.")
	fmt.Println("GoFrame (C) The GoFrame Organization. Licensed under MIT License.")
	fmt.Println("RobotGo (C) Vgo. Licensed under Apache License.")
	fmt.Println("======================================================================")
	fmt.Println("Your IP address(es):")
	ips, err := ipget.GetLocalIP()
	droperror.DropError(err)
	for _, ip := range ips {
		fmt.Println("", ip)
	}
	g.Server().Run()
}

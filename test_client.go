package main

import (
	"github.com/gogf/gf/frame/g"
	"magic_mouse/app/service/client"
	"magic_mouse/app/service/server"
)

func main() {
	s := g.Server()
	s.BindHandler("/api/v1/remote/ws", server.WebSocketServerResponder)
	s.SetPort(8001)
	go func() {
		client.Client("test")
	}()
	s.Run()
}

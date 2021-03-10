package router

import (
	"github.com/gogf/gf/frame/g"
	"magic_mouse/app/api/ws"
)

func init() {
	s := g.Server()
	s.SetServerRoot("/public")
	s.BindHandler("/api/v1/ws", ws.WebSocketResponder)
	s.SetFileServerEnabled(true)
	s.SetPort(14514)
}


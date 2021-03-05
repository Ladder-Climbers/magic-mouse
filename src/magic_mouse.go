package main

import (
	"encoding/json"
	"fmt"
	"github.com/gogf/gf/frame/g"
	"github.com/gogf/gf/net/ghttp"
)

func main() {
	// 静态文件服务器
	wp := g.Server("WebpageService")
	wp.SetServerRoot("./public")
	wp.SetPort(80)
	dropError(wp.Start())

	// WebSocket 服务器
	s := g.Server("WebSocketService")
	s.BindHandler("/api/v1/ws", func(r *ghttp.Request) {
		ws, err := r.WebSocket()
		dropError(err)
		for {
			_, msg, err := ws.ReadMessage()
			dropError(err)
			var message Message
			dropError(json.Unmarshal(msg, &message))
			fmt.Printf("Alpha: %.2f Beta: %.2f Gamma: %.2f\n", message.Data.Alpha, message.Data.Beta,
				message.Data.Gamma)
		}
	})
	s.SetFileServerEnabled(false)
	s.SetPort(14514)
	dropError(s.Start())

	g.Wait()
}

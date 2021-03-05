package main

import (
	"encoding/json"
	"github.com/gogf/gf/frame/g"
	"github.com/gogf/gf/net/ghttp"
)

func main() {
	// 静态文件服务器
	wp := g.Server("WebpageService")
	wp.SetServerRoot("./public")
	wp.SetPort(80)
	wp.Start()

	// WebSocket 服务器
	s := g.Server("WebSocketService")
	s.BindHandler("/api/v1/ws", func(r *ghttp.Request) {
		ws, err := r.WebSocket()
		dropError(err)
		for {
			_, msg, err := ws.ReadMessage()
			dropError(err)
			// 在这里弹一首 **夏威夷吉他**！！
			// fmt.Println(msgType, string(msg), err)
			var message Message
			json.Unmarshal(msg, message)
		}
	})
	s.SetFileServerEnabled(false)
	s.SetPort(14514)
	s.Start()

	g.Wait()
}

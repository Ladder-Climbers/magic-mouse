package main

import (
	"fmt"
	"github.com/gogf/gf/frame/g"
	"github.com/gogf/gf/net/ghttp"
	"github.com/gogf/gf/os/glog"
)

func main() {
	s := g.Server("WebSocketService")
	s.BindHandler("/magicMouse", func(r *ghttp.Request) {
		ws, err := r.WebSocket()
		if err != nil {
			glog.Error(err)
			r.Exit()
		}
		for {
			msgType, msg, err := ws.ReadMessage()
			if err != nil {
				return
			}
			fmt.Println(msgType, string(msg), err)
			if err = ws.WriteMessage(msgType, []byte("你输入了“"+string(msg)+"”！")); err != nil {
				return
			}
		}
	})
	s.SetFileServerEnabled(false)
	s.SetPort(14514)
	s.Start()

	s2 := g.Server("WebpageService")
	s2.SetServerRoot("./Static")
	s2.SetPort(80)
	s2.Start()

	g.Wait()
}
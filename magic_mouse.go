package main

import (
	"encoding/json"
	"fmt"

	"github.com/gogf/gf/frame/g"
	"github.com/gogf/gf/net/ghttp"
)

var indexHTML []byte // = bytes.NewBuffer([]byte{})
// 运行配置
var configRefreshIndex bool = true

type DataType struct {
	Alpha   float32 `json:"alpha"`
	Beta    float32 `json:"beta"`
	Gamma   float32 `json:"gamma"`
	Key     int     `json:"key"`
	Message string  `json:"message"`
}

type Message struct {
	Cmd  string   `json:"cmd"`
	Data DataType `json:"data"`
}

func dropError(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	// 建立静态文件服务器
	wp := g.Server("WebpageService")
	wp.SetServerRoot("./frontend/")
	wp.SetPort(80)
	wp.Start()
	// WebSocket 服务器
	s := g.Server("WebSocketService")
	s.BindHandler("/api/v1/ws", func(r *ghttp.Request) {
		ws, err := r.WebSocket()
		dropError(err)
		for {
			msgType, msg, err := ws.ReadMessage()
			if err != nil {
				return
			}

			// 在这里弹一首 **夏威夷吉他**！！
			fmt.Println(msgType, string(msg), err)
			var coordinate Message
			json.Unmarshal(msg, &coordinate)
			fmt.Println(coordinate)
		}
	})
	s.SetFileServerEnabled(false)
	s.SetPort(14514)
	s.Start()

	g.Wait()
}

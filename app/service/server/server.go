package server

import (
	"encoding/json"
	"fmt"
	"github.com/gogf/gf/net/ghttp"
	//"magic_mouse/app/model/mgmargs"
	"magic_mouse/app/model/mgmtype"
	"magic_mouse/app/service/droperror"
)

// 远程服务器程序

func WebSocketServerResponder(r *ghttp.Request) {
	socket, err := r.WebSocket()
	droperror.DropError(err)

	// Waiting for Start command
	for {
		msgType, msg, err := socket.ReadMessage()
		droperror.DropError(err)
		var message mgmtype.Message
		droperror.DropError(json.Unmarshal(msg, &message))
		if message.Cmd == "connect" {
			// TODO: 判断Token
			fmt.Printf("Got token when connecting: %s\n", message.Data.Token)
			droperror.DropError(socket.WriteMessage(msgType, []byte("{\"cmd\":\"connect\", \"code\": 0, \"message\":\"OK\"}")))
			break
		} else {
			fmt.Printf("server: Warning: excepted cmd \"connect\" but got \"%s\"\n", message.Cmd)
		}
	}

	// Loop for operations
	for {
		_, msg, err := socket.ReadMessage()
		droperror.DropError(err)
		var message mgmtype.Message
		fmt.Printf("Got msg: %s\n", msg)
		droperror.DropError(json.Unmarshal(msg, &message))
		// Make a choice...
		// TODO: 处理&转发信息
	}
}

package client

// 连接到远程服务器

import (
	"fmt"
	"github.com/gorilla/websocket"
	"magic_mouse/app/service/droperror"
	"time"
)

func Client(token string) {
	API := "ws://localhost:8001/api/v1/remote/ws"
	conn, _, err := websocket.DefaultDialer.Dial(API, nil)
	droperror.DropError(err)
	fmt.Println("Client connected to:", conn.RemoteAddr())
	// TODO: 解决 mgmtype 转 JSON 字符串的问题
	//var message mgmtype.Message
	//droperror.DropError(json.Unmarshal([]byte("{\"cmd\": \"connect\", \"data\": {\"token\": \""+token+"\"}}"), &message))
	droperror.DropError(conn.WriteMessage(websocket.TextMessage, []byte("{\"cmd\": \"connect\", \"data\": {\"token\": \""+token+"\"}}")))

	go func() {
		for {
			//var msg mgmtype.Message
			//msg.Cmd = "test"
			//b, err := json.Marshal(msg)
			//droperror.DropError(err)
			//err2 := conn.WriteJSON(b)
			err2 := conn.WriteJSON(map[string]interface{}{"cmd": "test"})
			fmt.Println("Client: Sent test.")
			droperror.DropError(err2)
			time.Sleep(time.Duration(2) * time.Second)
		}
	}()
	go func() {
		for {
			_, msg, err := conn.ReadMessage()
			droperror.DropError(err)
			fmt.Println(msg)
		}
	}()
}

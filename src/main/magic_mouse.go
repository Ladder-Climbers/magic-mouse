package main

import (
	"encoding/json"
	"fmt"
	"github.com/gogf/gf/frame/g"
	"github.com/gogf/gf/net/ghttp"
	_ "math"
)

func main() {
	// Get Screen Resolution
	screenRes := GetScreenMetrics()
	fmt.Printf("Screen: %d x %d\n", screenRes.Width, screenRes.Height)

	var distance float32
	distance = 1000

	// Static Page Server
	wp := g.Server("WebpageService")
	wp.SetServerRoot("./public")
	wp.SetPort(80)
	dropError(wp.Start())

	// WebSocket Server
	s := g.Server("WebSocketService")
	s.BindHandler("/api/v1/ws", func(r *ghttp.Request) {
		ws, err := r.WebSocket()
		dropError(err)
		// Waiting for start command...
		for {
			msgType, msg, err := ws.ReadMessage()
			dropError(err)
			var message Message
			dropError(json.Unmarshal(msg, &message))
			if message.Cmd == "start" {
				dropError(ws.WriteMessage(msgType, []byte("{\"cmd\":\"start_done\",\"message\":\"OK\"}")))
				break
			}
		}
		// Loop for operation
		for {
			msgType, msg, err := ws.ReadMessage()
			dropError(err)
			var message Message
			dropError(json.Unmarshal(msg, &message))
			switch message.Cmd {
			case "data_angle_frame":
				moveMouse(Angle{
					Alpha: 90,
					Beta:  0,
					Gamma: 0},
					Angle{
						Alpha: message.Data.Alpha,
						Beta:  message.Data.Beta,
						Gamma: message.Data.Gamma,
					}, screenRes, distance)
			case "stop_from_client":
				dropError(ws.WriteMessage(msgType, []byte("{\"cmd\":\"stop_from_server\"}")))
				dropError(ws.Close())
				return
			case "key":
				keyPress(message.Data.Keys)
			case "mouse":
				mouseKeyPress(message.Data.MouseKey)
			}
		}
	})
	s.SetFileServerEnabled(false)
	s.SetPort(14514)
	dropError(s.Start())

	g.Wait()
}

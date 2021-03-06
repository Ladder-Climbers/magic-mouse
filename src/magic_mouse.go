package main

import (
	"encoding/json"
	"fmt"
	"github.com/gogf/gf/frame/g"
	"github.com/gogf/gf/net/ghttp"
)

func main() {
	// Get Screen Resolution
	screenWidth, screenHeight := GetScreenMetrics()
	fmt.Printf("Screen: %d x %d", screenWidth, screenHeight)

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
		for {
			_, msg, err := ws.ReadMessage()
			dropError(err)
			var message Message
			dropError(json.Unmarshal(msg, &message))
			//fmt.Printf("Alpha: %.2f Beta: %.2f Gamma: %.2f\n", message.Data.Alpha, message.Data.Beta,
			//	message.Data.Gamma)
			switch message.Cmd {
			case "data_angle_frame":
				moveMouse(Angle{Alpha: 200, Beta: 0, Gamma: 0}, Angle{
					Alpha: message.Data.Alpha,
					Beta:  message.Data.Beta,
					Gamma: message.Data.Gamma,
				})
			}
		}
	})
	s.SetFileServerEnabled(false)
	s.SetPort(14514)
	dropError(s.Start())

	g.Wait()
}

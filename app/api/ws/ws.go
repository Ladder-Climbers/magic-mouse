package ws

import (
	"encoding/json"
	"github.com/gogf/gf/net/ghttp"
	"magic_mouse/app/model/mgmargs"
	"magic_mouse/app/model/mgmtype"
	"magic_mouse/app/service/droperror"
	"magic_mouse/app/service/keypress"
	"magic_mouse/app/service/mvmouse"
	"os"
)

func WebSocketResponder(r *ghttp.Request) {
	socket, err := r.WebSocket()
	droperror.DropError(err)

	// Waiting for Start command
	for {
		msgType, msg, err := socket.ReadMessage()
		droperror.DropError(err)
		var message mgmtype.Message
		droperror.DropError(json.Unmarshal(msg, &message))
		if message.Cmd == "start" {
			droperror.DropError(socket.WriteMessage(msgType, []byte("{\"cmd\":\"start_done\",\"message\":\"OK\"}")))
			break
		}
	}

	// Loop for operations
	for {
		msgType, msg, err := socket.ReadMessage()
		droperror.DropError(err)
		var message mgmtype.Message
		droperror.DropError(json.Unmarshal(msg, &message))
		// Make a choice...
		switch message.Cmd {
		case "data_angle_frame":
			mvmouse.MoveMouse(mgmtype.Angle{Alpha: 180, Beta: 0, Gamma: 0},
				mgmtype.Angle{Alpha: message.Data.Alpha, Beta: message.Data.Beta, Gamma: message.Data.Gamma},
				mgmargs.Screen, mgmargs.Distance)
		case "stop_from_client":
			droperror.DropError(socket.WriteMessage(msgType, []byte("{\"cmd\":\"stop_from_server\"}")))
			droperror.DropError(socket.Close())
			// Stop this program
			os.Exit(0)
		case "key":
			keypress.KeyBoardPress(message.Data.Keys)
		case "mouse":
			keypress.MouseKeyPress(message.Data.MouseKey)
		}
	}
}

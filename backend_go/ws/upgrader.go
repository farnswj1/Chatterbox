package ws

import (
	"net/http"

	"github.com/gorilla/websocket"
)

func checkOrigin(r *http.Request) bool {
	return true
}

var Upgrader = websocket.Upgrader{
	CheckOrigin:     checkOrigin,
}

package controllers

import (
	"backend/libs"
	"backend/utils"
	"backend/ws"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/ollama/ollama/api"
)

func Chat(c *gin.Context) {
	conn, err := ws.Upgrader.Upgrade(c.Writer, c.Request, nil)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer conn.Close()
	ctx := c.Request.Context()

	responseFunc := func(response api.ChatResponse) error {
		data := libs.ResponseMessage{
			Message: response.Message.Content,
			Done: response.Done,
		}
		dataBytes, _ := json.Marshal(&data)
		conn.WriteMessage(websocket.TextMessage, dataBytes)
		return nil
	}

	for {
		_, message, err := conn.ReadMessage()

		if err != nil {
			utils.Logger.Println("read:", err.Error())
			return
		}

		messages := []api.Message{{Role: "user", Content: string(message)}}
		req := &api.ChatRequest{Model: "llama3", Messages: messages}

		if err := libs.OllamaClient.Chat(ctx, req, responseFunc); err != nil {
			utils.Logger.Println("write:", err.Error())
		}
	}
}

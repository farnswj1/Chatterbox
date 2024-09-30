package libs

import (
	"backend/utils"

	"github.com/ollama/ollama/api"
)

type ResponseMessage struct {
	Message string `json:"message"`
	Done    bool   `json:"done"`
}

var OllamaClient = loadOllamaClient()

func loadOllamaClient() *api.Client {
	client, err := api.ClientFromEnvironment()

	if err != nil {
		utils.Logger.Panic(err.Error())
	}

	return client
}

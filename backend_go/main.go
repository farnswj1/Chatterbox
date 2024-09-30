package main

import (
	"backend/controllers"
	"backend/middleware"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

func getRouter() *gin.Engine {
	router := gin.Default()
	router.RemoveExtraSlash = true
	router.NoRoute(controllers.PageNotFound)
	router.NoMethod(controllers.MethodNotAllowed)
	router.Use(middleware.CorsMiddleware())

	group := router.Group("/api")
	group.GET("/ws", controllers.Chat)

	return router
}

func init() {
	gin.SetMode(utils.Env.Get("GIN_MODE", "debug"))
}

func main() {
	router := getRouter()

	utils.Logger.Println("Server is online!")
	router.Run()
}

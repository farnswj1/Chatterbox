package middleware

import (
	"backend/utils"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CorsMiddleware() gin.HandlerFunc {
	origins := strings.Split(utils.Env["CORS_ALLOWED_ORIGINS"], " ")
	return cors.New(cors.Config{
		AllowOrigins:  origins,
		AllowHeaders:  []string{"Origin"},
		ExposeHeaders: []string{"Content-Length"},
		MaxAge:        12 * time.Hour,
	})
}

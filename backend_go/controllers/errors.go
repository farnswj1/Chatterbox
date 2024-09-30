package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func PageNotFound(c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Page not found"})
}

func MethodNotAllowed(c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusMethodNotAllowed, gin.H{"error": "Method not allowed"})
}

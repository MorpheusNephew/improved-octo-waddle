package main

import (
	"fmt"

	"github.com/morpheusnephew/db-service/v2/internal/utils"
	"gorm.io/gorm"
)

func main() {
	fmt.Println("Starting db writer service")

	utils.Runner(func(db *gorm.DB) {
		fmt.Println("Doing some stuff with db writer", db)
	})
}

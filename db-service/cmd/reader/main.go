package main

import (
	"fmt"

	"github.com/morpheusnephew/db-service/v2/internal/models"
	"github.com/morpheusnephew/db-service/v2/internal/utils"
	"gorm.io/gorm"
)

func main() {
	fmt.Println("Starting db reader service...")

	utils.Runner(func(db *gorm.DB) {
		var results []models.PlayerGameStats
		db.Where("\"gameId\" = ?", 2018020162).Find(&results)

		fmt.Println(results)
	})
}

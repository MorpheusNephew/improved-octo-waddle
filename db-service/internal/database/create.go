package database

import (
	"fmt"

	"github.com/morpheusnephew/db-service/v2/internal/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func InsertPlayerGameStats(db *gorm.DB, playerGameStats *[]models.PlayerGameStats) {
	fmt.Println("Inserting player game states")

	db.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "gameId"}, {Name: "playerId"}},
		DoUpdates: clause.AssignmentColumns([]string{"assists", "goals", "hits", "points", "penaltyMinutes"}),
	}).CreateInBatches(playerGameStats, 100)

	fmt.Println("Finished inserting player game stats")
}

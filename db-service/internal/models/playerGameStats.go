package models

import "time"

type PlayerGameStats struct {
	GameId           int       `gorm:"primary_key;column:gameId"`
	PlayerId         int       `gorm:"primary_key:column:playerId"`
	PlayerName       string    `gorm:"type:varchar(255);column:playerName"`
	TeamId           int       `gorm:"column:teamId"`
	TeamName         string    `gorm:"type:varchar(255);column:teamName"`
	PlayerAge        int       `gorm:"column:playerAge"`
	PlayerNumber     string    `gorm:"type:varchar(255);column:playerNumber"`
	PlayerPosition   string    `gorm:"type:varchar(255);column:playerPosition"`
	Assists          int       `gorm:"column:assists"`
	Goals            int       `gorm:"column:goals"`
	Hits             int       `gorm:"column:hits"`
	Points           int       `gorm:"column:points"`
	PenaltyMinutes   int       `gorm:"column:penaltyMinutes"`
	OpponentTeamName string    `gorm:"type:varchar(255);column:opponentTeamName"`
	OpponentTeamId   int       `gorm:"column:opponentTeamId"`
	CreatedAt        time.Time `gorm:"column:createdAt"`
	UpdatedAt        time.Time `gorm:"column:updatedAt"`
}

func (PlayerGameStats) TableName() string {
	return "PlayerGameStats"
}

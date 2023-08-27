package models

import "time"

type PlayerGameStats struct {
	GameId           int       `gorm:"primary_key;column:gameId" json:"gameId"`
	PlayerId         int       `gorm:"primary_key:column:playerId" json:"playerId"`
	PlayerName       string    `gorm:"type:varchar(255);column:playerName" json:"playerName"`
	TeamId           int       `gorm:"column:teamId" json:"teamId"`
	TeamName         string    `gorm:"type:varchar(255);column:teamName" json:"teamName"`
	PlayerAge        int       `gorm:"column:playerAge" json:"playerAge"`
	PlayerNumber     string    `gorm:"type:varchar(255);column:playerNumber" json:"playerNumber"`
	PlayerPosition   string    `gorm:"type:varchar(255);column:playerPosition" json:"playerPosition"`
	Assists          int       `gorm:"column:assists" json:"assists"`
	Goals            int       `gorm:"column:goals" json:"goals"`
	Hits             int       `gorm:"column:hits" json:"hits"`
	Points           int       `gorm:"column:points" json:"points"`
	PenaltyMinutes   int       `gorm:"column:penaltyMinutes" json:"penaltyMinutes"`
	OpponentTeamName string    `gorm:"type:varchar(255);column:opponentTeamName" json:"opponentTeamName"`
	OpponentTeamId   int       `gorm:"column:opponentTeamId" json:"opponentTeamId"`
	CreatedAt        time.Time `gorm:"column:createdAt;autoCreateTime" json:"-"`
	UpdatedAt        time.Time `gorm:"column:updatedAt;autoUpdateTime" json:"-"`
}

func (PlayerGameStats) TableName() string {
	return "PlayerGameStats"
}

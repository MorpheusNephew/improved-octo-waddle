package database

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/morpheusnephew/db-service/v2/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func getDatabaseDsn() string {
	godotenv.Load()

	host := os.Getenv("POSTGRES_HOST")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")
	port := os.Getenv("POSTGRES_PORT")

	return fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, dbname, port)
}

func GetDatabase() *gorm.DB {
	dsn := getDatabaseDsn()
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	db.AutoMigrate(&models.PlayerGameStats{})

	return db
}

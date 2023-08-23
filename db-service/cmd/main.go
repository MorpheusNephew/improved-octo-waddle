package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/morpheusnephew/db-service/v2/internal/database"
	"github.com/morpheusnephew/db-service/v2/internal/models"
)

func main() {
	fmt.Println("Hello world")

	db := database.GetDatabase()

	done := getDoneChannel()

	fmt.Println("Connected to postgres db")

	var results []models.PlayerGameStats
	db.Where("\"gameId\" = ?", 2018020162).Find(&results)

	fmt.Println(results)

	<-done
	fmt.Println("Exiting")
}

func getDoneChannel() chan bool {
	sigs := make(chan os.Signal, 1)
	done := make(chan bool, 1)

	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		sig := <-sigs
		fmt.Println()
		fmt.Println(sig)
		done <- true
	}()

	return done
}

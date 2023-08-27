package utils

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/morpheusnephew/db-service/v2/internal/database"
	"gorm.io/gorm"
)

func Runner(fn func(db *gorm.DB)) {
	fmt.Println("Connecting to database")

	db := database.GetDatabase()

	fmt.Println("Connected to postgres db")

	done := getDoneChannel()

	fn(db)

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

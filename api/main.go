package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// loading env vars from .env
	err := godotenv.Load()
	if err != nil {
		fmt.Println("no env file found, trying to access elsewhere")
	}

	dataPath := os.Getenv("DATA_PATH")

	router := http.NewServeMux()

	router.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "hello from xdd")
	})

	router.HandleFunc("GET /events", func(w http.ResponseWriter, r *http.Request) {
		fightsJSON, err := os.ReadFile(dataPath + "events.json")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Could not read file: %v\n", err)
			return
		}

		w.WriteHeader(200)
		fmt.Fprintln(w, string(fightsJSON))
	})

	router.HandleFunc("GET /events/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		json, err := os.ReadFile(dataPath + "event_" + id + ".json")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Could not read file: %v\n", err)
			return
		}

		w.WriteHeader(200)
		fmt.Fprintln(w, string(json))
	})

	port := "8080"
	server := http.Server{
		Addr:    ":" + port,
		Handler: router,
	}

	fmt.Printf("Listening on port %s\n", port)
	server.ListenAndServe()
}

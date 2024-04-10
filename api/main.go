package main

import (
	"fmt"
	"net/http"
	"os"
)

type Events struct {
	Events []Event
}

type Event struct {
	Fighter1 string
	Fighter2 string
	Date     string
	Time     string
	Card     string
}

func main() {
	router := http.NewServeMux()

	router.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "hello from xdd")
	})

	router.HandleFunc("GET /fights", func(w http.ResponseWriter, r *http.Request) {
		// use '../scraper/data/fights.json' when developing locally
		// use '/data/fights.json' when deploying or developing with docker container
		fightsJSON, err := os.ReadFile("../scraper/data/fights.json")
		if err != nil {
			fmt.Fprintf(w, "Could not read file: %v\n", err)
			return
		}

		fmt.Fprintln(w, string(fightsJSON))
	})

	router.HandleFunc("GET /fights/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		fmt.Fprintln(w, "fight:", id)
	})

	port := "8080"
	server := http.Server{
		Addr:    ":" + port,
		Handler: router,
	}

	fmt.Printf("Listening on port %s\n", port)
	server.ListenAndServe()
}

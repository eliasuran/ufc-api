package main

import (
	"fmt"
	"net/http"
)

func main() {
	router := http.NewServeMux()

	router.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "xdd says hello")
	})

	port := "8080"
	server := http.Server{
		Addr:    ":" + port,
		Handler: router,
	}

	fmt.Printf("Listening on port %s\n", port)
	server.ListenAndServe()
}

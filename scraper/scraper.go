package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/gocolly/colly/v2"
)

type Events struct {
	Events []Event
}

type Event struct {
	ID       int
	Fighter1 string
	Fighter2 string
	Date     string
	Time     string
	Card     string
}

func main() {
	// TODO: run this function every 1 hour (something less is okay for testing)
	// log the time each time it scrapes
	scraper()
}

func check(error error) {
	if error != nil {
		fmt.Println(error)
		os.Exit(1)
	}
}

func scraper() {
	c := colly.NewCollector()

	events := Events{}

	// TODO: assign id to each event
	// id := 0

	c.OnHTML(".c-card-event--result", func(e *colly.HTMLElement) {
		fighters := strings.Split(e.ChildText(".c-card-event--result__headline a"), " ")

		info := strings.Split(e.ChildText(".c-card-event--result__date a"), " / ")

		event := Event{Fighter1: fighters[0], Fighter2: fighters[2], Date: info[0], Time: info[1], Card: info[2]}

		events.Events = append(events.Events, event)

	})

	// TODO: make function to click on link and get more data about event

	c.Visit("https://www.ufc.com/events")

	content, err := json.MarshalIndent(events, "", "    ")
	check(err)

	// use './data/fights.json' when developing locally
	// use '/data/fights.json' when deploying or when devoloping with docker container
	err = os.WriteFile("./data/fights.json", content, 0644)
	check(err)

	fmt.Println("Scraper ran successfully")
}

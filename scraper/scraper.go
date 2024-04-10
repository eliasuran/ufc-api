package main

// hva har jeg gjort denne runden
// - scraper kjører en gang i timen
// - får data om spesifik fight og skriver til egne jsonFiler
// - la til response

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

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

type AllEventInfo struct {
	Events []EventInfo
}

type EventInfo struct {
	ID        int
	EventName string
	MainCard  MainCard
	// TODO: add more cards
}

type MainCard struct {
	Fights []Fight
}

type Fight struct {
	Title string
}

type FighterData struct {
	Name    string
	Status  string
	Country string
}

func main() {
	for {
		// TODO: log the time each time it scrapes
		scraper()
		time.Sleep(1 * time.Hour)
	}
}

func check(error error) {
	if error != nil {
		fmt.Println(error)
		os.Exit(1)
	}
}

func scraper() {
	fmt.Println("Starting scraper...")

	c := colly.NewCollector()

	events := Events{}

	id := 0

	c.OnHTML(".c-card-event--result", func(e *colly.HTMLElement) {
		// getting fighters
		fighters := strings.Split(e.ChildText(".c-card-event--result__headline a"), " ")

		// getting info like date and time
		info := strings.Split(e.ChildText(".c-card-event--result__date a"), " / ")

		// putting data into an instance of the Event struct
		event := Event{ID: id, Fighter1: fighters[0], Fighter2: fighters[2], Date: info[0], Time: info[1], Card: info[2]}

		// appending the event instance to Events
		events.Events = append(events.Events, event)

		// getting the url where there is more info about the fight
		link := e.ChildAttr(".c-card-event--result__headline a", "href")

		///// starting new collector /////
		d := colly.NewCollector()

		eventInfo := EventInfo{ID: id, EventName: link}

		d.OnHTML(".c-listing-fight__content-row", func(h *colly.HTMLElement) {
			title := h.ChildText(".c-listing-fight__class-text")
			fight := Fight{Title: title}

			eventInfo.MainCard.Fights = append(eventInfo.MainCard.Fights, fight)

			content, err := json.MarshalIndent(eventInfo, "", "    ")
			check(err)

			fileName := fmt.Sprintf("./data/event_%d.json", id)
			err = os.WriteFile(fileName, content, 0644)
			check(err)
		})

		fmt.Println("Wrote JSON for fight: ", id)

		d.Visit("https://www.ufc.com" + link)

		// appending id at the end
		id += 1
	})

	// TODO: make function to click on link and get more data about event

	c.Visit("https://www.ufc.com/events")

	content, err := json.MarshalIndent(events, "", "    ")
	check(err)

	// use './data/fights.json' when developing locally
	// use '/data/fights.json' when deploying or when devoloping with docker container
	err = os.WriteFile("./data/fights.json", content, 0644)
	check(err)

	fmt.Println("Wrote JSON for schedule")

	fmt.Println("Scraper ran successfully")
}

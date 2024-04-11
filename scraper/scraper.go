package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gocolly/colly/v2"
	"github.com/joho/godotenv"
)

type LastScraped struct {
	LastScrape string
}

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
	// loading env vars from .env
	err := godotenv.Load()
	if err != nil {
		fmt.Println("no env file found, trying to access elsewhere")
	}

	// defining dataPath
	dataPath := os.Getenv("DATA_PATH")

	for {
		// writing the time of scraping to json
		t := time.Now()
		content, err := json.MarshalIndent(t.Format("02.01.2006 15:04:05"), "", "    ")
		check(err)
		writeJSON(content, dataPath+"lastScraped.json")

		// running scraper
		scraper(dataPath)

		// waiting 1 hour
		time.Sleep(1 * time.Hour)
	}
}

func check(error error) {
	if error != nil {
		fmt.Println(error)
		os.Exit(1)
	}
}

func writeJSON(data []byte, path string) {
	err := os.WriteFile(path, data, 0666)
	check(err)
}

func scraper(dataPath string) {
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

		// getting the last part of the url for event name
		splitLink := strings.Split(link, "/")
		eventName := splitLink[len(splitLink)-1]

		eventInfo := EventInfo{ID: id, EventName: eventName}

		///// starting new collector /////
		d := colly.NewCollector()

		d.OnHTML(".c-listing-fight__content-row", func(h *colly.HTMLElement) {
			title := h.ChildText(".c-listing-fight__class-text")
			fight := Fight{Title: title}

			eventInfo.MainCard.Fights = append(eventInfo.MainCard.Fights, fight)

			content, err := json.MarshalIndent(eventInfo, "", "    ")
			check(err)

			fileName := fmt.Sprintf(dataPath+"event_%d.json", id)

			writeJSON(content, fileName)
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

	writeJSON(content, dataPath+"events.json")

	fmt.Println("Wrote JSON for schedule")

	fmt.Println("Scraper ran successfully")
}

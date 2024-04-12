package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/eliasuran/ufc-crawler/lib"
	s "github.com/eliasuran/ufc-crawler/structures"
	"github.com/gocolly/colly/v2"
	"github.com/joho/godotenv"
)

func main() {
	// loading env vars from .env
	err := godotenv.Load()
	if err != nil {
		fmt.Println("no env file found, trying to access elsewhere")
	}

	// defining dataPath
	dataPath := os.Getenv("DATA_PATH")

	for {
		// running scraper
		scraper(dataPath)

		// waiting 1 hour
		time.Sleep(1 * time.Hour)
	}
}

func scraper(dataPath string) {
	fmt.Println("Starting scraper...")

	c := colly.NewCollector()

	events := s.Events{}

	id := 0

	c.OnHTML(".c-card-event--result", func(e *colly.HTMLElement) {
		// getting fighters
		fighters := strings.Split(e.ChildText(".c-card-event--result__headline a"), " ")

		// getting info like date and time
		info := strings.Split(e.ChildText(".c-card-event--result__date a"), " / ")

		// putting data into an instance of the Event struct
		event := s.Event{ID: id, Fighter1: fighters[0], Fighter2: fighters[2], Date: info[0], Time: info[1], Card: info[2]}

		// appending the event instance to Events
		events.Events = append(events.Events, event)

		// getting the url where there is more info about the fight
		link := e.ChildAttr(".c-card-event--result__headline a", "href")

		// getting the last part of the url for event name
		splitLink := strings.Split(link, "/")
		eventName := splitLink[len(splitLink)-1]

		eventInfo := s.EventInfo{ID: id, EventName: eventName}

		///// starting new collector /////
		d := colly.NewCollector()

		d.OnHTML(".c-listing-fight__content", func(h *colly.HTMLElement) {
			title := h.ChildText(".c-listing-fight__class-text")

			fighter1Name := h.ChildText(".c-listing-fight__corner-name--red .c-listing-fight__corner-given-name") + " " + h.ChildText(".c-listing-fight__corner-name--red .c-listing-fight__corner-family-name")
			if fighter1Name == " " {
				fighter1Name = h.ChildText(".c-listing-fight__corner-name--red a")
			}
			fighter1Country := h.ChildText(".c-listing-fight__country--red div")
			fighter1 := s.FighterData{Name: fighter1Name, Country: fighter1Country}

			fighter2Name := h.ChildText(".c-listing-fight__corner-name--blue .c-listing-fight__corner-given-name") + " " + h.ChildText(".c-listing-fight__corner-name--blue .c-listing-fight__corner-family-name")
			if fighter2Name == " " {
				fighter2Name = h.ChildText(".c-listing-fight__corner-name--blue a")
			}
			fighter2Country := h.ChildText(".c-listing-fight__country--blue div")
			fighter2 := s.FighterData{Name: fighter2Name, Country: fighter2Country}

			fight := s.Fight{Title: title, Fighter1: fighter1, Fighter2: fighter2}

			eventInfo.MainCard.Fights = append(eventInfo.MainCard.Fights, fight)

			content, err := json.MarshalIndent(eventInfo, "", "    ")
			lib.Check(err)

			fileName := fmt.Sprintf(dataPath+"event_%d.json", id)

			lib.WriteJSON(content, fileName)
		})

		fmt.Println("Wrote JSON for fight: ", id)

		d.Visit("https://www.ufc.com" + link)

		// appending id at the end
		id += 1
	})

	// TODO: make function to click on link and get more data about event

	c.Visit("https://www.ufc.com/events")

	content, err := json.MarshalIndent(events, "", "    ")
	lib.Check(err)

	lib.WriteJSON(content, dataPath+"events.json")

	fmt.Println("Wrote JSON for schedule")

	fmt.Println("Scraper ran successfully")
}

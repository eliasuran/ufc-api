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
	Fighter1 string
	Fighter2 string
	Date     string
	Time     string
	Card     string
}

func check(error error) {
	if error != nil {
		fmt.Println(error)
		os.Exit(1)
	}
}

func main() {
	c := colly.NewCollector()

	events := Events{}

	c.OnHTML(".c-card-event--result", func(e *colly.HTMLElement) {
		fighters := strings.Split(e.ChildText(".c-card-event--result__headline a"), " ")

		info := strings.Split(e.ChildText(".c-card-event--result__date a"), " / ")

		event := Event{Fighter1: fighters[0], Fighter2: fighters[2], Date: info[0], Time: info[1], Card: info[2]}

		events.Events = append(events.Events, event)
	})

	c.Visit("https://www.ufc.com/events")

	content, err := json.Marshal(events)
	check(err)

	err = os.WriteFile("./data/fights.json", content, 0644)
	check(err)

	fmt.Println(events)
}

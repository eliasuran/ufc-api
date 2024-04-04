package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/gocolly/colly/v2"
)

type Fight struct {
	Fighter1 string
	Fighter2 string
}

func check(error error) {
	if error != nil {
		fmt.Println(error)
		os.Exit(1)
	}
}

func main() {
	c := colly.NewCollector()

	fights := []Fight{}

	c.OnHTML(".c-card-event--result__headline a", func(e *colly.HTMLElement) {
		fighter1 := strings.Split(e.Text, " vs ")[0]
		fighter2 := strings.Split(e.Text, " vs ")[1]

		fight := Fight{Fighter1: fighter1, Fighter2: fighter2}

		fights = append(fights, fight)
	})

	c.Visit("https://www.ufc.com/events")

	content, err := json.Marshal(fights)
	check(err)

	err = os.WriteFile("./data/fights.json", content, 0644)
	check(err)

	fmt.Println(fights)
}

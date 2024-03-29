package main

import (
	"fmt"

	"github.com/gocolly/colly/v2"
)

func main() {
	c := colly.NewCollector()

	c.OnHTML(".c-card-event--result__headline a", func(e *colly.HTMLElement) {
		fmt.Println(e.Text)
	})

	c.Visit("https://www.ufc.com/events")
}

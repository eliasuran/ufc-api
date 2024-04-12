package structures

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
	Title    string
	Fighter1 FighterData
	Fighter2 FighterData
}

type FighterData struct {
	Name    string
	Country string
}

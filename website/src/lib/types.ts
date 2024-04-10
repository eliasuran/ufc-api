// Events
export interface Events {
	Events: Event[];
}

export interface Event {
	ID: number;
	Fighter1: string;
	Fighter2: string;
	Date: string;
	Time: string;
	Card: string;
}

// EventData
export interface EventData {
	ID: number;
	EventName: string;
	MainCard: MainCard;
}

interface MainCard {
	Fights: Fight[];
}

interface Fight {
	Title: string;
}

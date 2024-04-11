---
title: "Get event by id"
desc: "The event/{id} endpoint"
category: "b API reference"
order: 3
---

# Event

#### Get data about an event by id


#### Request

---

method: "GET"

endpoint: "/events/{id}"

#### Response

---

200:
```
{
    ID         int
    EventName  string
    MainCard: {
        Fights: [
            {
                Title  string
            },
        ]
    }
}
```

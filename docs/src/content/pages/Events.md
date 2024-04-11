---
title: "Get events"
desc: "The events endpoint"
category: "b API reference"
order: 2
---

# Events

#### Get the schedule of upcoming fights


#### Request

---

method: "GET"

endpoint: "/events"

#### Response

---

200:
```
{
    Events: [
        {
            ID        string
            Fighter1  string
            Fighter2  string
            Date:     string
            Time:     string
            Card:     string
        }
    ]
}
```

---
title: "Get fight by id"
desc: "The fight/{id} endpoint"
category: "b API reference"
order: 3
---

# Fight

#### Get data about a fight by id


#### Request

---

method: "GET"

endpoint: "/fights/{id}"

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

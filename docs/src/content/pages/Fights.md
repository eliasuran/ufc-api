---
title: "Get fights"
desc: "The fights endpoint"
category: "b API reference"
order: 2
---

# Fights

#### Get the schedule of upcoming fights


#### Request

---

method: "GET"

endpoint: "/fights"

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

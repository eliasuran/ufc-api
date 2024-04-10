---
title: "Quick start"
desc: "How to quickly set up ufc-api for yourself"
category: "a Getting Started"
order: 2
---

# Quick setup

ufc-api offers the ability to host it yourself

You can either do this on a server you own, a virtual machine in the cloud, or just no your personal computer

<br />

There is currently only 1 way to do this, and that is with git and docker

<br />

### Git and Docker

#### Requirements:

- docker installed

- git installed


Run this command in order to clone the repository and cd into the directory

```bash
git clone https://github.com/eliasuran/ufc-api.git
cd ufc-api
```

Start the docker container
```bash
sudo docker compose up
```
NOTE: Everytime a new feature is introduced, make sure to run docker compose up with the --build flag. Otherwise, you can omit it.

#### Congrats 🎉

The scraper and api are now setup and ready to be used. The default port for the api is 8080, and it will also be displayed in the terminal. The api will run once every hour

<br />

The scraper will run once very hour

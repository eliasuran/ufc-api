when developing locally, i am using a .env file to store the 'data path' (the path of where the json files will be saved when developing locally)

to set one up for your own dev environment, create a .env file in this directory (scraper) (ex: ./data)

now create an env variable called 'DATA_PATH' in the .env file, and point it to a directory where you want to store the json data

ex: DATA_PATH=./data/

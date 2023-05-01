# Recipe App

## WIP Under Construction

## Data Model

### Recipe
- id - number
- name - string
- author - obj
- cuisine - enum string
- course - enum string
- serving size ** - number 
- list of ingredients - obj
- ordered list of steps - string
- notes - string

### Ingredients
- id - number
- ingredient - string
- amount - number
- measurement - enum string

### Users
- id - number
- email...

## Running project
- docker compose up (-d)
- (docker compose down) ctrl + c 
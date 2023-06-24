import json

from app.schemas import IngredientCreate, RecipeCreate

list_of_recipes = []

seed = open('data.json')
data = json.load(seed)

for recipe in data:
    print(recipe)


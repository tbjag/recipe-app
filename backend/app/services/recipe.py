
from app import schemas
from typing import Any
import uuid

t = schemas.IngredientCreate(
    name = 'blah',
    quantity=3.9,
    unit_type='meow',
    notes='meh'
)

database = [schemas.RecipeCreate(
    title = 'test',
    summary = 'test2',
    ingredients=[t],
    instructions = ['test3'],
    notes = 'notes'
)]

def create_recipe(recipe: schemas.RecipeCreate) -> Any:
    database.append(recipe)
    return recipe


def get_recipe(title: str) -> Any: ##change to id
    for i in database: 
        if i.title == title:
            return i
    return False

def get_all_recipes():
    return database

def get_recipes_by_userid():
    pass

def update_recipe():
    pass

def delete_recipe():
    pass
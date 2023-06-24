from fastapi import APIRouter
from typing import Any, Optional, List
from app.schemas import Recipe, RecipeCreate
from app.services.recipe import get_all_recipes, get_recipe, create_recipe
router = APIRouter()

@router.get("/", status_code=200, response_model=List[Recipe])
def fetch_recipes() -> Any:
    recipes = get_all_recipes()
    return recipes

@router.get("/{recipe_id}", status_code=200, response_model=Recipe)
def fetch_recipe(recipe_id: str) -> Any:
    recipe = get_recipe(recipe_id)
    return recipe

@router.post("/", status_code=201, response_model=Recipe)
def create_user_recipe(recipe: RecipeCreate) -> Any:
    new_recipe = create_recipe(recipe)
    return new_recipe

## add update
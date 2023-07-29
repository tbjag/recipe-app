import asyncio
from typing import Any, Optional, List

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud
from app.api import deps
from app.clients.reddit import RedditClient
from app.schemas.recipe import (
    Recipe,
    RecipeCreate,
    RecipeSearchResults,
    RecipeUpdate,
)
from app.models.user import User
from app.schemas.ingredient import Ingredient

router = APIRouter()
RECIPE_SUBREDDITS = ["recipes", "easyrecipes", "TopSecretRecipes"]


@router.get("/{recipe_id}", status_code=200, response_model=Any)
def fetch_recipe(
    *,
    recipe_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Fetch a single recipe by ID
    """
    recipe = crud.recipe.get(db=db, id=recipe_id)
    
    if not recipe:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"Recipe with ID {recipe_id} not found"
        )
    #TODO remove this boilerplate, need to find another option here
    ingredient_data = crud.ingredient.get_multi_by_recipe(db=db, recipe_id=recipe_id)
    ingredients = []
    for ingredient in ingredient_data:
        ingredients.append(
            Ingredient(
                name=ingredient.name,
                quantity=ingredient.quantity,
                unit_type=ingredient.unit_type,
                notes=ingredient.notes
            )
        )

    recipe_with_ingredients = Recipe(
        id=recipe.id,
        title=recipe.title,
        img_url=recipe.img_url,
        summary=recipe.summary,
        ingredients=ingredients,
        instructions=recipe.instructions,
        notes=recipe.notes,
        submitter_id=recipe.submitter_id
    )

    return recipe_with_ingredients

@router.get("/my-recipes/", status_code=200, response_model=Any)
def fetch_user_recipes(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Fetch all recipes for a user
    """
    recipes = current_user.recipes

    if not recipes:
        return {"results": list()}

    for recipe in recipes:
        for ingredient in recipe.ingredients:
            print(ingredient.name)

    return {"results": list(recipes)}


@router.get("/search/", status_code=200, response_model=Any)
def search_recipes(
    *,
    keyword: str = Query(None, min_length=3, example="chicken"),
    max_results: Optional[int] = 10,
    db: Session = Depends(deps.get_db),
) -> dict:
    """
    Search for recipes based on label keyword
    """
    recipes = crud.recipe.get_multi(db=db, limit=max_results)
    results = filter(lambda recipe: keyword.lower() in recipe.title.lower(), recipes)

    return {"results": list(results)}


@router.post("/", status_code=201, response_model=Any)
def create_recipe(
    *,
    recipe_in: RecipeCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> dict:
    """
    Create a new recipe in the database.
    """
    if recipe_in.submitter_id != current_user.id:
        raise HTTPException(
            status_code=403, detail=f"You can only submit recipes as yourself"
        )
    
    recipe = crud.recipe.create(db=db, obj_in=recipe_in)
    return recipe


@router.put("/", status_code=201, response_model=Recipe)
def update_recipe_todo(
    *,
    recipe_in: RecipeUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> dict:
    """
    Update recipe in the database.
    """
    recipe = crud.recipe.get(db, id=recipe_in.id)
    if not recipe:
        raise HTTPException(
            status_code=400, detail=f"Recipe with ID: {recipe_in.id} not found."
        )

    if recipe.submitter_id != current_user.id:
        raise HTTPException(
            status_code=403, detail=f"You can only update your recipes."
        )

    updated_recipe = crud.recipe.update(db=db, db_obj=recipe, obj_in=recipe_in)
    return updated_recipe

@router.delete("/", status_code=201, response_model=Recipe)
def delete_recipe(
    *,
    recipe_id: int,
    db: Session = Depends(deps.get_db),):
    """
    Delete recipe off id
    """
    recipe = crud.recipe.get(db=db, id=recipe_id)

    if not recipe:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"Recipe with ID {recipe_id} not found"
        )
    
    return crud.recipe.remove(db, id=recipe_id)

    
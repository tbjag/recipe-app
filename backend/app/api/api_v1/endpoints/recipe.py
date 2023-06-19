from fastapi import APIRouter
from app import schemas

router = APIRouter()

i = schemas.IngredientCreate(
    name = 'blah',
    quantity=3.9,
    unit_type='meow',
    notes='meh'
)

t = schemas.RecipeCreate(
    title = 'test',
    summary = 'test2',
    ingredients=[i],
    instructions = ['test3'],
    notes = 'notes'
)

@router.get("/test", status_code=200, response_model=schemas.Recipe)
def fetch_recipe():
    return t
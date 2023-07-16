from pydantic import BaseModel, HttpUrl
from app.schemas.ingredient import Ingredient, IngredientCreate
from typing import Sequence, List

class RecipeBase(BaseModel):
    title: str
    img_url: HttpUrl #TODO change later to storing images
    summary: str
    instructions: str
    notes: str

class RecipeCreate(RecipeBase):
    title: str
    img_url: HttpUrl #TODO change later to storing images
    summary: str
    ingredients: List[IngredientCreate]
    instructions: str
    notes: str
    submitter_id: int

class RecipeUpdate(RecipeBase):
    id: int

class RecipeUpdateRestricted(BaseModel):
    id: int
    label: str
    notes: str

# Properties shared by models stored in DB
class RecipeInDBBase(RecipeBase):
    id: int
    submitter_id: int

    class Config:
        orm_mode = True

# Properties to return to client
class Recipe(RecipeInDBBase):
    ingredients: List[Ingredient]

# Properties properties stored in DB
class RecipeInDB(RecipeInDBBase):
    pass

class RecipeSearchResults(BaseModel):
    results: Sequence[Recipe]

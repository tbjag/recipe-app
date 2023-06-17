from pydantic import BaseModel, HttpUrl
from app.schemas.ingredient import Ingredient
from typing import Sequence, List


class RecipeBase(BaseModel):
    label: str
    source: str
    url: HttpUrl
    notes: str
    ingredients: List[Ingredient]


class RecipeCreate(RecipeBase):
    label: str
    source: str
    url: HttpUrl
    notes: str
    submitter_id: int
    ingredients: List[Ingredient]


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
    pass


# Properties properties stored in DB
class RecipeInDB(RecipeInDBBase):
    pass


class RecipeSearchResults(BaseModel):
    results: Sequence[Recipe]

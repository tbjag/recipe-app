from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Sequence, List, Optional

class IngredientBase(BaseModel):
    name: str
    quantity: float
    unit_type: str
    notes: str

class IngredientCreate(IngredientBase):
    name: str
    quantity: float
    unit_type: str
    notes: str

class IngredientInDB(IngredientBase):
    title: str
    quantity: float
    unit_type: str
    notes: str
    id: int
    published_at: Optional[datetime] = None
    recipe_id: int

    class Config:
        orm_mode = True


class Ingredient(IngredientBase):
    pass
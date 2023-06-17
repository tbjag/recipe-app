from pydantic import BaseModel

class IngredientBase(BaseModel):
    id: int
    name: str
    quantity: str
    unit_type: float
    alternative: str

class IngredientCreate(IngredientBase):
    pass

class IngredientUpdate(IngredientBase):
    id: int

class Ingredient(IngredientBase):
    class Config:
        orm_mode = True

from datetime import datetime
from typing import Any, Optional, List

from pydantic import BaseModel, validator



class IngredientBase(BaseModel):
    name: str
    quantity: float
    unit_type: str
    notes: str

class IngredientCreate(IngredientBase):
    @validator("name")
    def validate_title(cls: Any, name: str, **kwargs: Any) -> Any:
        if len(name) == 0:
            raise ValueError("Name can't be empty")
        elif len(name) > 100:
            raise ValueError("Name is too long")
        return name

    @validator("quantity")
    def validate_summary(cls: Any, quantity: float, **kwargs: Any) -> Any:
        if quantity < 0:
            raise ValueError("Quantity can't be negative")
        return quantity

    @validator("unit_type")
    def validate_instructions(cls: Any, unit_type: str, **kwargs: Any):
        if len(unit_type) == 0:
            raise ValueError("Instructions can't be empty")
        return unit_type
    
    @validator("notes")
    def validate_notes(cls: Any, notes: str, **kwargs: Any):
        if len(notes) == 0:
            raise ValueError("Note can't be empty")
        return notes


class IngredientInDB(IngredientBase):
    title: str
    quantity: float
    unit_type: str
    notes: str
    id: Optional[int] = None
    published_at: Optional[datetime] = None
    recipe_id: Optional[str] = None

    class Config:
        orm_mode: bool = True


class Ingredient(IngredientBase):
    pass
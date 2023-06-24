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

##Recipe
class RecipeBase(BaseModel):
    title: str
    summary: str
    ingredients: List[Ingredient]
    instructions: List[str]
    notes: str

class RecipeCreate(RecipeBase):
    @validator("title")
    def validate_title(cls: Any, title: str, **kwargs: Any) -> Any:
        if len(title) == 0:
            raise ValueError("Title can't be empty")
        elif len(title) > 100:
            raise ValueError("Title is too long")
        return title

    @validator("summary")
    def validate_summary(cls: Any, summary: str, **kwargs: Any) -> Any:
        if len(summary) == 0:
            raise ValueError("Summary can't be empty")
        elif len(summary) > 200:
            raise ValueError("Summary is too long")
        return summary
    
    @validator("ingredients")
    def validate_ingredients(cls: Any, ingredients: List[str], **kwargs: Any):
        if len(ingredients) == 0:
            raise ValueError("Ingredients can't be empty")
        return ingredients

    @validator("instructions")
    def validate_instructions(cls: Any, instructions: List[str], **kwargs: Any):
        if len(instructions) == 0:
            raise ValueError("Instructions can't be empty")
        return instructions
    
    @validator("notes")
    def validate_notes(cls: Any, notes: str, **kwargs: Any):
        if len(notes) == 0:
            raise ValueError("Note can't be empty")
        return notes


class RecipeInDB(RecipeBase):
    title: str
    summary: str
    ingredients: List[Ingredient]
    instructions: List[str]
    notes: str
    id: Optional[int] = None
    published_at: Optional[datetime] = None
    slug: Optional[str] = None
    author_id: Optional[str] = None

    class Config:
        orm_mode: bool = True


class Recipe(RecipeBase):
    pass


class RecipeUpdate(RecipeBase):
    # id: int
    author_id: str


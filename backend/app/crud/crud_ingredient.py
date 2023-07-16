from typing import Any, Dict, List, Union
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from app.schemas.recipe import RecipeCreate, RecipeUpdate
from app.models.recipe import Recipe
from app.models.ingredient import Ingredient

class CRUDIngredient:
    def get_multi_by_recipe(self, db: Session, *, recipe_id: Any) -> List[Ingredient]:
        return db.query(Ingredient).filter(Ingredient.posted_recipe_id == recipe_id).all()
        

ingredient = CRUDIngredient()
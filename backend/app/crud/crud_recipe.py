from typing import Any, Dict, List, Union
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from app.schemas.recipe import RecipeCreate, RecipeUpdate
from app.models.recipe import Recipe
from app.models.ingredient import Ingredient

class CRUDRecipe:
    def create(self, db:Session, *, obj_in= RecipeCreate) -> Recipe:
        obj_in_data = jsonable_encoder(obj_in)

        # Extract the ingredients from the input and create instances of Ingredient
        ingredients_data = obj_in_data.pop('ingredients', [])
        ingredients = [Ingredient(**ing_data) for ing_data in ingredients_data]

        db_obj = Recipe(**obj_in_data)  # type: ignore
        db_obj.ingredients = ingredients
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, db_obj: Recipe, obj_in: Union[RecipeUpdate, Dict[str, Any]]) -> Recipe:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get(self, db: Session, id: Any) -> Recipe:
        return db.query(Recipe).filter(Recipe.id == id).first()
         

    def get_multi(self, db: Session, *, skip: int = 0, limit: int = 5000) -> List[Recipe]:
        return db.query(Recipe).order_by(Recipe.id).offset(skip).limit(limit).all()

    def remove(self, db: Session, *, id: int) -> Recipe:
        obj = db.query(Recipe).get(id)
        db.delete(obj)
        db.commit()
        return obj

recipe = CRUDRecipe()
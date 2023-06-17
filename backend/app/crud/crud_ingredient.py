from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.recipe import Recipe
from app.models.user import User
from app.models.ingredient import Ingredient
from app.schemas.ingredient import IngredientCreate, IngredientUpdate


class CRUDIngredient(CRUDBase[Ingredient, IngredientCreate, IngredientUpdate]):
    def update(
        self,
        db: Session,
        *,
        db_obj: User,
        obj_in: IngredientUpdate
    ) -> Recipe:
        db_obj = super().update(db, db_obj=db_obj, obj_in=obj_in)
        return db_obj


ingredient = CRUDIngredient(Ingredient)

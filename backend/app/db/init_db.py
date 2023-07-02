import logging
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import base  # noqa: F401
from app.core.config import settings

logger = logging.getLogger(__name__)


RECIPES = [
    {
        "id": 1,
        "title": "Chicken Vesuvio",
        "summary": "Serious Eats",
        "img_url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
        "ingredients" : [{"name": "chicken", "quantity": 1.0, "unit_type": "cup", "notes" : "sd"}],
        "instructions": "test one",
        "notes": "note note"
    },
    {
        "id": 2,
        "title": "Chicken Parm",
        "summary": "Kenji Lopez Alt",
        "img_url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
        "ingredients" : [{"name": "chicken", "quantity": 1.0, "unit_type": "cup", "notes" : "sd"}],
        "instructions": "test two",
        "notes": "note note"
    },
    {
        "id": 3,
        "title": "Chicken Catectory",
        "summary": "NYTimes",
        "img_url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
        "ingredients" : [{"name": "chicken", "quantity": 1.0, "unit_type": "cup", "notes" : "sd"}],
        "instructions": "test three",
        "notes": "note note"
    },
]


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28


def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)
    if settings.FIRST_SUPERUSER:
        user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
        if not user:
            user_in = schemas.UserCreate(
                full_name="Initial Super User",
                email=settings.FIRST_SUPERUSER,
                is_superuser=True,
                password=settings.FIRST_SUPERUSER_PW,
            )
            user = crud.user.create(db, obj_in=user_in)  # noqa: F841
        else:
            logger.warning(
                "Skipping creating superuser. User with email "
                f"{settings.FIRST_SUPERUSER} already exists. "
            )
        if not user.recipes:
            for recipe in RECIPES:
                ingredients_in = []
                for ingredient in recipe["ingredients"]:
                    ingredients_in.append(
                        schemas.IngredientCreate(
                            name=ingredient["name"],
                            quantity=ingredient["quantity"],
                            unit_type=ingredient["unit_type"],
                            notes=ingredient["notes"]
                        )
                    )
                recipe_in = schemas.RecipeCreate(
                    title=recipe["title"],
                    img_url=recipe["img_url"],
                    summary=recipe["summary"],
                    ingredients=ingredients_in,
                    instructions=recipe["instructions"],
                    notes=recipe["notes"],
                    submitter_id=user.id,
                )
                crud.recipe.create(db, obj_in=recipe_in)
    else:
        logger.warning(
            "Skipping creating superuser.  FIRST_SUPERUSER needs to be "
            "provided as an env variable. "
            "e.g.  FIRST_SUPERUSER=admin@api.coursemaker.io"
        )

import logging
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import base  # noqa: F401
from app.core.config import settings

logger = logging.getLogger(__name__)


RECIPES = [
    {
    "id": 4,
    "title": "Chicken Soup",
    "summary": "A classic comfort food that's perfect for a cold day.",
    "img_url": "https://www.allrecipes.com/recipe/22007/classic-chicken-noodle-soup/",
    "ingredients": [
        {
            "name": "Chicken",
            "quantity": 1,
            "unit_type": "pound",
            "notes": "Boneless, skinless chicken breasts or thighs."
        },
        {
            "name": "Carrots",
            "quantity": 2,
            "unit_type": "cloves",
            "notes": "Chopped."
        },
        {
            "name": "Celery",
            "quantity": 2,
            "unit_type": "cloves",
            "notes": "Chopped."
        },
        {
            "name": "Onion",
            "quantity": 1,
            "unit_type": "cloves",
            "notes": "Chopped."
        },
        {
            "name": "Garlic",
            "quantity": 4,
            "unit_type": "cloves",
            "notes": "Minced."
        },
        {
            "name": "Chicken Broth",
            "quantity": 8,
            "unit_type": "cups",
            "notes": ""
        },
        {
            "name": "Pasta",
            "quantity": 1,
            "unit_type": "cup",
            "notes": "Noodles, such as egg noodles or alphabet soup."
        },
        {
            "name": "Salt",
            "quantity": 1,
            "unit_type": "teaspoon",
            "notes": ""
        },
        {
            "name": "Pepper",
            "quantity": 1/2,
            "unit_type": "teaspoon",
            "notes": ""
        }
    ],
    "instructions": "1. In a large pot, combine the chicken, carrots, celery, onion, and garlic. Add enough water to cover the chicken. Bring to a boil, then reduce heat and simmer for 30 minutes, or until the chicken is cooked through. 2. Remove the chicken from the pot and shred it with two forks. Return the shredded chicken to the pot.3. Add the chicken broth and pasta to the pot. Bring to a boil, then reduce heat and simmer for 10 minutes, or until the pasta is cooked through.4. Season with salt and pepper to taste. Serve hot.",
    "notes": "This recipe can be easily customized to your liking. Add your favorite vegetables, such as potatoes, zucchini, or mushrooms. You can also add different types of pasta, such as macaroni or rice. If you don't have chicken broth, you can use water and a chicken bouillon cube. And if you're short on time, you can use rotisserie chicken instead of cooking your own."
},
    {
    "id": 5,
    "title": "Clam Chowder",
    "summary": "A hearty and creamy soup that's perfect for a cold day.",
    "img_url": "https://www.foodnetwork.com/recipes/alton-brown/clam-chowder-recipe-2014241",
    "ingredients": [
        {
            "name": "Clams",
            "quantity": 1,
            "unit_type": "pound",
            "notes": "Fresh, scrubbed, and chopped."
        },
        {
            "name": "Sausage",
            "quantity": 1/2,
            "unit_type": "pound",
            "notes": "Italian sausage, casings removed."
        },
        {
            "name": "Onion",
            "quantity": 1,
            "unit_type": "cloves",
            "notes": "Chopped."
        },
        {
            "name": "Garlic",
            "quantity": 2,
            "unit_type": "cloves",
            "notes": "Minced."
        },
        {
            "name": "Celery",
            "quantity": 2,
            "unit_type": "cloves",
            "notes": "Chopped."
        },
        {
            "name": "Potatoes",
            "quantity": 1,
            "unit_type": "medium",
            "notes": "Chopped."
        },
        {
            "name": "Cream",
            "quantity": 1,
            "unit_type": "cup",
            "notes": ""
        },
        {
            "name": "Half-and-Half",
            "quantity": 1,
            "unit_type": "cup",
            "notes": ""
        },
        {
            "name": "Salt",
            "quantity": 1,
            "unit_type": "teaspoon",
            "notes": ""
        },
        {
            "name": "Pepper",
            "quantity": 1/2,
            "unit_type": "teaspoon",
            "notes": ""
        }
    ],
    "instructions": "1. In a large pot, brown the sausage over medium heat.2. Add the onion, garlic, and celery to the pot and cook until softened, about 5 minutes.3. Add the potatoes and clams to the pot and cook until the potatoes are tender, about 10 minutes.4. Stir in the cream, half-and-half, salt, and pepper. Bring to a simmer and cook for 5 minutes, or until heated through.5. Serve hot.",
    "notes": "This recipe can be easily customized to your liking. Add your favorite vegetables, such as carrots, zucchini, or mushrooms. You can also add different types of pasta, such as macaroni or rice. If you don't have clams, you can use chopped shrimp or crab. And if you're short on time, you can use canned clams. But be sure to rinse them well before adding them to the soup."
},
    {
    "id": 6,
    "title": "Beer Bread",
    "summary": "A quick and easy bread that's perfect for a weeknight meal.",
    "img_url": "https://www.gimmesomeoven.com/honey-beer-bread/",
    "ingredients": [
        {
            "name": "Flour",
            "quantity": 3,
            "unit_type": "cups",
            "notes": "All-purpose flour."
        },
        {
            "name": "Baking Powder",
            "quantity": 1,
            "unit_type": "tablespoon",
            "notes": ""
        },
        {
            "name": "Salt",
            "quantity": 1,
            "unit_type": "teaspoon",
            "notes": ""
        },
        {
            "name": "Sugar",
            "quantity": 1/4,
            "unit_type": "cup",
            "notes": ""
        },
        {
            "name": "Beer",
            "quantity": 1,
            "unit_type": "12 ounce bottle",
            "notes": "Any type of beer will work, but a dark beer will give the bread a richer flavor."
        },
        {
            "name": "Butter",
            "quantity": 1/4,
            "unit_type": "cup",
            "notes": "Melted butter."
        }
    ],
    "instructions": "1. Preheat oven to 375 degrees F (190 degrees C). Grease and flour a 9x5-inch loaf pan.2. In a large bowl, whisk together the flour, baking powder, salt, and sugar.3. Add the beer and melted butter to the dry ingredients and stir until just combined. Do not overmix.4. Pour the batter into the prepared loaf pan and bake for 50-60 minutes, or until a toothpick inserted into the center comes out clean.5. Let cool in the pan for 10 minutes before removing to a wire rack to cool completely.",
    "notes": "This bread is best served warm. Enjoy!"
}
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

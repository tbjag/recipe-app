import os
import databases
import sqlalchemy
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

recipes = sqlalchemy.Table(
    "recipes",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("instructions", sqlalchemy.String),
    sqlalchemy.Column("ingredients", sqlalchemy.String),
    sqlalchemy.Column("notes", sqlalchemy.String),
)


engine = sqlalchemy.create_engine(
    DATABASE_URL
)
# metadata.create_all(engine)


class RecipeIn(BaseModel):
    title: str
    instructions: str
    ingredients: str
    notes: str


class Recipe(BaseModel):
    id: str
    title: str
    instructions: str
    ingredients: str
    notes: str


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/recipes/", response_model=List[Recipe])
async def read_recipes():
    query = recipes.select()
    return await database.fetch_all(query)


@app.post("/recipes/", response_model=Recipe)
async def create_recipe(recipe: RecipeIn):
    print(recipe)
    query = recipes.insert().values(title=recipe.title, instructions=recipe.instructions, ingredients=recipe.ingredients, notes=recipe.notes)
    last_record_id = await database.execute(query)
    return {**recipe.dict(), "id": last_record_id}
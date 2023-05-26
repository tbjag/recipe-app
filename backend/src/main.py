from sqlalchemy.orm import Session
from typing import List
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from src.schemas.note import Note, NoteCreate
from src import crud
from src import deps

app = FastAPI(title='Recipe Backend')

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

@app.get("/")
async def root():
    return {'test', 'Hello world'}

@app.get("/notes/", response_model=List[Note])
async def read_notes(db:Session = Depends(deps.get_db)):
    # query = notes.select()
    # return await database.fetch_all(query)
    notes = crud.note.get_multi(db=db)
    return notes


@app.post("/notes/", response_model=Note)
async def create_note(note_in: NoteCreate, db: Session = Depends(deps.get_db)):
    print(note_in)
    note = crud.note.create(db=db, obj_in=note_in)
    return note
from pydantic import BaseModel

from typing import Sequence

class NoteBase(BaseModel):
    text: str
    completed: bool

class NoteCreate(NoteBase):
    text: str
    completed: bool

class NoteUpdate(NoteBase):
    text: str

class NoteInDBBase(NoteBase):
    id: int

    class Config:
        orm_mode: True

# Properties to return to client
class Note(NoteInDBBase):
    pass

# Properties properties stored in DB
class NoteInDB(NoteInDBBase):
    pass
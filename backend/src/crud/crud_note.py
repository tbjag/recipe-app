from src.crud.base import CRUDBase
from src.models.note import Note
from src.schemas.note import NoteCreate, NoteUpdate


class CRUDRecipe(CRUDBase[Note, NoteCreate, NoteUpdate]):
    ...

note = CRUDRecipe(Note)
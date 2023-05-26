from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from src.db.base_class import Base


class Note(Base):  
    id = Column(Integer, primary_key=True, index=True)  
    text = Column(String(256), nullable=False)
    completed = Column(Boolean, nullable=False)
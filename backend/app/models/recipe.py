from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base

class Recipe(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(256), nullable=False)
    img_url = Column(String(256), index=True, nullable=True)
    summary = Column(String(256), nullable=True)
    instructions = Column(String(256), nullable=False)
    notes = Column(String(256), nullable=False)
    submitter_id = Column(Integer, ForeignKey("user.id"), nullable=True)
    submitter = relationship("User", back_populates="recipes")
    ingredients = relationship(
        "Ingredient",
        cascade="all,delete-orphan",
        back_populates="posted_recipe",
        uselist=True,
    )

from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship

from app.db.base_class import Base

class Ingredient(Base):
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    name = Column(String(256), nullable=False)
    quantity = Column(Float, nullable=True)
    unit_type = Column(String(256), nullable=True)
    notes = Column(String(256), nullable=False)
    posted_recipe_id = Column(Integer, ForeignKey("recipe.id"), nullable=True)
    posted_recipe = relationship("Recipe", back_populates="ingredients")
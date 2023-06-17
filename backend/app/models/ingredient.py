from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Ingredient(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False)
    quantity = Column(Float(scale= 2, precision=5))
    unit_type = Column(String(256), nullable=False)
    alternative = Column(String(256), nullable=True)
    recipe_id = Column(Integer, ForeignKey("recipe.id"), nullable=True)
    recipe = relationship("Recipe", back_populates="ingredients") #what is back populate
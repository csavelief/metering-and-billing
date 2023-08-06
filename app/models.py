from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class App(Base):
  __tablename__ = "apps"
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, unique=True, index=True)
  customers = relationship("Customer", back_populates="app")
  features = relationship("Feature", back_populates="app")


class Customer(Base):
  __tablename__ = "customers"
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, index=True)
  app_id = Column(Integer, ForeignKey("apps.id"))
  app = relationship("App", back_populates="customers")


class Feature(Base):
  __tablename__ = "features"
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, index=True)
  app_id = Column(Integer, ForeignKey("apps.id"))
  app = relationship("App", back_populates="features")

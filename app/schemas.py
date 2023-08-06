from pydantic import BaseModel


class AppBase(BaseModel):
  name: str


class CustomerBase(BaseModel):
  app_id: int
  name: str


class FeatureBase(BaseModel):
  app_id: int
  name: str


class Customer(CustomerBase):
  id: int

  class Config:
    orm_mode = True


class Feature(FeatureBase):
  id: int

  class Config:
    orm_mode = True


class App(AppBase):
  id: int
  customers: list[Customer] = []
  features: list[Feature] = []

  class Config:
    orm_mode = True

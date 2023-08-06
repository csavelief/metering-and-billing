from sqlalchemy.orm import Session

from . import models, schemas


def get_apps(db: Session, skip: int = 0, limit: int = 100):
  return db.query(models.App).offset(skip).limit(limit).all()


def get_app(db: Session, app_id: int):
  return db.query(models.App).filter(models.App.id == app_id).first()


def get_app_by_name(db: Session, name: str):
  return db.query(models.App).filter(models.App.name == name).first()


def create_app(db: Session, app: schemas.AppBase):
  db_app = models.App(name=app.name)
  db.add(db_app)
  db.commit()
  db.refresh(db_app)
  return db_app


def get_customers(db: Session, app_id=int, skip: int = 0, limit: int = 100):
  return db.query(models.Customer).filter(
    models.Customer.app_id == app_id).offset(skip).limit(limit).all()


def get_customer(db: Session, customer_id: int):
  return db.query(models.Customer).filter(
    models.Customer.id == customer_id).first()


def get_customer_by_name(db: Session, app_id: int, name: str):
  return db.query(models.Customer).filter(
    models.Customer.app_id == app_id).filter(
    models.Customer.name == name).first()


def create_customer(db: Session, customer: schemas.CustomerBase):
  db_customer = models.Customer(name=customer.name, app_id=customer.app_id)
  db.add(db_customer)
  db.commit()
  db.refresh(db_customer)
  return db_customer


def get_features(db: Session, app_id=int, skip: int = 0, limit: int = 100):
  return db.query(models.Feature).filter(
    models.Feature.app_id == app_id).offset(skip).limit(limit).all()


def get_feature(db: Session, feature_id: int):
  return db.query(models.Feature).filter(
    models.Feature.id == feature_id).first()


def get_feature_by_name(db: Session, app_id: int, name: str):
  return db.query(models.Feature).filter(
    models.Feature.app_id == app_id).filter(
    models.Feature.name == name).first()


def create_feature(db: Session, feature: schemas.FeatureBase):
  db_feature = models.Feature(name=feature.name, app_id=feature.app_id)
  db.add(db_feature)
  db.commit()
  db.refresh(db_feature)
  return db_feature

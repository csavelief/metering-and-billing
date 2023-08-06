from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)
app = FastAPI()


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()


@app.get("/apps/", response_model=list[schemas.App])
def read_apps(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
  return crud.get_apps(db, skip=skip, limit=limit)


@app.post("/apps/", response_model=schemas.App)
def create_app(app: schemas.AppBase, db: Session = Depends(get_db)):
  db_app = crud.get_app_by_name(db, name=app.name)
  if db_app:
    raise HTTPException(status_code=400, detail="App already registered")
  return crud.create_app(db=db, app=app)


@app.get("/customers/", response_model=list[schemas.Customer])
def read_customers(app_id: int, skip: int = 0, limit: int = 100,
    db: Session = Depends(get_db)):
  return crud.get_customers(db, app_id=app_id, skip=skip, limit=limit)


@app.post("/customers/", response_model=schemas.Customer)
def create_customer(customer: schemas.CustomerBase,
    db: Session = Depends(get_db)):
  db_app = crud.get_app(db, app_id=customer.app_id)
  if not db_app:
    raise HTTPException(status_code=400, detail="App not registered")
  db_customer = crud.get_customer_by_name(db, app_id=customer.app_id,
                                          name=customer.name)
  if db_customer:
    raise HTTPException(status_code=400, detail="Customer already registered")
  return crud.create_customer(db=db, customer=customer)


@app.get("/features/", response_model=list[schemas.Feature])
def read_customers(app_id: int, skip: int = 0, limit: int = 100,
    db: Session = Depends(get_db)):
  return crud.get_features(db, app_id=app_id, skip=skip, limit=limit)


@app.post("/features/", response_model=schemas.Feature)
def create_customer(feature: schemas.FeatureBase,
    db: Session = Depends(get_db)):
  db_app = crud.get_app(db, app_id=feature.app_id)
  if not db_app:
    raise HTTPException(status_code=400, detail="App not registered")
  db_feature = crud.get_feature_by_name(db, app_id=feature.app_id,
                                        name=feature.name)
  if db_feature:
    raise HTTPException(status_code=400, detail="Feature already registered")
  return crud.create_feature(db=db, feature=feature)

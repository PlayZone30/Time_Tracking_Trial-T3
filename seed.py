from sqlalchemy.orm import Session
import time
import uuid
import random

import crud
import models
import schemas
from database import SessionLocal, engine

# Create tables
models.Base.metadata.create_all(bind=engine)

# Create a new database session
db = SessionLocal()

def seed_data():
    print("Seeding data...")

    # Clean up existing data
    db.query(models.project_employees).delete()
    db.query(models.task_employees).delete()
    db.query(models.TimeEntry).delete()
    db.query(models.Screenshot).delete()
    db.query(models.Task).delete()
    db.query(models.Project).delete()
    db.query(models.Employee).delete()
    db.commit()

    # --- Create Employee ---
    employee_in = schemas.EmployeeCreate(name="Pavan Sai Reddy", email="pavansaireddy30@gmail.com", team_id="team1", shared_settings_id="settings1")
    employee = crud.create_employee(db=db, employee=employee_in)
    print(f"Created employee: {employee.name}")

    print("Seeding complete!")

if __name__ == "__main__":
    seed_data()

db.close()
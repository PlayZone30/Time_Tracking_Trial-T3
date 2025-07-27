from fastapi import Depends, FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import crud, models, schemas
from security import verify_password
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="frontend/static"), name="static")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/api/v1/employee", response_model=schemas.Employee)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db=db, employee=employee)


@app.get("/api/v1/employee", response_model=list[schemas.Employee])
def read_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    employees = crud.get_employees(db, skip=skip, limit=limit)
    return employees


@app.get("/api/v1/employee/{employee_id}", response_model=schemas.Employee)
def read_employee(employee_id: str, db: Session = Depends(get_db)):
    db_employee = crud.get_employee(db, employee_id=employee_id)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee


@app.put("/api/v1/employee/{employee_id}", response_model=schemas.Employee)
def update_employee(
    employee_id: str, employee: schemas.EmployeeCreate, db: Session = Depends(get_db)
):
    db_employee = crud.update_employee(db, employee_id=employee_id, employee=employee)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee


@app.get("/api/v1/employee/deactivate/{employee_id}", response_model=schemas.Employee)
def deactivate_employee(employee_id: str, db: Session = Depends(get_db)):
    db_employee = crud.deactivate_employee(db, employee_id=employee_id)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee


@app.get("/api/v1/employee/activate/{token}", response_model=schemas.Employee)
def activate_employee(token: str, db: Session = Depends(get_db)):
    db_employee = crud.activate_employee(db, token=token)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Invalid activation token")
    return db_employee


@app.post("/api/v1/project", response_model=schemas.Project)
def create_project(
    project: schemas.ProjectCreate, db: Session = Depends(get_db)
):
    # In a real application, you would get the creator_id from the authenticated user
    creator_id = "0"  # Placeholder
    return crud.create_project(db=db, project=project, creator_id=creator_id)


@app.get("/api/v1/project", response_model=list[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = crud.get_projects(db, skip=skip, limit=limit)
    return projects


@app.get("/api/v1/project/{project_id}", response_model=schemas.Project)
def read_project(project_id: str, db: Session = Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_.id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


@app.put("/api/v1/project/{project_id}", response_model=schemas.Project)
def update_project(
    project_id: str, project: schemas.ProjectCreate, db: Session = Depends(get_db)
):
    db_project = crud.update_project(db, project_id=project_id, project=project)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


@app.delete("/api/v1/project/{project_id}", response_model=schemas.Project)
def delete_project(project_id: str, db: Session = Depends(get_db)):
    db_project = crud.delete_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


@app.post("/api/v1/task", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    # In a real application, you would get the creator_id from the authenticated user
    creator_id = "0"  # Placeholder
    return crud.create_task(db=db, task=task, creator_id=creator_id)


@app.get("/api/v1/task", response_model=list[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tasks = crud.get_tasks(db, skip=skip, limit=limit)
    return tasks


@app.get("/api/v1/task/{task_id}", response_model=schemas.Task)
def read_task(task_id: str, db: Session = Depends(get_db)):
    db_task = crud.get_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@app.put("/api/v1/task/{task_id}", response_model=schemas.Task)
def update_task(
    task_id: str, task: schemas.TaskCreate, db: Session = Depends(get_db)
):
    db_task = crud.update_task(db, task_id=task_id, task=task)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@app.delete("/api/v1/task/{task_id}", response_model=schemas.Task)
def delete_task(task_id: str, db: Session = Depends(get_db)):
    db_task = crud.delete_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@app.get("/api/v1/analytics/window", response_model=list[schemas.TimeEntry])
def read_time_entries(
    start: int,
    end: int,
    employee_id: str = None,
    project_id: str = None,
    task_id: str = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    time_entries = crud.get_time_entries(
        db,
        start=start,
        end=end,
        employee_id=employee_id,
        project_id=project_id,
        task_id=task_id,
        skip=skip,
        limit=limit,
    )
    return time_entries


@app.post("/api/v1/analytics/window", response_model=schemas.TimeEntry)
def create_time_entry(
    time_entry: schemas.TimeEntryCreate, db: Session = Depends(get_db)
):
    return crud.create_time_entry(db=db, time_entry=time_entry)


@app.get("/api/v1/analytics/screenshot", response_model=list[schemas.Screenshot])
def read_screenshots(
    start: int,
    end: int,
    employee_id: str = None,
    limit: int = 15,
    next: str = None,
    db: Session = Depends(get_db),
):
    screenshots = crud.get_screenshots(
        db,
        start=start,
        end=end,
        employee_id=employee_id,
        limit=limit,
        next=next,
    )
    return screenshots


@app.post("/api/v1/analytics/screenshot", response_model=schemas.Screenshot)
def create_screenshot(
    screenshot: schemas.ScreenshotCreate, db: Session = Depends(get_db)
):
    return crud.create_screenshot(db=db, screenshot=screenshot)


@app.delete("/api/v1/analytics/screenshot/{screenshot_id}", response_model=schemas.Screenshot)
def delete_screenshot(screenshot_id: str, db: Session = Depends(get_db)):
    db_screenshot = crud.delete_screenshot(db, screenshot_id=screenshot_id)
    if db_screenshot is None:
        raise HTTPException(status_code=404, detail="Screenshot not found")
    return db_screenshot


@app.post("/api/v1/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    employee = crud.get_employee_by_email(db, email=form_data.username)
    if not employee or not verify_password(
        form_data.password, employee.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"access_token": employee.id, "token_type": "bearer", "user": employee}


@app.post("/api/v1/activity", response_model=schemas.Activity)
def create_activity(
    activity: schemas.ActivityCreate,
    employee_id: str,
    db: Session = Depends(get_db),
):
    return crud.create_activity(db=db, activity=activity, employee_id=employee_id)


@app.get("/api/v1/activity/{employee_id}/{date}", response_model=schemas.Activity)
def read_activity(employee_id: str, date: str, db: Session = Depends(get_db)):
    db_activity = crud.get_activity_by_employee_and_date(
        db, employee_id=employee_id, date=date
    )
    if db_activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")
    return db_activity


@app.get("/api/v1/dashboard/{employee_id}")
def read_dashboard(employee_id: str, db: Session = Depends(get_db)):
    dashboard_data = crud.get_dashboard_data(db, employee_id=employee_id)
    if dashboard_data is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return dashboard_data
from sqlalchemy.orm import Session
import time
import uuid
import models, schemas
from email_utils import send_activation_email
from security import get_password_hash
import string
import random


def get_employee(db: Session, employee_id: str):
    return db.query(models.Employee).filter(models.Employee.id == employee_id).first()


def get_employees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Employee).offset(skip).limit(limit).all()


def get_employee_by_email(db: Session, email: str):
    return db.query(models.Employee).filter(models.Employee.email == email).first()


def create_employee(db: Session, employee: schemas.EmployeeCreate):
    activation_token = str(uuid.uuid4())
    password = "".join(random.choices(string.ascii_uppercase + string.digits, k=8))
    hashed_password = get_password_hash(password)
    db_employee = models.Employee(
        id=str(uuid.uuid4()),
        name=employee.name,
        email=employee.email,
        team_id=employee.team_id,
        shared_settings_id=employee.shared_settings_id,
        account_id=str(uuid.uuid4()),
        identifier=employee.email,
        type="personal",
        organization_id=str(uuid.uuid4()),
        deactivated=0,
        invited=int(time.time() * 1000),
        created_at=int(time.time() * 1000),
        activation_token=activation_token,
        hashed_password=hashed_password,
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    send_activation_email(employee.email, activation_token, password)
    return db_employee


def update_employee(db: Session, employee_id: str, employee: schemas.EmployeeCreate):
    db_employee = get_employee(db, employee_id)
    if db_employee:
        db_employee.name = employee.name
        db_employee.email = employee.email
        db_employee.team_id = employee.team_id
        db_employee.shared_settings_id = employee.shared_settings_id
        db.commit()
        db.refresh(db_employee)
    return db_employee


def deactivate_employee(db: Session, employee_id: str):
    db_employee = get_employee(db, employee_id)
    if db_employee:
        db_employee.deactivated = int(time.time() * 1000)
        db.commit()
        db.refresh(db_employee)
    return db_employee


def activate_employee(db: Session, token: str):
    db_employee = (
        db.query(models.Employee)
        .filter(models.Employee.activation_token == token)
        .first()
    )
    if db_employee:
        db_employee.is_active = True
        db_employee.activation_token = None  # Token is single-use
        db.commit()
        db.refresh(db_employee)
    return db_employee


def get_project(db: Session, project_id: str):
    return db.query(models.Project).filter(models.Project.id == project_id).first()


def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Project).offset(skip).limit(limit).all()


def create_project(db: Session, project: schemas.ProjectCreate, creator_id: str):
    db_project = models.Project(
        id=str(uuid.uuid4()),
        name=project.name,
        description=project.description,
        billable=project.billable,
        creator_id=creator_id,
        organization_id=str(uuid.uuid4()),
        created_at=int(time.time() * 1000),
    )
    for employee_id in project.employees:
        employee = get_employee(db, employee_id)
        if employee:
            db_project.employees.append(employee)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def update_project(db: Session, project_id: str, project: schemas.ProjectCreate):
    db_project = get_project(db, project_id)
    if db_project:
        db_project.name = project.name
        db_project.description = project.description
        db_project.billable = project.billable
        db_project.employees = []
        for employee_id in project.employees:
            employee = get_employee(db, employee_id)
            if employee:
                db_project.employees.append(employee)
        db.commit()
        db.refresh(db_project)
    return db_project


def delete_project(db: Session, project_id: str):
    db_project = get_project(db, project_id)
    if db_project:
        db.delete(db_project)
        db.commit()
    return db_project


def get_task(db: Session, task_id: str):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Task).offset(skip).limit(limit).all()


def create_task(db: Session, task: schemas.TaskCreate, creator_id: str):
    db_task = models.Task(
        id=str(uuid.uuid4()),
        name=task.name,
        description=task.description,
        status=task.status,
        priority=task.priority,
        billable=task.billable,
        project_id=task.project_id,
        creator_id=creator_id,
        organization_id=str(uuid.uuid4()),
        created_at=int(time.time() * 1000),
    )
    for employee_id in task.employees:
        employee = get_employee(db, employee_id)
        if employee:
            db_task.employees.append(employee)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task(db: Session, task_id: str, task: schemas.TaskCreate):
    db_task = get_task(db, task_id)
    if db_task:
        db_task.name = task.name
        db_task.description = task.description
        db_task.status = task.status
        db_task.priority = task.priority
        db_task.billable = task.billable
        db_task.employees = []
        for employee_id in task.employees:
            employee = get_employee(db, employee_id)
            if employee:
                db_task.employees.append(employee)
        db.commit()
        db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: str):
    db_task = get_task(db, task_id)
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task


def get_time_entries(
    db: Session,
    start: int,
    end: int,
    employee_id: str = None,
    project_id: str = None,
    task_id: str = None,
    skip: int = 0,
    limit: int = 100,
):
    query = db.query(models.TimeEntry).filter(
        models.TimeEntry.start >= start, models.TimeEntry.end <= end
    )
    if employee_id:
        employee_ids = employee_id.split(",")
        query = query.filter(models.TimeEntry.employee_id.in_(employee_ids))
    if project_id:
        project_ids = project_id.split(",")
        query = query.filter(models.TimeEntry.project_id.in_(project_ids))
    if task_id:
        task_ids = task_id.split(",")
        query = query.filter(models.TimeEntry.task_id.in_(task_ids))
    return query.offset(skip).limit(limit).all()


def create_time_entry(db: Session, time_entry: schemas.TimeEntryCreate):
    db_time_entry = models.TimeEntry(id=str(uuid.uuid4()), **time_entry.dict())
    db.add(db_time_entry)
    db.commit()
    db.refresh(db_time_entry)
    return db_time_entry


def get_screenshots(
    db: Session,
    start: int,
    end: int,
    employee_id: str = None,
    limit: int = 15,
    next: str = None,
):
    query = db.query(models.Screenshot).filter(
        models.Screenshot.timestamp >= start, models.Screenshot.timestamp <= end
    )
    if employee_id:
        employee_ids = employee_id.split(",")
        query = query.filter(models.Screenshot.employee_id.in_(employee_ids))
    if next:
        # In a real application, 'next' would be a cursor for pagination
        # For this example, we'll just use offset
        query = query.offset(int(next))
    return query.limit(limit).all()


def create_screenshot(db: Session, screenshot: schemas.ScreenshotCreate):
    db_screenshot = models.Screenshot(id=str(uuid.uuid4()), **screenshot.dict())
    db.add(db_screenshot)
    db.commit()
    db.refresh(db_screenshot)
    return db_screenshot


def delete_screenshot(db: Session, screenshot_id: str):
    db_screenshot = (
        db.query(models.Screenshot)
        .filter(models.Screenshot.id == screenshot_id)
        .first()
    )
    if db_screenshot:
        db.delete(db_screenshot)
        db.commit()
    return db_screenshot


def create_activity(db: Session, activity: schemas.ActivityCreate, employee_id: str):
    db_activity = models.Activity(
        id=str(uuid.uuid4()),
        employee_id=employee_id,
        date=activity.date,
        total_duration=activity.total_duration,
        productive_time=activity.productive_time,
        unproductive_time=activity.unproductive_time,
    )
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)

    for app_usage in activity.app_usage:
        db_app_usage = models.AppUsage(
            id=str(uuid.uuid4()),
            activity_id=db_activity.id,
            app_name=app_usage.app_name,
            duration=app_usage.duration,
        )
        db.add(db_app_usage)

    db.commit()
    db.refresh(db_activity)
    return db_activity


def get_activity_by_employee_and_date(db: Session, employee_id: str, date: str):
    return (
        db.query(models.Activity)
        .filter(
            models.Activity.employee_id == employee_id, models.Activity.date == date
        )
        .first()
    )
from pydantic import BaseModel, field_validator
from typing import List, Optional
import models

# --- Base Schemas ---

class EmployeeBase(BaseModel):
    name: str
    email: str
    team_id: str
    shared_settings_id: str

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    billable: Optional[bool] = False

class TaskBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: Optional[str] = "To Do"
    priority: Optional[str] = "low"
    billable: Optional[bool] = False

class TimeEntryBase(BaseModel):
    start: int
    end: int
    employee_id: str
    project_id: str
    task_id: str

class ScreenshotBase(BaseModel):
    employee_id: str
    timestamp: int
    file_path: str
    permissions: str

# --- Create Schemas ---

class EmployeeCreate(EmployeeBase):
    pass

class ProjectCreate(ProjectBase):
    employees: List[str] = []

class TaskCreate(TaskBase):
    project_id: str
    employees: List[str] = []

class TimeEntryCreate(TimeEntryBase):
    pass

class ScreenshotCreate(ScreenshotBase):
    pass

# --- Full Schemas (for responses) ---

class Employee(EmployeeBase):
    id: str
    account_id: str
    identifier: str
    type: str
    organization_id: str
    deactivated: int
    invited: int
    created_at: int
    projects: List[str] = []

    @field_validator('projects', mode='before')
    def projects_to_ids(cls, v):
        if v and all(isinstance(p, models.Project) for p in v):
            return [p.id for p in v]
        return v

    class Config:
        from_attributes = True

class Project(ProjectBase):
    id: str
    archived: bool
    creator_id: str
    organization_id: str
    created_at: int
    employees: List[str] = []

    @field_validator('employees', mode='before')
    def employees_to_ids(cls, v):
        if v and all(isinstance(e, models.Employee) for e in v):
            return [e.id for e in v]
        return v

    class Config:
        from_attributes = True


class AppUsageBase(BaseModel):
    app_name: str
    duration: int


class AppUsageCreate(AppUsageBase):
    pass


class AppUsage(AppUsageBase):
    id: str
    activity_id: str

    class Config:
        from_attributes = True


class ActivityBase(BaseModel):
    date: str
    total_duration: int
    productive_time: int
    unproductive_time: int


class ActivityCreate(ActivityBase):
    app_usage: List[AppUsageCreate] = []


class Activity(ActivityBase):
    id: str
    employee_id: str
    app_usage: List[AppUsage] = []

    class Config:
        from_attributes = True

class Task(TaskBase):
    id: str
    project_id: str
    creator_id: str
    organization_id: str
    created_at: int
    employees: List[str] = []

    @field_validator('employees', mode='before')
    def employees_to_ids(cls, v):
        if v and all(isinstance(e, models.Employee) for e in v):
            return [e.id for e in v]
        return v

    class Config:
        from_attributes = True

class TimeEntry(TimeEntryBase):
    id: str
    class Config:
        from_attributes = True

class Screenshot(ScreenshotBase):
    id: str
    class Config:
        from_attributes = True
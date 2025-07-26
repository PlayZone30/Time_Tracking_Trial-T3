from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from database import Base

project_employees = Table(
    "project_employees",
    Base.metadata,
    Column("project_id", String, ForeignKey("projects.id")),
    Column("employee_id", String, ForeignKey("employees.id")),
)

task_employees = Table(
    "task_employees",
    Base.metadata,
    Column("task_id", String, ForeignKey("tasks.id")),
    Column("employee_id", String, ForeignKey("employees.id")),
)


class Employee(Base):
    __tablename__ = "employees"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    team_id = Column(String)
    shared_settings_id = Column(String)
    account_id = Column(String)
    identifier = Column(String)
    type = Column(String)
    organization_id = Column(String)
    deactivated = Column(Integer)
    invited = Column(Integer)
    created_at = Column(Integer)
    is_active = Column(Boolean, default=False)
    activation_token = Column(String, index=True, unique=True)

    projects = relationship(
        "Project", secondary=project_employees, back_populates="employees"
    )
    tasks = relationship("Task", secondary=task_employees, back_populates="employees")


class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    archived = Column(Boolean, default=False)
    billable = Column(Boolean, default=False)
    creator_id = Column(String)
    organization_id = Column(String)
    created_at = Column(Integer)

    employees = relationship(
        "Employee", secondary=project_employees, back_populates="projects"
    )
    tasks = relationship("Task", back_populates="project")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    status = Column(String)
    priority = Column(String)
    billable = Column(Boolean, default=False)
    project_id = Column(String, ForeignKey("projects.id"))
    creator_id = Column(String)
    organization_id = Column(String)
    created_at = Column(Integer)

    project = relationship("Project", back_populates="tasks")
    employees = relationship(
        "Employee", secondary=task_employees, back_populates="tasks"
    )


class TimeEntry(Base):
    __tablename__ = "time_entries"

    id = Column(String, primary_key=True, index=True)
    start = Column(Integer)
    end = Column(Integer)
    employee_id = Column(String, ForeignKey("employees.id"))
    project_id = Column(String, ForeignKey("projects.id"))
    task_id = Column(String, ForeignKey("tasks.id"))


class Screenshot(Base):
    __tablename__ = "screenshots"

    id = Column(String, primary_key=True, index=True)
    employee_id = Column(String, ForeignKey("employees.id"))
    timestamp = Column(Integer)
    file_path = Column(String)
    permissions = Column(String)
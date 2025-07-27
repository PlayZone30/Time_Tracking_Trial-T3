# Codebase Documentation

This document provides a comprehensive overview of the time-tracking application's codebase. It covers the backend API, the local Electron application, and the overall project structure.

## Project Overview

The project is a time-tracking application designed to help users monitor their work, track time spent on projects and tasks, and analyze their productivity. It consists of two main components:

*   **Backend API:** A powerful API built with FastAPI that handles all the business logic, data storage, and user authentication.
*   **Local Application:** An Electron application with a React-based frontend that provides a user-friendly interface for time tracking and data visualization.

## Backend (FastAPI)

The backend is the core of the application, providing a robust and scalable API for the frontend to consume.

### Key Technologies

*   **FastAPI:** A modern, high-performance web framework for building APIs with Python.
*   **SQLAlchemy:** A powerful SQL toolkit and Object-Relational Mapper (ORM) for Python.
*   **Pydantic:** A data validation and settings management library for Python.
*   **Passlib:** A password hashing library for Python.

### Project Structure

The backend code is organized into the following files:

*   `main.py`: The main application file that defines the FastAPI app and its API endpoints.
*   `models.py`: Defines the SQLAlchemy database models for employees, projects, tasks, and other data.
*   `schemas.py`: Defines the Pydantic schemas for data validation and serialization.
*   `crud.py`: Contains the CRUD (Create, Read, Update, Delete) operations for interacting with the database.
*   `database.py`: Configures the database connection and session management.
*   `security.py`: Handles password hashing and verification.
*   `email_utils.py`: Manages sending activation emails to new users.
*   `config.py`: Contains the SMTP configuration for sending emails.

### API Endpoints

The backend exposes a comprehensive set of API endpoints for managing the application's data. These endpoints are organized by resource and follow a consistent naming convention.

*   **Employees:** `/api/v1/employee`
*   **Projects:** `/api/v1/project`
*   **Tasks:** `/api/v1/task`
*   **Time Entries:** `/api/v1/analytics/window`
*   **Screenshots:** `/api/v1/analytics/screenshot`
*   **Activity:** `/api/v1/activity`
*   **Dashboard:** `/api/v1/dashboard`
*   **Login:** `/api/v1/login`

## Local Application (Electron + React)

The local application provides the user interface for the time-tracking system. It is built with Electron and React, providing a cross-platform desktop experience.

### Key Technologies

*   **Electron:** A framework for building cross-platform desktop applications with web technologies.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **React Query:** A data-fetching and state management library for React.

### Project Structure

The local application's code is organized into the following directories:

*   `local_app/electron.cjs`: The main Electron application file that creates the browser window and handles system events.
*   `local_app/client/src`: The root directory for the React application.
*   `local_app/client/src/pages`: Contains the main pages of the application, such as the sign-in page and the dashboard.
*   `local_app/client/src/components`: Contains the reusable React components used throughout the application.
*   `local_app/get_active_window.py`: A Python script that is executed by the Electron app to get the title of the active window.

### Application Flow

1.  **Sign-In:** The user is first presented with a sign-in page where they can enter their credentials. The app then sends a request to the backend's `/api/v1/login` endpoint to authenticate the user.
2.  **Dashboard:** Upon successful authentication, the user is redirected to the dashboard. The dashboard displays key metrics, such as weekly work duration, earnings, and project activity.
3.  **Time Tracking:** The user can start and stop the time tracker from the dashboard. The app will then track the user's application usage and take screenshots at regular intervals.
4.  **Data Synchronization:** The tracking data is sent to the backend's `/api/v1/activity` and `/api/v1/analytics/screenshot` endpoints to be stored in the database.
5.  **Data Visualization:** The dashboard displays visualizations of the user's activity, such as charts and graphs, to help them understand their productivity.

## Data Flow

The data flows between the local application and the backend API as follows:

1.  The local application sends requests to the backend to fetch data, such as the user's dashboard data, projects, and tasks.
2.  The backend processes these requests, retrieves the data from the database, and sends it back to the local application in JSON format.
3.  The local application then uses this data to render the user interface and display the relevant information to the user.
4.  When the user tracks their time, the local application sends the tracking data to the backend to be stored in the database.

This architecture allows for a clear separation of concerns between the frontend and the backend, making the application more modular, scalable, and maintainable.
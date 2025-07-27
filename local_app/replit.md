# Time Tracking Dashboard Application

## Overview

This is a full-stack time tracking dashboard application built with React, Express, and PostgreSQL. The application provides user authentication, project management, and time tracking capabilities with a modern, responsive UI built using shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (Neon serverless)
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints for authentication and data management

### Data Storage
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM with schema-first approach
- **Migration System**: Drizzle Kit for database migrations
- **Development Storage**: In-memory storage implementation for development/testing

## Key Components

### Authentication System
- Simple email/password authentication
- Session-based user management
- Client-side user state persistence in localStorage
- Protected routes with automatic redirects

### Time Tracking Features
- Project creation and management with color coding
- Time entry tracking with start/stop functionality
- Historical time entry viewing and editing
- Real-time metrics and analytics dashboard

### Database Schema
- **Users**: Basic user information (id, username, email, password, name)
- **Projects**: User projects with descriptions and visual styling
- **Time Entries**: Time tracking records linked to users and projects

### UI Components
- Metric cards with trend indicators and sparkline charts
- Time tracker interface with project selection
- Responsive dashboard layout
- Toast notifications for user feedback
- Custom charts and data visualizations

## Data Flow

1. **Authentication Flow**
   - User submits credentials via sign-in form
   - Server validates against database and creates session
   - Client stores user data and redirects to dashboard
   - Subsequent requests include session cookies for authentication

2. **Time Tracking Flow**
   - User selects project and starts timer
   - Time entries are created/updated via API calls
   - Real-time updates to dashboard metrics
   - Historical data retrieved for analytics

3. **Data Synchronization**
   - React Query manages server state caching and synchronization
   - Optimistic updates for better user experience
   - Background refetching for data consistency

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Accessible UI component primitives
- **react-hook-form**: Form state management and validation
- **zod**: Runtime type validation and schema definition

### Development Tools
- **vite**: Development server and build tool
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **drizzle-kit**: Database migration and introspection tools

### UI and Styling
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library
- **date-fns**: Date manipulation utilities

## Deployment Strategy

### Development Environment
- Vite development server with HMR (Hot Module Replacement)
- Express server with TypeScript compilation via tsx
- Environment-based configuration for database connections
- Development-specific middleware for logging and debugging

### Production Build
- Client: Vite builds React app to static files in `dist/public`
- Server: esbuild bundles Express server to `dist/index.js`
- Single-command deployment with `npm run build` followed by `npm start`
- Environment variables for production database configuration

### Database Management
- Drizzle migrations stored in `./migrations` directory
- Schema definitions in shared directory for type safety
- Push-based deployment with `npm run db:push`
- PostgreSQL compatibility with Neon serverless hosting

### File Structure
- `client/`: React frontend application
- `server/`: Express backend with API routes
- `shared/`: Common schemas and types used by both client and server
- Monorepo structure with shared TypeScript configuration
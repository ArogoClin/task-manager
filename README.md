# Task Manager Application

A full-stack task management web application with a modern interface and robust backend API. Built with React, Express, and Prisma ORM.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [Design Decisions](#design-decisions)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## About the Project

This task management application allows users to efficiently organize their work by creating, updating, and tracking tasks with various attributes such as priority levels, status, tags, and due dates. The application features a clean, intuitive interface with real-time statistics and advanced filtering capabilities.

### Key Features

- Complete CRUD operations for task management
- Real-time task statistics dashboard
- Multi-criteria filtering (status, priority, search)
- Priority-based task organization (Low, Medium, High, Urgent)
- Status tracking (Pending, In Progress, Completed)
- Tag-based categorization
- Due date management with overdue indicators
- Fully responsive design for all devices
- Toast notifications for user feedback
- Loading states and error handling

---

## Tech Stack

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express | 4.x | Web framework |
| Prisma | 5.x | ORM and database toolkit |
| SQLite | - | Database |
| CORS | - | Cross-origin resource sharing |
| dotenv | - | Environment variable management |

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | UI library |
| Vite | 5.x | Build tool and dev server |
| Tailwind CSS | 3.4.x | Utility-first CSS framework |
| Lucide React | Latest | Icon library |
| Axios | Latest | HTTP client |
| React Hot Toast | Latest | Toast notifications |
| date-fns | Latest | Date manipulation and formatting |

---

## Project Structure

```
task-manager/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Database migrations
│   ├── controllers/
│   │   └── taskController.js      # Request handlers
│   ├── routes/
│   │   └── taskRoutes.js          # API routes
│   ├── middleware/
│   │   ├── errorHandler.js        # Global error handler
│   │   └── validateRequest.js     # Input validation
│   ├── utils/
│   │   ├── prismaClient.js        # Prisma client instance
│   │   └── asyncHandler.js        # Async error wrapper
│   ├── config/
│   │   └── constants.js           # Application constants
│   ├── app.js                     # Express app entry point
│   ├── .env                       # Environment variables
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/                # Reusable UI components
    │   │   │   ├── Button.jsx
    │   │   │   ├── Input.jsx
    │   │   │   ├── Select.jsx
    │   │   │   ├── Badge.jsx
    │   │   │   ├── Card.jsx
    │   │   │   ├── Modal.jsx
    │   │   │   └── Textarea.jsx
    │   │   ├── layout/            # Layout components
    │   │   │   ├── Header.jsx
    │   │   │   └── Layout.jsx
    │   │   └── tasks/             # Task-specific components
    │   │       ├── TaskStats.jsx
    │   │       ├── TaskFilters.jsx
    │   │       ├── TaskList.jsx
    │   │       ├── TaskCard.jsx
    │   │       └── TaskForm.jsx
    │   ├── services/
    │   │   └── api.js             # API service layer
    │   ├── hooks/
    │   │   └── useTasks.js        # Custom hook for task management
    │   ├── utils/
    │   │   ├── constants.js       # Frontend constants
    │   │   └── dateHelpers.js     # Date utility functions
    │   ├── App.jsx                # Main application component
    │   ├── main.jsx               # Application entry point
    │   └── index.css              # Global styles
    ├── .env                       # Environment variables
    ├── tailwind.config.js         # Tailwind configuration
    ├── vite.config.js             # Vite configuration
    └── package.json
```

---

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For cloning the repository

To check your installed versions:

```bash
node --version
npm --version
git --version
```

---

## Installation & Setup

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd task-manager

# Backend setup
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev

# Frontend setup (open new terminal)
cd frontend
npm install
npm run dev
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:5173`.

### Detailed Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file — create a `.env` file in the backend root directory:

```env
DATABASE_URL="file:./dev.db"
PORT=5000
NODE_ENV=development
```

4. Generate Prisma Client:

```bash
npx prisma generate
```

5. Run database migrations:

```bash
npx prisma migrate dev --name init
```

6. Start the development server:

```bash
npm run dev
```

The backend API will be running at `http://localhost:5000`.

Verify the server is running by opening `http://localhost:5000` in your browser. You should see:

```json
{
  "message": "Task Manager API",
  "version": "1.0.0",
  "status": "active",
  "endpoints": {
    "tasks": "/api/tasks",
    "stats": "/api/tasks/stats",
    "health": "/health"
  }
}
```

### Detailed Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file — create a `.env` file in the frontend root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser to use the application.

---

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | /tasks | Get all tasks with optional filters | None |
| GET | /tasks/:id | Get a single task by ID | None |
| POST | /tasks | Create a new task | None |
| PUT | /tasks/:id | Update an existing task | None |
| DELETE | /tasks/:id | Delete a task | None |
| GET | /tasks/stats | Get task statistics | None |

### Query Parameters (GET /tasks)

- `status` — Filter by status (`pending`, `in_progress`, `completed`)
- `priority` — Filter by priority (`low`, `medium`, `high`, `urgent`)
- `search` — Search by title or description

Example:
```
GET /api/tasks?status=pending&priority=high&search=frontend
```

### Request/Response Examples

#### Create Task

**Request:**
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Build React Frontend",
  "description": "Create responsive UI with Tailwind CSS",
  "status": "in_progress",
  "priority": "high",
  "tags": ["frontend", "react"],
  "dueDate": "2026-03-01"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Build React Frontend",
    "description": "Create responsive UI with Tailwind CSS",
    "status": "in_progress",
    "priority": "high",
    "tags": ["frontend", "react"],
    "createDate": "2026-02-26T18:30:00.000Z",
    "dueDate": "2026-03-01T00:00:00.000Z",
    "updatedAt": "2026-02-26T18:30:00.000Z",
    "isOverdue": false
  }
}
```

#### Get All Tasks

**Request:**
```http
GET /api/tasks
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Build React Frontend",
      "description": "Create responsive UI with Tailwind CSS",
      "status": "in_progress",
      "priority": "high",
      "tags": ["frontend", "react"],
      "createDate": "2026-02-26T18:30:00.000Z",
      "dueDate": "2026-03-01T00:00:00.000Z",
      "updatedAt": "2026-02-26T18:30:00.000Z",
      "isOverdue": false
    }
  ]
}
```

#### Update Task

**Request:**
```http
PUT /api/tasks/1
Content-Type: application/json

{
  "status": "completed"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "title": "Build React Frontend",
    "status": "completed",
    "updatedAt": "2026-02-26T19:00:00.000Z"
  }
}
```

#### Delete Task

**Request:**
```http
DELETE /api/tasks/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": 1
  }
}
```

#### Get Statistics

**Request:**
```http
GET /api/tasks/stats
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "byStatus": {
      "pending": 3,
      "inProgress": 4,
      "completed": 3
    },
    "overdue": 1,
    "byPriority": {
      "low": 2,
      "medium": 4,
      "high": 3,
      "urgent": 1
    }
  }
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Title is required and must be a non-empty string"
  ]
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Task with ID 999 not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Database Schema

### Task Table

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | Primary Key, Auto-increment | Unique task identifier |
| title | String | Required, Max 255 chars | Task title |
| description | String | Optional | Detailed task description |
| status | String | Default: "pending" | Task status (pending, in_progress, completed) |
| priority | String | Default: "medium" | Task priority (low, medium, high, urgent) |
| tags | String | Optional | JSON string of tags |
| createDate | DateTime | Default: now() | Task creation timestamp |
| dueDate | DateTime | Optional | Task due date |
| updatedAt | DateTime | Auto-updated | Last update timestamp |

### Indexes

- Index on `status` for efficient filtering
- Index on `dueDate` for sorting and overdue checks
- Index on `priority` for priority-based queries

### Schema Definition (Prisma)

```prisma
model Task {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  status      String    @default("pending")
  priority    String    @default("medium")
  tags        String?
  createDate  DateTime  @default(now()) @map("create_date")
  dueDate     DateTime? @map("due_date")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  @@index([status])
  @@index([dueDate])
  @@index([priority])
  @@map("tasks")
}
```

---

## Usage Guide

### Creating a Task

1. Click the **"New Task"** button in the top-right corner
2. Fill in the task details:
   - **Title** (required): Brief task name
   - **Description** (optional): Detailed information
   - **Status**: Pending, In Progress, or Completed
   - **Priority**: Low, Medium, High, or Urgent
   - **Due Date** (optional): Target completion date
   - **Tags** (optional): Comma-separated tags
3. Click **"Create Task"** to save

### Viewing Tasks

All tasks are displayed as cards in a grid layout. Each card shows the priority badge (color-coded), task title and description, tags (if any), due date and status, and quick action buttons.

### Filtering Tasks

Use the filter bar to narrow down tasks by **Status** (pending, in progress, completed), **Priority** level, or **Search** (by title or description). Click **Clear** to reset all filters.

### Editing a Task

Click the edit icon (pencil) on any task card, modify the desired fields in the modal, then click **"Update Task"** to save changes.

### Completing a Task

Click the circle icon on a task card to mark it as complete, or click the checkmark icon to mark a completed task as incomplete.

### Deleting a Task

Click the delete icon (trash) on any task card and confirm the deletion in the popup dialog.

### Viewing Statistics

The dashboard at the top shows **Total Tasks**, **Pending**, **In Progress**, **Completed**, and an **Overdue Alert** (if any).

---

## Design Decisions

### Backend Architecture

**Express.js** was chosen for its lightweight, flexible nature and large middleware ecosystem. **Prisma ORM** provides type-safe database queries, automatic migrations, and a clean schema definition with built-in connection pooling. **SQLite** requires zero configuration, is file-based for easy backup, and can be easily migrated to PostgreSQL/MySQL if needed. The **RESTful API design** uses standard HTTP methods, meaningful status codes, and consistent response formatting.

**Error Handling Strategy** includes a global error handler middleware, async wrapper for route handlers, input validation at multiple levels, and detailed error messages in development.

### Frontend Architecture

**React with Vite** provides a fast development server with HMR, optimized production builds, and excellent developer experience. **Tailwind CSS** enables rapid development with a consistent design system and easy responsive layouts. Components are organized with a clear separation of concerns (UI, Layout, Feature) with reusable UI components and a custom `useTasks` hook for business logic. State is managed with React hooks — no global state management was needed given the app's scope. **Axios** is used for HTTP requests via a centralized API service with request/response interceptors.

### UI/UX Decisions

The color scheme uses blue as the primary color (professional, trustworthy), with status-based colors (yellow for pending, blue for in progress, green for completed) and priority-based colors (red for urgent, orange for high). The responsive design follows a mobile-first approach with breakpoints at 640px and 1024px. User feedback is provided through toast notifications, loading states, disabled states during processing, empty states with helpful messages, and overdue indicators.

---

## Future Improvements

### Features

- User authentication and authorization
- Task categories/projects
- Subtasks and task dependencies
- File attachments
- Task comments and activity log
- Drag-and-drop task reordering
- Calendar view for tasks
- Email notifications for due dates
- Task templates
- Bulk operations (delete, update multiple tasks)

### Technical Enhancements

- Unit and integration tests (Jest, React Testing Library)
- End-to-end tests (Cypress, Playwright)
- API rate limiting and request caching
- Database query optimization and pagination
- Real-time updates (WebSocket)
- PWA capabilities (offline support)
- Dark mode toggle
- Export tasks (CSV, PDF)

### Infrastructure

- Docker containerization
- CI/CD pipeline
- Production deployment (Vercel, Railway, Render)
- Database migration to PostgreSQL
- Logging, monitoring, and performance analytics

---

## Author

**Your Name**

- Email: your.email@example.com
- GitHub: [yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

*Built as part of a technical assessment for Health Tech Solutions - CHQI Project*
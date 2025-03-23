# Student Management System

A full-stack web application for managing student data, built with modern web technologies.

## Project Structure

This project consists of two main components:

- **Frontend**: A React application built with Vite, TanStack libraries, and Tailwind CSS
- **Backend**: A REST API built with Hono, Bun runtime, and Drizzle ORM with SQLite

## Prerequisites

Before you begin, make sure you have the following installed:

- [Bun](https://bun.sh/) (v1.0.0 or higher)
- [Node.js](https://nodejs.org/) (v16.0.0 or higher, although Bun can be used for both parts)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd student-management-system
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
bun install

# Create environment file
cp .env.example .env

# Generate database migrations
bun run db:generate

# Run migrations to set up the database
bun run db:migrate

# (Optional) Seed the database with initial data
bun run seed
```

### 3. Frontend Setup

```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
bun install
```

## Running the Application

### Simultaneously run both Frontend and Backend

From the root directory:

```bash
# Start the development server
bun run dev
```

### Backend

From the backend directory:

```bash
# Start the development server
bun run dev
```

The backend API will be available at http://localhost:3000.

### Frontend

From the frontend directory:

```bash
# Start the development server
bun run dev
```

The frontend application will be available at http://localhost:5173.

## Available Scripts

### Backend Scripts

```
"dev": "bun run --hot src/index.ts" - Start development server with hot reloading
"db:generate": "drizzle-kit generate:sqlite" - Generate database migration files
"db:migrate": "bun run src/db/migrate.ts" - Apply migrations to the database
"db:studio": "drizzle-kit studio" - Open database GUI for viewing/editing data
"start": "bun run src/index.ts" - Start the server in production mode
"seed": "bun run src/db/seed.ts" - Populate the database with sample data
```

### Frontend Scripts

```
"dev": "vite" - Start the development server
"build": "tsc && vite build" - Build for production
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0" - Lint the code
"preview": "vite preview" - Preview the production build locally
```

## API Endpoints

The backend exposes the following endpoints:

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student by ID
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update an existing student
- `DELETE /api/students/:id` - Delete a student

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check that the backend is running before accessing the frontend
3. Verify that your `.env` file is set up correctly
4. For database issues, try deleting the `sqlite.db` file and running migrations again

## Technology Stack

### Frontend

- React with TypeScript
- Vite for development and building
- TanStack libraries (React Query, React Router, React Table, React Form)
- Tailwind CSS for styling

### Backend

- Bun JavaScript runtime
- Hono framework for API routes
- Drizzle ORM for database operations
- SQLite for data storage
- Zod for data validation

## License

[MIT](LICENSE)

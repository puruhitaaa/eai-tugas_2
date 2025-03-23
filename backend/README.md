# Student Management API

A REST API for managing student data built with Hono, Bun, and Drizzle ORM.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   bun install
   ```
3. Copy the environment file:
   ```
   cp .env.example .env
   ```
4. Generate database migrations:
   ```
   bun run db:generate
   ```
5. Run migrations:
   ```
   bun run db:migrate
   ```
6. Seed the database (optional):
   ```
   bun run seed
   ```

## Development

Start the development server with:

```
bun run dev
```

## API Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a student by ID
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Student Data Model

```json
{
  "name": "John Doe",
  "student_id": "ST001",
  "address": "123 Main St, City",
  "email": "john.doe@example.com",
  "phone": "123-456-7890"
}
```

## Database Tools

- `bun run db:generate` - Generate migration files
- `bun run db:migrate` - Run migrations
- `bun run db:studio` - Open Drizzle Studio to view/edit data

## Production

To run in production:

```
bun run start
```

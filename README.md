# Survey Management API

A Node.js + Express + TypeScript + Sequelize REST API for managing surveys with role-based access control (ADMIN and OFFICER roles).

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Survey Management](#survey-management)
- [Error Handling](#error-handling)
- [Database Sync](#database-sync)

---

## Features

- **User Authentication**: Signup and login with JWT tokens
- **Role-Based Access Control**: ADMIN and OFFICER roles with route protection
- **Survey Management**: Create surveys, view submissions, submit survey responses
- **Exception Handling**: Centralized error handling with custom exceptions
- **Automatic Database Sync**: Sequelize auto-sync in development mode
- **Type Safety**: Full TypeScript support with strict typing

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL + Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Async Handling**: Custom async error wrapper middleware

---

## Project Structure

```
src/
├── app.ts                          # Express app setup
├── server.ts                       # Server entry point
├── common/
│   ├── config/
│   │   └── app-config.ts           # Environment config
│   └── exception/                  # Custom exception classes
│       ├── bad-request-exception.ts
│       ├── forbidden-exception.ts
│       ├── not-found-exception.ts
│       └── unauthrozied-exception.ts
├── controllers/
│   ├── base.controller.ts
│   ├── auth.controller.ts
│   └── survey.controller.ts
├── database/
│   ├── db.config.ts                # Sequelize config
│   ├── db.service.ts               # Database operations
│   ├── db.interface.ts             # DB service interface
│   └── entities/                   # Sequelize models
│       ├── user.entity.ts
│       ├── survey.entity.ts
│       ├── survey-field.entity.ts
│       ├── survey-submission.entity.ts
│       └── survey-answer.entity.ts
├── middlewares/
│   ├── async-handler.middleware.ts
│   ├── auth.middleware.ts
│   └── role.middleware.ts
├── routers/
│   └── v1/
│       ├── index.ts
│       ├── auth.router.ts
│       └── survey.router.ts
├── services/
│   ├── auth.service.ts
│   └── survey.service.ts
└── utils/
    └── jwt.utils.ts
```

---

## Setup & Installation

### Prerequisites

- Node.js (v16+)
- MySQL Server running locally or accessible
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   cd survey-management
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Create a MySQL database** (if not exists)
   ```sql
   CREATE DATABASE survey;
   ```

4. **Set up environment variables** (see next section)

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server
APP_PORT=3000
APP_ENV=development

# Database
DB_NAME=survey
DB_USER=jahidhasan
DB_PASS=jahidhasan@123
DB_HOST=localhost
DB_PORT=3306

# JWT
JWT_SECRET=supersecret
```

**Explanation:**

| Variable     | Description                           | Example       |
|--------------|---------------------------------------|---------------|
| `APP_PORT`   | Express server port                   | `3000`        |
| `APP_ENV`    | Environment (`development` / `production`) | `development` |
| `DB_NAME`    | MySQL database name                   | `survey`      |
| `DB_USER`    | MySQL username                        | `jahidhasan`  |
| `DB_PASS`    | MySQL password                        | `jahidhasan@123` |
| `DB_HOST`    | MySQL host                            | `localhost`   |
| `DB_PORT`    | MySQL port                            | `3306`        |
| `JWT_SECRET` | Secret key for JWT signing            | `supersecret` |

---

## Running the Application

### Development Mode

Tables are automatically created/synced on startup:

```bash
yarn dev
# or
npm run dev
```

**Console Output:**
```
Database connected
Database synced (development mode)
Server running on port 3000
```

### Production Mode

Set `APP_ENV=production` to skip auto-sync:

```bash
APP_ENV=production yarn build
APP_ENV=production yarn start
```

---

## API Documentation

### Base URL

```
http://localhost:3000/v1
```

---

### Authentication

#### Signup (Public)

Create a new user account.

**Endpoint**
```
POST /auth/signup
```

**Request Headers**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body**
```json
{
  "name": "John Admin",
  "email": "admin@example.com",
  "password": "securepassword123",
  "role": "ADMIN"
}
```

**Response** (201 Created)
```json
{
  "message": "Successfully signed up",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Admin",
      "email": "admin@example.com",
      "role": "ADMIN"
    }
  }
}
```

**Error Response** (400 Bad Request)
```json
{
  "message": "Email already registered",
  "data": null
}
```

---

#### Login (Public)

Authenticate and receive a JWT token.

**Endpoint**
```
POST /auth/login
```

**Request Headers**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body**
```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response** (200 OK)
```json
{
  "message": "Successfully logged in",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Admin",
      "email": "admin@example.com",
      "role": "ADMIN"
    }
  }
}
```

**Error Response** (401 Unauthorized)
```json
{
  "message": "Invalid email or password",
  "data": null
}
```

---

### Survey Management

#### Create Survey (Protected - ADMIN only)

Create a new survey with fields.

**Endpoint**
```
POST /survey/create
```

**Request Headers**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Request Body**
```json
{
  "title": "Customer Satisfaction Survey",
  "description": "Please rate your experience with our service",
  "fields": [
    {
      "label": "How satisfied are you?",
      "type": "RADIO",
      "required": true,
      "options": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"]
    },
    {
      "label": "Any additional comments?",
      "type": "TEXT",
      "required": false
    }
  ]
}
```

**Response** (201 Created)
```json
{
  "message": "Successfully created",
  "data": {
    "id": 1,
    "title": "Customer Satisfaction Survey",
    "description": "Please rate your experience with our service",
    "createdBy": 1,
    "updatedAt": "2026-02-01T10:30:00.000Z",
    "createdAt": "2026-02-01T10:30:00.000Z"
  }
}
```

**Error Response** (401 Unauthorized - missing token)
```json
{
  "message": "Unauthorized",
  "data": null
}
```

**Error Response** (403 Forbidden - not ADMIN)
```json
{
  "message": "Forbidden: insufficient role",
  "data": null
}
```

---

#### List Surveys (Public)

Get all surveys with their fields.

**Endpoint**
```
GET /survey/list
```

**Request Headers**
```json
{
  "Content-Type": "application/json"
}
```

**Response** (200 OK)
```json
{
  "message": "List of surveys",
  "data": [
    {
      "id": 1,
      "title": "Customer Satisfaction Survey",
      "description": "Please rate your experience with our service",
      "createdBy": 1,
      "createdAt": "2026-02-01T10:30:00.000Z",
      "updatedAt": "2026-02-01T10:30:00.000Z",
      "SurveyFields": [
        {
          "id": 1,
          "surveyId": 1,
          "label": "How satisfied are you?",
          "type": "RADIO",
          "required": true,
          "options": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"]
        }
      ]
    }
  ]
}
```

---

#### View Survey Submissions (Protected - ADMIN only)

Get all submissions for a specific survey.

**Endpoint**
```
GET /survey/:surveyId/submissions
```

**Request Headers**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Path Parameters**
| Parameter | Type   | Description      |
|-----------|--------|------------------|
| `surveyId` | number | ID of the survey |

**Response** (200 OK)
```json
[
  {
    "id": 1,
    "surveyId": 1,
    "officerId": 2,
    "createdAt": "2026-02-01T11:00:00.000Z",
    "updatedAt": "2026-02-01T11:00:00.000Z",
    "SurveyAnswers": [
      {
        "id": 1,
        "submissionId": 1,
        "fieldId": 1,
        "value": "Very Satisfied"
      }
    ]
  }
]
```

**Error Response** (403 Forbidden - not ADMIN)
```json
{
  "message": "Forbidden: insufficient role",
  "data": null
}
```

---

#### Submit Survey (Protected - OFFICER only)

Submit answers for a survey.

**Endpoint**
```
POST /survey/submit
```

**Request Headers**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Request Body**
```json
{
  "surveyId": 1,
  "answers": [
    {
      "fieldId": 1,
      "value": "Very Satisfied"
    },
    {
      "fieldId": 2,
      "value": "Great service overall!"
    }
  ]
}
```

**Response** (201 Created)
```json
{
  "id": 1,
  "surveyId": 1,
  "officerId": 2,
  "updatedAt": "2026-02-01T11:05:00.000Z",
  "createdAt": "2026-02-01T11:05:00.000Z"
}
```

**Error Response** (400 Bad Request - empty answers)
```json
{
  "message": "Answers are required",
  "data": null
}
```

**Error Response** (403 Forbidden - not OFFICER)
```json
{
  "message": "Forbidden: insufficient role",
  "data": null
}
```

---

## Error Handling

The API uses custom exception classes for consistent error responses:

| Exception | HTTP Status | Description |
|-----------|-------------|-------------|
| `BadRequestException` | 400 | Invalid request data |
| `UnauthorizedException` | 401 | Missing or invalid authentication |
| `ForbiddenException` | 403 | Insufficient permissions/role |
| `NotFoundException` | 404 | Resource not found |

**Error Response Format**
```json
{
  "message": "Error description",
  "data": null
}
```

---

## Database Sync

### Development Mode

When `APP_ENV=development`, Sequelize automatically:
- Creates all tables on startup
- Alters tables to match model definitions
- Logs sync status to console

### Production Mode

When `APP_ENV=production`:
- Skips automatic sync
- Use proper database migrations (future enhancement)
- Manually manage schema changes

**To enable/disable sync**, modify `.env`:

```env
# Enable auto-sync (development)
APP_ENV=development

# Disable auto-sync (production)
APP_ENV=production
```

---

## Testing with cURL

### 1. Signup as ADMIN

```bash
curl -X POST http://localhost:3000/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "ADMIN"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

*Save the returned `token` for the next requests.*

### 3. Create Survey (as ADMIN)

```bash
curl -X POST http://localhost:3000/v1/survey/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "title": "Customer Survey",
    "description": "Your feedback matters",
    "fields": [
      {
        "label": "Rate us",
        "type": "RADIO",
        "required": true,
        "options": ["Excellent", "Good", "Fair"]
      }
    ]
  }'
```

### 4. List Surveys

```bash
curl -X GET http://localhost:3000/v1/survey/list \
  -H "Content-Type: application/json"
```

### 5. Submit Survey (as OFFICER)

```bash
curl -X POST http://localhost:3000/v1/survey/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <OFFICER_JWT_TOKEN>" \
  -d '{
    "surveyId": 1,
    "answers": [
      {
        "fieldId": 1,
        "value": "Excellent"
      }
    ]
  }'
```

### 6. View Submissions (as ADMIN)

```bash
curl -X GET http://localhost:3000/v1/survey/1/submissions \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

---

## License

MIT


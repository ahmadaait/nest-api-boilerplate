# NEST API BOILERPLATE

## Directory Structure

- The Main Structure <br/>
  This project follows a modular and layered architecture tailored to NestJS, inspired by **Clean Architecture** principles for separation of concerns and maintainability. The structure ensures that different parts of the application are loosely coupled, promoting scalability and ease of testing.
- Clean Architecture (`CA`)<br />
  The `CA` approach is chosen for its simplicity and clarity. This architecture emphasizes a clear separation of concerns with a one-way dependency flow, ensuring that changes in one layer do not impact others directly. The dependency flow follows this structure: <br />
  `api` > `service` > `repository`

  This architecture is implemented within the `./src` directory, organizing business logic and application flow in a way that makes it intuitive for both new and experienced developers.

## Folder Structure Overview

```
src
├── api
├── config
├── libs
├── logger
├── model
├── prisma
├── repositories
├── utils
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Folder Description

- `api`
  This folder houses the controllers for the application, which define the API endpoints and handle incoming requests. The controllers interact with the service layer to process requests and return responses.

- `config`
  This folder is dedicated to configuration files, allowing centralized management of environment-specific settings and third-party integrations.

- `libs`
  Contains reusable libraries or helper modules, which are common utilities used across multiple modules in the application.

- `logger`
  This folder manages the application’s logging mechanism, which is critical for tracking application behavior, errors, and monitoring purposes.

- `model`
  Defines TypeScript interfaces, types, and schemas representing the data structures used in the application. These models are often used for type checking and validation.

- `prisma`
  This folder is for Prisma ORM files, used for database schema definitions and migrations.

- `repositories`
  The repository pattern is implemented in this folder to handle data access logic, allowing the service layer to focus on business logic without directly interacting with the database.

- `utils`
  A collection of utility functions and constants used throughout the application. This is a centralized location for small helper functions that are not specific to any module.

## Root Files

- `app.controller.ts`
  The main application controller, which handles general or root-level routes, possibly including health checks or global routes.

- `app.service.ts`
  The main service, which may contain application-wide logic or act as a shared service for other modules.

- `app.module.ts`
  The root module of the NestJS application. It imports other feature modules and configures dependency injection across the application.

- `main.ts`
  The entry point of the application. This file bootstraps the NestJS application and applies global configurations such as middleware, filters, and guards.

## Project Structure Summary

The project structure is designed to:

1. Encapsulate functionality in modular feature modules (e.g., `api`, `repositories`).
2. Separate business logic from data access logic, adhering to the Repository Pattern.
3. Promote scalability by organizing shared utilities, configuration, and libraries.
4. Follow Clean Architecture principles, with a unidirectional dependency flow: `api > service > repository`.

This architecture provides a clear and maintainable foundation, especially as the project grows and new features are added.

## Installation & Run Application

### Installation

```bash
$ yarn install
```

### Migration

```bash
$ npx prisma migrate dev
```

### Run Application

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Stacks

- NodeJS - <span style="white-space:nowrap;">(https://nodejs.org)</span>
- NestJS - <span style="white-space:nowrap;">(https://nestjs.com)</span>
- MariaDB - <span style="white-space:nowrap;">(https://mariadb.org)</span>, or MySQL - <span style="white-space:nowrap;">(https://www.mysql.com)</span>

## Libraries

- Prisma - Database ORM. To do data processing related to databse. Should be only used by `repository`<br />
  <span style="white-space:nowrap;">https://www.prisma.io</span>
- JSON Web Token - Used for secure user authentication and authorization <br/>
  <span style="white-space:nowrap;">https://jwt.io</span>

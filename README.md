# Basic CRUD with Next.js, TypeScript, Supabase, and TailwindCSS

This project is an example of a basic CRUD (Create, Read, Update, Delete) application using the following technologies:

- **Next.js**: A React framework for building modern web applications.
- **TypeScript**: Adds static typing to JavaScript, improving code quality and maintainability.
- **Supabase**: Backend as a Service (BaaS) that provides a database, authentication, and other functionalities.
- **TailwindCSS**: A utility-first CSS framework for rapid and responsive styling.

## Features

- **Create user:**: Adds a new user to the database.
- **List users**: Displays all registered users in a table.
- **Edit user**: Allows editing the information of an existing user.
- **Delete user**: Removes a user from the database.
- **Form validation**: Validates fields before submitting data.
- **Responsive interface**: Design moderno e responsivo com TailwindCSS.

## Prerequisites

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- An account on [Supabase](https://supabase.com/) (free)

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/BalanFC/supabase-crud.git
cd subapase-crud
```

### 2. Install dependencies

```bash
npm install
# ou
yarn install
```

### 3. Configure Supabase

```bash
1. Create a new project in Supabase.
2. In the Supabase dashboard, go to SQL Editor and run the following command to create table "users":

SQL:

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INTEGER,
    dt_birth DATE,
    balance INTEGER
);

3. Go to settings > API and copy the credentials:

- URL (Supabase Endpoint)
- Public Key (anon key)

4. Configure environment variables

Create a .env.local file in the project root and add the Supabase credentials:

NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLISHED_KEY

5. Run the project

npm run dev
# ou
yarn dev


The project will be available at: http://localhost:3000.
```

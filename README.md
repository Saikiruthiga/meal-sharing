# Project

Meal-Sharing

# Project description

On the Meal-Sharing website, users can:

- View all available meals and check the description, reviews, and available spots fetched from the backend.
- Search for a meal and sort meals based on price and maximum reservations in ascending or descending order.
- Reserve a seat for a meal and submit reviews.
- Send messages via the contact page and subscribe by providing their email.

# Technology used

React.js - Frontend library for building user interfaces
Next.js - Framework for server side rendering
Node.js - Javascript runtime environment for backend
Express.js - Web framework for building the api
MySQL - Relational database for storing data
MUI - React component library for UI elements
Docker - Used for containerizing the database

# installation

clone the repository: git clone https://github.com/Saikiruthiga/meal-sharing.git

Install dependencies: npm install

set up the database in mysql using docker:
docker run --name mysql -e MYSQL_ROOT_PASSWORD=your-root-password -e MYSQL_DATABASE=your-database-name -d -p 3306:3306 mysql:latest

set the environment variables:
DB_CLIENT=mysql2
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-root-password
DB_DATABASE_NAME=your-database-name

open two terminals:
for frontend - cd app , then npm run dev
for backend - cd api , then npm run dev

# output

check the browser for the output: http://localhost:3000

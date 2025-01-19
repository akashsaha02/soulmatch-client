# SoulMatch Matrimony Platform

SoulMatch is an advanced matrimony platform built using the MERN (MongoDB, Express, React, Node.js) stack. This online platform enables users to connect with potential life partners through an intuitive, secure, and user-friendly interface.

## Client-Side (Frontend)

### Summary
The client side of SoulMatch focuses on delivering a responsive and engaging user experience. Features include a homepage with premium biodatas, biodata filtering, private biodata details, and success stories. Key functionalities such as user authentication, dynamic form handling, and toast notifications have been implemented for seamless interaction.

### Key Features
- Responsive design for mobile, tablet, and desktop.
- Secure authentication using Firebase and JWT.
- Premium biodata display with dynamic filtering and sorting options.
- Private routes for biodata details, ensuring user privacy.
- Notification system for CRUD operations and authentication.
- Integration of Stripe for secure payments.
- Success stories section with user reviews and images.
- Interactive dashboard for users and admins.

### Technologies Used
- **React**: Framework for building the user interface.
- **React Router DOM**: For routing and private routes.
- **React Toastify**: Toast notifications for user feedback.
- **Tailwind CSS**: For styling and responsiveness.
- **TanStack Query**: Efficient data fetching and state management.
- **Firebase**: Authentication and hosting.
- **Stripe**: Payment gateway.
- **SweetAlert2**: Stylish notifications and modals.
- **Axios**: API requests.

### Scripts
- `dev`: Starts the development server.
- `build`: Builds the production-ready client application.
- `preview`: Previews the production build.

## Server-Side (Backend)

### Summary
The server side ensures smooth API interactions, user data management, and secure transactions. It leverages MongoDB for database management and Express.js for creating RESTful APIs.

### Key Features
- User authentication with JWT tokens.
- Role-based access control for admin and users.
- Dynamic biodata creation and management.
- Secure storage of Firebase and MongoDB credentials using environment variables.
- Premium user management and Stripe payment handling.
- Efficient data filtering and sorting.
- Admin dashboard with management features and analytics.

### Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for API development.
- **MongoDB**: Database for biodata and user management.
- **Mongoose**: ODM library for MongoDB.
- **JWT**: For secure user authentication.
- **Stripe**: Payment processing.
- **Dotenv**: Secure storage of sensitive information.
- **Cors**: Enable cross-origin requests.

### Scripts
- `start`: Starts the production server.
- `dev`: Starts the development server.

## Repository Structure
- `client/`: Frontend source code.
- `server/`: Backend source code.
- `readme.md`: Documentation for the project.

## Live Website
[Visit SoulMatch](https://soulmatch-b2923.web.app/)

## Admin Credentials
- **Email**: admin@soulmatch.com
- **Password**: Admin123

## Features Overview
1. Fully responsive design.
2. Secure authentication and private routes.
3. Premium biodata filtering and sorting.
4. User dashboards for biodata and contact requests.
5. Admin dashboards for managing users and biodata.
6. Stripe integration for payments.
7. Success stories and user reviews.
8. Toast notifications for better user experience.
9. Efficient data fetching with TanStack Query.
10. Real-time updates and analytics for admins.
# SoulMatch Matrimony Platform
## Live Website
[Visit SoulMatch](https://soulmatch-b2923.web.app/)

SoulMatch is an advanced matrimony platform built using the MERN (MongoDB, Express, React, Node.js) stack. This online platform enables users to connect with potential life partners through an intuitive, secure, and user-friendly interface.

## Client-Side (Frontend)

### Summary
The client side of SoulMatch focuses on delivering a responsive and engaging user experience. Features include a homepage with premium biodatas, biodata filtering, private biodata details, and success stories. Key functionalities such as user authentication, dynamic form handling, and toast notifications have been implemented for seamless interaction.

![alt text](./src/assets/github-banner.png)

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
- **Next.js 15**: Framework with App Router.
- **TypeScript**: Type-safe development.
- **Redux Toolkit & RTK Query**: State management and API layer.
- **Shadcn Ui**: Modern UI components.
- **Tailwind CSS**: Styling and responsiveness.
- **Firebase**: Authentication.
- **Stripe**: Payment gateway.
- **SweetAlert2**: Notifications and modals.
- **Axios**: API requests.

### Scripts
- `dev`: Starts the Next.js development server.
- `build`: Builds the production-ready application.
- `start`: Starts the production server.

## Installation and Setup

### Client Setup

1. **Clone the Repository**  
   Navigate to the client directory:  
   ```
   git clone https://github.com/akashsaha02/soulmatch-client 
   cd soulmatch-client
   ```

2. **Install Dependencies**  
   Run:  
   ```
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env.local` file and add:
   ```
   NEXT_PUBLIC_API_BASE_URL=<your-backend-api-url>
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
   ```

4. **Run the Development Server**  
   Start the development server with:  
   ```
   npm run dev
   ```

### Server Setup

1. **Clone the Repository**  
   Navigate to the server directory:  
   ```
   git clone https://github.com/akashsaha02/soulmatch-server
   cd soulmatch-server
   ```

2. **Install Dependencies**  
   Run:  
   ```
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file and configure the following variables:
   - `MONGODB_URI` – MongoDB connection string  
   - `JWT_SECRET` – Secret for signing JWT tokens  
   - Optionally, set `NODE_ENV=production` for production deployment.

4. **Run the Server**  
   For development, start the server with:  
   ```
   npm start
   ```
   The server typically runs on port 3008, unless specified otherwise in your environment.

---

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
# Strata Management System

A modern web application for managing strata properties, built with Next.js, MongoDB, and PHP integration.

## Features

1. **PHP Integration**
   - Contact form handling using PHP
   - Session management for form submissions
   - Cookie tracking for user interactions

2. **Database Integration**
   - MongoDB Atlas cloud database
   - Maintenance request management
   - Data persistence across sessions

3. **Cookie Management**
   - Tracking form submissions
   - User session management
   - Last submission timestamp storage

## Technologies Used

- Next.js 14
- MongoDB Atlas
- PHP 8+
- TailwindCSS
- js-cookie

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=your_database_name
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── components/
│   ├── ContactForm.js    # PHP-integrated contact form
│   ├── MaintenanceForm.js # MongoDB-integrated maintenance form
│   └── Navbar.js         # Navigation component
├── pages/
│   ├── api/
│   │   ├── contact.php   # PHP API endpoint
│   │   └── maintenance.js # Next.js API route
│   ├── _app.js
│   ├── index.js
│   ├── contact.js
│   └── maintenance.js
└── lib/
    └── mongodb.js        # MongoDB connection utility
```

## Features Documentation

### 1. PHP Integration
The project demonstrates PHP integration through a contact form system that:
- Handles form submissions via PHP
- Stores submissions in PHP sessions
- Sets cookies for tracking submission history
- Provides a RESTful API endpoint

### 2. Database Integration
MongoDB integration is implemented for:
- Storing maintenance requests
- User data management
- Real-time data updates

### 3. Cookie Management
The application uses cookies for:
- Tracking form submissions
- Maintaining user sessions
- Storing user preferences

## Development Notes

- The PHP endpoint requires a PHP-enabled server
- MongoDB connection uses the official MongoDB driver
- Cookie management is handled using js-cookie library

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

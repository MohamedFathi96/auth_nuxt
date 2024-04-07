# Dashboard Authentication System

Welcome to the Dashboard Authentication System project! This project implements a secure authentication system for accessing a dashboard interface using Muxt 3.

## Description

The Dashboard Authentication System allows users to register for an account with email verfication feature, log in securely, reset their passwords through a reset email, and log out of their accounts. It ensures that user credentials are validated both client-side and server-side, and implements security best practices such as token storage, password hashing, and protected routes.

## Features

- **Login Page:** Provides a form for users to enter their email and password to log in.
- **Role Pased Autherization:** Provides Role based system for different priviliges right now there is only two roles Admin and User.
- **Client-Side Validation:** Validates user input on the login form, ensuring all required fields are filled and email format is correct.
- **Backend API Integration:** Connects the login form to the backend API for authentication.
- **Authentication Error Handling:** Displays appropriate error messages for invalid credentials or authentication failures.
- **Registration Page:** Allows users to register for a new account by providing their name, email, and password then verify the email.
- **Backend API Integration:** Connects the registration form to the backend API for user registration.
- **Registration Error Handling:** Displays appropriate error messages for any registration failures.
- **Password Reset Functionality:** Provides a secure process for users to reset their passwords if needed.
- **Logout Functionality:** Allows users to securely log out of their accounts, clearing their authentication token.

## Technologies Used

- **Nuxt.js:** A Vue.js framework for building modern web applications.
- **Node.js:** A JavaScript runtime environment for executing server-side code.
- **MySQL:** A relational database management system used for storing user data.

## Installation

1. Clone the repository:

```bash
git clone git@github.com:MohamedFathi96/auth_nuxt.git
```

2. Install dependencies:

```bash
yarn
```

3. Enable two-factor authentication (2FA) for your Gmail account:

```bash
1. Go to your Google Account settings.
2. Navigate to the "Security" section.
3. Find the "Signing in to Google" option and select "2-Step Verification".
4. Follow the prompts to set up 2FA for your account.
```

4. Create an application-specific password for sending emails:

```bash
1. Go to your Google Account settings.
2. Navigate to the "Security" section.
3. Under the "Signing in to Google" option, find "App passwords" or "Generate app passwords".
4. Generate a new app password for your application.
5. Make note of the generated password as it will be used in your application.
```

5. Set up environment variables

```bash
You will find a file called .env.example with all the env variables you might need
```

6. Set up your MySQL database

```bash
Create a new database and all you need is one table for users credentials you can create the table using this command
 "CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL DEFAULT 'USER',
  `verified` tinyint(4) DEFAULT '0',
  `verificationCode` varchar(255) DEFAULT NULL,
  `verificationCodeExpAt` datetime DEFAULT NULL,
  `resetPassword` varchar(255) DEFAULT NULL,
  `resetPasswordExpAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=97362827 DEFAULT CHARSET=latin1;"
```

7. Run the application:

```bash
yarn dev
```

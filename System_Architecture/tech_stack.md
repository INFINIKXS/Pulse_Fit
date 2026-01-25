# Pulse_Fit Technology Stack

## Frontend (Mobile Application)

**Core Framework**

- **Expo SDK 54**: The primary framework, simplifying the React Native development workflow.
- **React Native 0.81**: The underlying mobile development framework.
- **TypeScript 5.9**: Strongly typed JavaScript for robust application logic.

**Navigation & UI**

- **React Navigation 7**: Handles screen transitions and navigation history (Stack & Bottom Tabs).
- **React Native Reanimated 4**: Provides high-performance, native-thread driven animations (60fps).
- **React Native Gesture Handler**: Native-driven gesture management for smooth interactions.

**Data & Networking**

- **Axios**: Promise-based HTTP client for API requests.
- **Expo Secure Store**: Encrypted storage for sensitive data (like auth tokens) on the device.

---

## Backend (API Service)

**Core Runtime**

- **Node.js**: JavaScript runtime environment.
- **Express 5.1**: Fast, unopinionated web framework for the API.

**Database & Auth**

- **PostgreSQL**: Relational database (hosted via Supabase).
- **Supabase**: Backend-as-a-Service providing Database, Auth, and Storage.
- **Passport.js & JWT**: Handles authentication strategies and token verification.
- **BcryptJS**: Secure password hashing.

**Security**

- **Helmet**: Secures Express apps by setting various HTTP headers.
- **Express Rate Limit**: Basic rate-limiting middleware to prevent brute-force attacks.
- **Express Validator**: Middleware for server-side input validation.

---

## Architecture Note: The "Native Bridge"

Why do build logs show C++?
React Native works by "bridging" your JavaScript code to the device's native capabilities.

- **JavaScript Code**: The business logic and UI definitions you write.
- **Native Code (Java/Kotlin/C++)**: The platform-specific code that actually renders views and talks to hardware.
- **The Bridge**: When you build the app (especially the first time), the system compiles the C++ "engines" (like Hermes and Reanimated) that facilitate this high-performance communication. This is why you see `CMake` and C++ compilation steps in your terminal.

# Fitness Tracker - MERN Stack Application

A comprehensive fitness tracking application built with the MERN stack (MongoDB, Express, React, Node.js) and Material UI. This project is designed for learning web development step by step.

## 🎯 Project Overview

This application allows users to:
- Log and track workouts
- Monitor exercise progress with charts
- Share workouts with a social community
- Follow other users and view their activities
- Use the app offline with PWA capabilities
- Receive real-time updates and notifications

## 🛠️ Technology Stack

### Backend:
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Socket.IO** - Real-time communication
- **Workbox** - PWA service worker

### Frontend:
- **React** - UI library
- **Redux Toolkit** - State management
- **Material UI** - Component library
- **Chart.js/Recharts** - Data visualization
- **Socket.IO Client** - Real-time updates

## 📋 Implementation Plan

This project is built in **11 comprehensive steps**:

1. ✅ **Initial Setup** - Project scaffolding and foundational setup
2. ✅ **Core Backend** - Database design and workout API endpoints
3. ✅ **Authentication** - User authentication and authorization
4. ✅ **Core Frontend** - Dashboard and workout logging
5. ✅ **Charts & Progress** - Data visualization and progress tracking
6. ✅ **Social Backend** - Social features backend implementation
7. ✅ **Social Frontend** - Social features frontend implementation
8. ✅ **PWA Basics** - Progressive Web App core features
9. ✅ **Offline Sync** - Advanced offline functionality
10. ✅ **Real-time & Notifications** - Real-time updates and push notifications
11. ✅ **Testing & Deployment** - Testing and deployment to production

See `IMPLEMENTATION_PLAN.md` for detailed breakdown of each step.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness-tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run dev  # or npm start (Vite dev server)
   ```

### Environment Variables

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-tracker
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```
Note: Vite uses `VITE_` prefix for environment variables

## 📁 Project Structure

```
fitness-tracker/
├── backend/          # Express.js backend
├── frontend/         # React frontend
├── postman/          # Postman API test collection
├── IMPLEMENTATION_PLAN.md
├── CONTEXT_SUMMARY_TEMPLATE.md
└── README.md
```

## 🧪 Testing

### Postman Collection
Import `postman/Fitness_Tracker_API.postman_collection.json` into Postman to test all API endpoints.

### Running Tests
```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

## 📚 Learning Resources

This project is designed for educational purposes. Each step includes:
- Detailed explanations
- Code comments
- Best practices
- Common pitfalls to avoid

## 🤝 Contributing

This is a learning project. Feel free to:
- Experiment with different implementations
- Add new features
- Improve existing code
- Share your learnings

## 📝 License

This project is for educational purposes.

## 🎓 Learning Path

Follow the steps in order:
1. Start with Step 1 and complete each step fully
2. Test your implementation before moving to the next step
3. Review the code and understand each part
4. Experiment and make it your own!

---

**Happy Coding! 🚀**

# Movie For You : frontend

A React-based frontend application for browsing popular movies, managing favorites, and writing reviews.

## 🎬 Overview

This frontend application is part of a full-stack project that allows users to:
- Browse popular movies
- Create and manage user accounts
- Mark movies as favorites
<!-- - Write and read movie reviews
- View different content based on user/admin roles -->

## 🚀 Technologies

- **React** - UI library
- **React Router** - Client-side routing
- **Fetch** - API communication
- **Jest & React Testing Library** - Testing framework
- **CSS Modules** - Styling solution

## 📋 Prerequisites

- Node.js (>= 14.x)
- Yarn (>= 1.x)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Bhanu-teja-perumandla/movies-for-you-frontend.git
   cd movies-for-you-frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env` file in the project root and add:
   ```
   REACT_APP_API_URL=http://localhost:8080
   ```

## 🏃‍♂️ Running the Application

Start the development server:
```bash
yarn start
```

The application will be available at `http://localhost:3000`.

## 🧪 Testing

Run tests with:
```bash
yarn test
```

For coverage report:
```bash
yarn test --coverage
```

## 🔨 Build

Create a production build:
```bash
yarn build
```

<!-- ## 🔄 Project Structure

```
src/
├── assets/          # Images, icons, and other static files
├── components/      # Reusable UI components
│   ├── Auth/        # Authentication related components
│   ├── Movies/      # Movie related components
│   ├── Reviews/     # Review related components
│   ├── UI/          # Common UI elements
│   └── ...
├── contexts/        # React context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── redux/           # Redux store, actions, reducers
├── services/        # API services
├── utils/           # Utility functions
├── App.js           # Main App component
└── index.js         # Entry point
``` -->

## 🌐 API Integration

The frontend communicates with the backend API for:
- User authentication (login/register)
- Fetching movie data
- Managing favorites

## 🔜 Upcoming Features

- Creating and retrieving reviews
- User/Admin specific operations 
- Enhanced user profiles
- Dark/light theme toggle

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
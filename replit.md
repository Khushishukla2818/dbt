# DBT Awareness Hub

## Overview

The DBT Awareness Hub is a full-stack web application designed to educate users about Direct Benefit Transfer (DBT) systems, particularly focusing on the differences between Aadhaar-linked and DBT-enabled bank accounts. The application provides tools for checking DBT status, educational content, interactive quizzes, and analytics dashboards to help users understand and navigate the DBT ecosystem for scholarship and benefit transfers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting both light and dark modes
- **Language Support**: Built-in internationalization system supporting English and Hindi with localStorage persistence

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development Server**: Custom Vite integration for development with HMR support
- **API Design**: RESTful API with structured error handling and request logging
- **Data Validation**: Zod schemas for input validation and type safety

### Data Storage Solutions
- **ORM**: Drizzle ORM with PostgreSQL dialect configuration
- **Database**: Configured for PostgreSQL with Neon Database serverless connection
- **Development Storage**: In-memory storage implementation with sample data for development/testing
- **Schema Management**: Type-safe database schemas with automatic TypeScript type generation
- **Migration System**: Drizzle Kit for database migrations and schema management

### Key Data Models
- **Users**: Basic user authentication structure
- **Aadhaar Records**: Stores Aadhaar numbers with DBT status and personal information
- **Quiz Attempts**: Tracks educational quiz completions and scores

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Security**: Input validation using Zod schemas for all API endpoints
- **CORS**: Configured for cross-origin requests with credentials support

### Application Features
- **DBT Status Checker**: Allows users to verify if their Aadhaar number has DBT enabled
- **Educational Content**: Comprehensive awareness materials about DBT systems
- **Interactive Quiz**: Multi-language quiz system to test user understanding
- **Analytics Dashboard**: Visual charts and statistics using Chart.js
- **Chatbot Integration**: Context-aware chatbot for user assistance
- **Responsive Design**: Mobile-first design with adaptive layouts

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Neon Database serverless PostgreSQL client
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **express**: Web application framework for Node.js
- **wouter**: Lightweight routing for React applications

### UI and Styling Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating variant-based component APIs
- **lucide-react**: Icon library for React applications

### Development and Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **@vitejs/plugin-react**: React support for Vite
- **esbuild**: Fast JavaScript bundler for production builds

### Data Visualization and Charts
- **chart.js**: JavaScript charting library for analytics dashboards
- **react-chartjs-2**: React wrapper for Chart.js (likely to be added)

### Form and Validation Libraries
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Resolvers for react-hook-form
- **zod**: TypeScript-first schema declaration and validation

### Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: URL-safe unique string ID generator

### Development-Specific Dependencies
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling for Replit
- **@replit/vite-plugin-dev-banner**: Development environment indicators
# League List

## Live Demo

🌐 **Live URL**: [https://pr-1.github.io/league-list/](https://pr-1.github.io/league-list/)

---

# AI Tools and Design Decisions

## AI Tools Used

### Cursor AI Assistant
- **Purpose**: Code generation, UI Ideas, Deployment
- **How it helped**:
  - Give me deisgn ideas to build.
  - Set up Tailwind CSS v4 configuration with Vite plugin
  - Fixed GitHub Pages deployment configuration

### Benefits
- Accelerated development by generating boilerplate code
- Provided solutions for configuration issues (GitHub Pages)

## Design Decisions

### UI/UX Design

#### Styling Framework
- **Tailwind CSS**: Chosen for simplicity and easy designing. Tailwind's utility-first approach allows for rapid UI development without writing custom CSS, making it straightforward to create responsive and modern designs with minimal code.

#### Layout & Responsiveness
- **Grid System**: Responsive grid layout (1 column mobile, 2 tablet, 3 desktop) using Tailwind's grid utilities
- **Container**: Centered container with padding for optimal content width on all screen sizes

#### Component Architecture
- **Modular Components**: Separated concerns into focused, reusable components:
  - `SearchBar`: Handles text input filtering
  - `SportFilter`: Dropdown for sport type filtering
  - `LeagueCard`: Individual league display with click handler
  - `LeagueList`: Grid container with empty state handling
  - `BadgeModal`: Modal for displaying season badges

### Technical Decisions

#### State Management
- **React Hooks**: Used `useState` for local component state (search query, selected sport, modal state)
- **React Query**: Leveraged `@tanstack/react-query` for:
  - Server state management
  - Automatic caching
  - Built-in loading and error states

#### Performance Optimizations
- **Memoization**: Used `useMemo` for:
  - Extracting unique sports list (prevents recalculation on every render)
  - Filtering leagues (only recalculates when dependencies change)
- **Caching**: React Query automatically caches API responses, preventing redundant API calls

#### API Integration
- **Service Layer**: Separated API calls into service files for maintainability
- **Error Handling**: Centralized error handling in API service
- **Type Safety**: Full TypeScript implementation with interfaces for all API responses

# Hacienda - Farm Management Platform

Hacienda is a modern farm management platform built with Next.js that helps farmers monitor and manage their fields using NDVI (Normalized Difference Vegetation Index) analysis and other agricultural data.

## Features

- 🌱 NDVI Analysis: Monitor vegetation health across your fields
- 🗺️ Field Management: Create and manage field boundaries
- 📊 Data Visualization: View and analyze agricultural data
- 🔐 User Authentication: Secure access to your farm data

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Maps**: Leaflet with React-Leaflet
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Query
- **Date Handling**: date-fns
- **Geospatial**: Turf.js

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hacienda.git
cd hacienda
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=your_postgres_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable React components
├── lib/             # Utility functions and configurations
├── styles/          # Global styles and Tailwind configuration
└── types/           # TypeScript type definitions
```

## Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

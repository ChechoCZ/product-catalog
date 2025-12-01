# Product Catalog

A modern, full-stack product catalog application built with Next.js, featuring product browsing, filtering, search, and admin management capabilities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Option 1: Local Development](#option-1-local-development)
  - [Option 2: Docker Deployment](#option-2-docker-deployment)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [Components](#components)
- [State Management](#state-management)
- [Navigation Flow](#navigation-flow)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Scripts](#scripts)

## Prerequisites

Before getting started, ensure you have the following installed:

### For Local Development
- **Node.js**: Version 18.x or higher (20.x recommended)
- **npm**: Version 9.x or higher (comes with Node.js)
- **MongoDB**: A MongoDB database instance (local or cloud-based like MongoDB Atlas)
- **Git**: For version control

### For Docker Deployment
- **Docker**: Version 20.x or higher
- **Docker Compose**: Version 2.x or higher (usually included with Docker Desktop)

### Verifying Installation

**Local Development:**
```bash
node --version  # Should be v18.x.x or higher
npm --version   # Should be 9.x.x or higher
```

**Docker:**
```bash
docker --version      # Should be 20.x.x or higher
docker compose version # Should be 2.x.x or higher
```

## Tech Stack

### Frontend
- **Next.js 16.0.4** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **SCSS/SASS** - Styling with CSS modules
- **Redux Toolkit 2.11.0** - State management
- **RTK Query** - Data fetching and caching
- **Formik 2.4.9** - Form management
- **Zod 4.1.13** - Schema validation
- **Lucide React** - Icon library
- **use-debounce** - Debouncing utilities

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma 6.19** - ORM for database access
- **MongoDB** - NoSQL database
- **Zod** - Request validation

### Storage & Deployment
- **Vercel Blob** - File/image storage
- **dotenv** - Environment variable management

## Project Structure

```
next-product-catalog/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── admin/            # Admin login page
│   │   ├── api/              # API routes
│   │   │   └── products/     # Product API endpoints
│   │   ├── product/          # Product detail pages
│   │   │   └── [slug]/      # Dynamic product route
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   │   ├── add-product/     # Add product modal
│   │   ├── breadcrumbs/     # Navigation breadcrumbs
│   │   ├── filters/         # Filter components
│   │   │   ├── category/    # Category filter
│   │   │   ├── price/       # Price range filter
│   │   │   └── sort/        # Sort filter
│   │   ├── product/         # Product-related components
│   │   │   ├── list/        # Product list
│   │   │   ├── tile/        # Product card/tile
│   │   │   ├── skeleton/    # Loading skeleton
│   │   │   └── new/         # New product form
│   │   ├── providers/       # React providers (Redux)
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── badge/       # Badge component
│   │   │   ├── button/      # Button component
│   │   │   ├── division/    # Divider component
│   │   │   ├── input/       # Input component
│   │   │   ├── modal/       # Modal component
│   │   │   └── select/      # Select dropdown
│   │   └── file-upload/     # File upload component
│   ├── hooks/               # Custom React hooks
│   │   ├── is-authenticated.ts
│   │   ├── use-filters.ts
│   │   └── use-redux-actions.ts
│   ├── lib/                 # Utility libraries
│   │   └── prisma.ts        # Prisma client instance
│   ├── store/               # Redux store configuration
│   │   ├── api/             # RTK Query API definitions
│   │   │   └── product.ts   # Product API
│   │   ├── slices/          # Redux slices
│   │   │   ├── auth-slice.ts
│   │   │   ├── create-product-modal-slice.ts
│   │   │   └── filters-slice.ts
│   │   └── index.ts         # Store configuration
│   ├── styles/              # Global styles
│   │   └── globals.scss
│   ├── types/               # TypeScript type definitions
│   │   ├── category.ts
│   │   ├── filters.ts
│   │   ├── options.ts
│   │   ├── price.ts
│   │   ├── product.ts
│   │   └── index.ts
│   └── utils/               # Utility functions
│       ├── images/          # Image utilities
│       │   ├── delete-file.ts
│       │   └── upload-file.ts
│       ├── products/       # Product utilities
│       │   └── add-product.ts
│       └── index.ts
├── .dockerignore          # Docker ignore rules
├── .editorconfig           # Editor configuration
├── .gitignore             # Git ignore rules
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker image definition
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── prettier.config.mjs    # Prettier configuration
├── prisma.config.ts       # Prisma configuration
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Option 1: Local Development

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd next-product-catalog
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env  # If you have an example file
# Or create .env manually
```

Add the following environment variables:

```env
DATABASE_URL="mongodb://localhost:27017/product-catalog"
# Or for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/product-catalog"

BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

#### 4. Set Up the Database

Generate Prisma Client:

```bash
npm run prisma:generate
```

Push the schema to your database:

```bash
npm run prisma:migrate
```

#### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Option 2: Docker Deployment

#### Prerequisites for Docker

Ensure Docker and Docker Compose are installed and running on your system.

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd next-product-catalog
```

#### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="mongodb://mongodb:27017/product-catalog"

# Vercel Blob Storage (optional if using MinIO)
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Docker-specific environment variables (optional)
# Create .env.docker file for Docker-specific overrides
APP_PORT=3000
NETWORK_NAME=app-network
```

**Note:** When using Docker Compose, the `DATABASE_URL` should point to the MongoDB service name (`mongodb`) instead of `localhost`.

#### 3. Build and Run with Docker Compose

The `docker-compose.yml` file includes three services:
- **MongoDB**: Database service
- **MinIO**: Object storage service (alternative to Vercel Blob)
- **App**: Next.js application

Start all services:

```bash
docker compose up -d
```

This will:
- Build the Next.js application Docker image
- Start MongoDB container
- Start MinIO container (for file storage)
- Start the application container
- Set up networking between containers

#### 4. View Logs

To view logs from all services:

```bash
docker compose logs -f
```

To view logs from a specific service:

```bash
docker compose logs -f app      # Application logs
docker compose logs -f mongodb  # Database logs
docker compose logs -f minio    # MinIO logs
```

#### 5. Access the Application

- **Application**: [http://localhost:3000](http://localhost:3000)
- **MinIO Console**: [http://localhost:9001](http://localhost:9001)
  - Default credentials: `minioadmin` / `minioadmin123`

#### 6. Stop Services

To stop all services:

```bash
docker compose down
```

To stop and remove volumes (⚠️ this will delete database data):

```bash
docker compose down -v
```

### Running with Dockerfile Only

If you prefer to run only the application container (without Docker Compose):

#### 1. Build the Docker Image

```bash
docker build --build-arg DATABASE_URL=mongo-db-url -t next-product-catalog .
```

#### 2. Run the Container

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="your-mongodb-connection-string" \
  -e BLOB_READ_WRITE_TOKEN="your-blob-token" \
  -e NODE_ENV=production \
  next-product-catalog
```

**Note:** Ensure MongoDB is accessible from the container. If running MongoDB locally, use `host.docker.internal` instead of `localhost`:

```bash
DATABASE_URL="mongodb://host.docker.internal:27017/product-catalog"
```

### Docker Configuration Details

#### Dockerfile

The Dockerfile uses a multi-stage build process:

1. **Dependencies Stage**: Installs npm dependencies
2. **Builder Stage**: Generates Prisma Client and builds the Next.js application
3. **Runner Stage**: Creates a minimal production image with only necessary files

The Dockerfile expects:
- Next.js standalone output (configured in `next.config.ts`)
- Prisma schema in `prisma/schema.prisma`
- Environment variables for database and blob storage

#### Docker Compose Services

**MongoDB Service:**
- Image: `mongo:7.0`
- Port: `27017`
- Volume: Persistent data storage
- Health check: Ensures MongoDB is ready before app starts

**MinIO Service:**
- Image: `minio/minio:latest`
- Ports: `9000` (API), `9001` (Console)
- Volume: Persistent storage
- Health check: Ensures MinIO is ready before app starts

**App Service:**
- Builds from local Dockerfile
- Port: `3000`
- Depends on: MongoDB and MinIO health checks
- Environment: Loads from `.env` and `.env.docker` files

#### Environment Variables for Docker

| Variable | Description | Default (Docker Compose) |
|----------|-------------|--------------------------|
| `DATABASE_URL` | MongoDB connection string | `mongodb://mongodb:27017/product-catalog` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (optional if using MinIO) | - |
| `NODE_ENV` | Node environment | `production` |
| `APP_PORT` | Application port | `3000` |
| `NETWORK_NAME` | Docker network name | `app-network` |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB connection string | Yes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token for file uploads | Yes (if using file uploads) |

## Routes

### Public Routes

- **`/`** - Home page
  - Displays product catalog with filters
  - Shows "Add Product" button for authenticated users
  - Features search, category filter, price range, and sorting

- **`/product/[slug]`** - Product detail page
  - Dynamic route showing individual product details
  - Displays product image, title, price, availability, and description
  - Includes breadcrumb navigation

### Admin Routes

- **`/admin`** - Admin login page
  - Simple authentication form
  - Default credentials: `admin` / `password`
  - Stores authentication in localStorage and Redux state

### API Routes

All API routes are prefixed with `/api/products`:

- **`GET /api/products/list`** - Get all products with optional filters
- **`GET /api/products/[slug]`** - Get a single product by slug
- **`POST /api/products/create`** - Create a new product
- **`PATCH /api/products/update`** - Update an existing product
- **`DELETE /api/products/[id]`** - Delete a product by ID

## Components

### Layout Components

- **`Providers`** - Wraps the app with Redux Provider

### Page Components

- **`Home`** (`src/app/page.tsx`) - Main catalog page
- **`AdminPage`** (`src/app/admin/page.tsx`) - Admin login
- **`ProductPage`** (`src/app/product/[slug]/page.tsx`) - Product details

### Feature Components

#### Filters (`src/components/filters/`)
- **`Filters`** - Main filter container
- **`CategoryFilter`** - Multi-select category filter
- **`PriceFilter`** - Price range input (min/max)
- **`SortFilter`** - Sort by price (lowest/highest)

#### Product Components (`src/components/product/`)
- **`ProductList`** - Displays grid of products
- **`ProductTile`** - Individual product card
- **`ProductSkeleton`** - Loading skeleton for products
- **`AddProduct`** - Modal form for adding new products

#### UI Components (`src/components/ui/`)
- **`Button`** - Reusable button component
- **`Input`** - Text input with optional icon
- **`Select`** - Dropdown select component
- **`Badge`** - Status badge (e.g., "In Stock", "Out of Stock")
- **`Modal`** - Modal dialog wrapper
- **`Division`** - Visual divider component

#### Utility Components
- **`Breadcrumbs`** - Navigation breadcrumbs
- **`FileUpload`** - File upload component for images

## State Management

The application uses **Redux Toolkit** with **RTK Query** for state management.

### Redux Slices

1. **`auth-slice`** - Authentication state
   - Stores logged-in user information
   - Persists to localStorage

2. **`filters-slice`** - Product filter state
   - Manages search query, categories, price range, and sort order

3. **`create-product-modal-slice`** - Modal visibility state
   - Controls add product modal open/close

### RTK Query API

**`productApi`** (`src/store/api/product.ts`) provides:

- `useGetProductsQuery` - Fetch products with filters
- `useGetProductBySlugQuery` - Fetch single product
- `useAddProductMutation` - Create product
- `useUpdateProductMutation` - Update product
- `useDeleteProductMutation` - Delete product

All queries automatically cache and refetch when mutations occur.

## Navigation Flow

### User Journey

1. **Home Page (`/`)**
   - User lands on catalog page
   - Can browse products, apply filters, search
   - If authenticated: sees "Add Product" button

2. **Product Detail (`/product/[slug]`)**
   - Click on product tile → navigates to detail page
   - Shows full product information
   - Breadcrumb navigation back to home

3. **Admin Login (`/admin`)**
   - Navigate to `/admin` for authentication
   - Enter credentials → redirects to home
   - Authentication persists in localStorage

4. **Adding Products** (Authenticated users)
   - Click "Add Product" button on home page
   - Modal opens with product form
   - Fill form, upload image → product created
   - Product list refreshes automatically

### Authentication Flow

```
User visits /admin
  ↓
Enters credentials (admin/password)
  ↓
Credentials validated
  ↓
Redux state updated + localStorage set
  ↓
Redirect to home page
  ↓
"Add Product" button appears
```

## API Endpoints

### GET `/api/products/list`

Get products with optional filters.

**Query Parameters:**
- `category` - Comma-separated category names
- `search` - Search term for product title
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sortBy` - Sort order (`lowestPrice` or `highestPrice`)

**Example:**
```
GET /api/products/list?category=electronics,clothing&minPrice=10&maxPrice=100&sortBy=lowestPrice
```

**Response:**
```json
[
  {
    "id": "...",
    "title": "Product Name",
    "description": "Product description",
    "image": "https://...",
    "category": "electronics",
    "price": 99.99,
    "slug": "product-name",
    "availability": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET `/api/products/[slug]`

Get a single product by slug.

**Response:**
```json
{
  "id": "...",
  "title": "Product Name",
  "description": "Product description",
  "image": "https://...",
  "category": "electronics",
  "price": 99.99,
  "slug": "product-name",
  "availability": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### POST `/api/products/create`

Create a new product.

**Request Body:**
```json
{
  "title": "Product Name",
  "description": "Product description",
  "image": "https://...",
  "category": "electronics",
  "price": 99.99,
  "slug": "product-name",
  "availability": true
}
```

**Response:** Created product object

### PATCH `/api/products/update`

Update an existing product.

**Request Body:** Same as create, must include `id`

### DELETE `/api/products/[id]`

Delete a product by ID.

**Response:** 200 OK

## Database Schema

The application uses MongoDB with Prisma ORM. The schema is defined in `prisma/schema.prisma`:

```prisma
model products {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  title         String
  description   String
  image         String
  category      String
  price         Float
  availability  Boolean  @default(true)
  slug          String   @unique
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Push schema changes to database |

## Additional Notes

### Image Storage

The application uses Vercel Blob for image storage. Images are uploaded via the `FileUpload` component and stored in Vercel Blob storage. The image URLs are then saved in the database.

### Authentication

Currently, authentication is handled client-side with a simple username/password check. For production, consider implementing:
- Server-side session management
- JWT tokens
- OAuth integration
- Password hashing

### Styling

The application uses SCSS modules for component-scoped styling. Global styles are defined in `src/styles/globals.scss`.

### Type Safety

The project is fully typed with TypeScript. Type definitions are located in `src/types/`.

## Troubleshooting

### Local Development Issues

#### Database Connection Issues

- Verify `DATABASE_URL` is correct in `.env`
- Ensure MongoDB is running (if using local instance)
- Check network connectivity (if using MongoDB Atlas)

#### Prisma Client Not Found

Run `npm run prisma:generate` to regenerate the Prisma Client.

#### Image Upload Issues

- Verify `BLOB_READ_WRITE_TOKEN` is set correctly
- Check Vercel Blob storage quota and permissions

### Docker Issues

#### Container Won't Start

1. Check if ports are already in use:
   ```bash
   # Check port 3000
   lsof -i :3000
   # Check port 27017
   lsof -i :27017
   ```

2. Verify environment variables:
   ```bash
   docker compose config
   ```

3. Check container logs:
   ```bash
   docker compose logs app
   ```

#### Database Connection Issues in Docker

- Ensure MongoDB container is healthy: `docker compose ps`
- Verify `DATABASE_URL` uses service name `mongodb` (not `localhost`)
- Check network connectivity: `docker network inspect app-network`

#### Prisma Client Generation Issues in Docker

The Dockerfile automatically generates Prisma Client during build. If you encounter issues:

1. Ensure `prisma/schema.prisma` is present
2. Check build logs: `docker compose logs app`
3. Rebuild the image: `docker compose build --no-cache app`

#### MinIO Configuration

If using MinIO instead of Vercel Blob:

1. Access MinIO console at `http://localhost:9001`
2. Create a bucket for product images
3. Configure your application to use MinIO API endpoint: `http://minio:9000`
4. Update environment variables accordingly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Submit a pull request

## License

[Add your license here]

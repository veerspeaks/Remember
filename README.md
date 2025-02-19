# Flashcard App

A modern flashcard application built with Next.js, Prisma, Tailwind CSS.

## Features

- Create, edit, and search flashcards by category.
- Swipe-based navigation for flashcards with smooth animations.
- API endpoints built with Next.js API routes.
- Database integration using Prisma and PostgreSQL.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A PostgreSQL database (configured for Prisma)
- (Optional) A Vercel account for deployment

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:**

   Create a `.env.local` file in the root of your project with the following variables:

   
   # Base URL for API endpoints
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   # Prisma and database configuration
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

4. **Prisma Setup:**

   The project uses Prisma for database access. Make sure to generate the Prisma client by running:

   ```bash
   npx prisma generate
   ```

   The `package.json` includes a `postinstall` hook and the build script runs `prisma generate` automatically:

   ```json
   "scripts": {
     "dev": "next dev",
     "build": "prisma generate && next build",
     "start": "next start",
     "lint": "next lint",
     "postinstall": "prisma generate"
   }
   ```

## Running the App

- **Development:**

  Run the development server with:

  ```bash
  npm run dev
  ```

  The app will be available at [http://localhost:3000](http://localhost:3000).

- **Production Build:**

  Build the project with:

  ```bash
  npm run build
  npm run start
  ```

## Deployment

For deploying on Vercel:

- Push your code to GitHub.
- Import your repository into Vercel.
- Add all necessary environment variables in the Vercel Dashboard.
- Vercel will run the build script (`prisma generate && next build`), ensuring Prisma client is up-to-date even with cached dependencies.

## API Endpoints

The following API endpoints are available:

- **/api/categories**  
  Handles GET (to retrieve categories) and POST (to create a new category).

- **/api/flashcards**  
  Supports GET (for fetching flashcards by category) and POST (for creating a flashcard).

- **/api/singlecard**  
  Provides GET (to retrieve a single card) and POST (to update a card).

- **/api/searchcards**  
  Allows searching for flashcards by question or answer.

All endpoints include proper error handling and return JSON responses.

## Components and Functionality

- **Flashcard Component:**  
  Displays individual flashcards with smooth flipping animation. (Note: The code for this component has been maintained as-is.)

- **FlashcardSwiper Component:**  
  Enables swipe gestures (touch, mouse, and wheel) for navigating through flashcards.

- **EditCard and NewOrEditCard Components:**  
  Provide interfaces for editing and creating flashcards.

- **Category Components:**  
  Includes CategoryCard and CategoryList for displaying and managing flashcard categories.

- **Firebase Authentication:**  
  Integrated for secure user login and signup, with context providers for handling auth state.

## Troubleshooting

- **Deployment Issues on Vercel:**  
  If you encounter build errors (for example, around API routes), ensure that:
  
  - All environment variables have been correctly set.
  - Prisma's client is generated during the build (the postinstall hook and build script should handle this).

- **Smooth Scrolling on Flashcards:**  
  If scrolling appears stuttered:
  
  - Verify that your CSS overflow and animation classes (e.g., `overflow-y-auto`, `transition-all`, and `will-change` hints if necessary) are applied consistently.
  - Test on multiple devices to ensure performance optimizations are effective across touch and non-touch interfaces.

## Contributing

Contributions are welcome! Please open an issue or create a pull request to suggest improvements or fixes.

## License

This project is licensed under the MIT License.
#   R e m e b e r 
 
 
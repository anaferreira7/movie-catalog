# Movie Catalog Web Application

## Overview

The Movie Catalog Web Application allows users to search, browse, and filter movies from The Movie Database (TMDb) API. This web app is built using Vue.js, Vuex for state management, Vue Router for navigation, and Tailwind CSS for styling. The app provides an interactive and responsive movie catalog with real-time search functionality, movie details, pagination, and persistent user favorites.

## Features

- **Movie Fetching & Filtering**: Fetch movies from the TMDb API and filter by genre, release year and rating.
- **Pagination**: Display movies with pagination, defaulting to 20 movies per page.
- **Search and Filter**: Real-time search functionality to dynamically filter movies by title. Filters to fetch movies by genre, release year and rating.
- **Favorite Movies**: Users can save their favorite movies and this data is persisted across sessions using Vuex.
- **Routing & Lazy Loading**: Dynamic routing for movie detail pages with lazy-loaded routes for better performance.
- **Responsive Design**: Fully responsive design for mobile, tablet, and desktop devices using Tailwind CSS.
- **Movie Details**: Displays detailed information about a selected movie including title, poster, description, release date and related movies.
  
## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 22 or above)
- [npm](https://www.npmjs.com/)
- [Vue CLI](https://cli.vuejs.org/) (if you haven't installed it already)

### 1. Clone the repository

Clone the project to your local machine:

```bash
git clone https://github.com/your-username/movie-catalog.git
cd movie-catalog
```

### 2. Install dependencies

Install the project dependencies using npm or yarn:

#### Using npm:

```bash
npm install
```

#### Using yarn:

```bash
yarn
```

### 3. Configure environment variables

Create a .env file in the root of the project and add the following environment variables:

```bash
VUE_APP_API_URL=https://api.themoviedb.org/3
VUE_APP_API_KEY={Your TMDb API Key}
VUE_APP_API_ACCESS_TOKEN={Your TMDb Access Token}
VUE_APP_API_SESSION_ID={Your TMDb Session ID}
VUE_APP_IMAGES_PATH=https://image.tmdb.org/t/p/w500
```

Replace `{Your TMDb API Key}`, `{Your TMDb Access Token}` and `{Your TMDb Session ID}` with your actual credentials from TMDb. You can sign up and get these credentials on their website: [TMDb](https://www.themoviedb.org/).

### 4. Run the application locally

To start the development server:

#### Using npm:

```bash
npm run serve
```

#### Using yarn:

```bash
yarn serve
```

After starting the server, open your browser and visit http://localhost:8080 to see the application in action. If port 8080 is already in use, visit the link shown in the terminal.

ENJOY!

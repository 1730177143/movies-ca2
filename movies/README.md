# Assignment 1 - ReactJS Movie App

Name: Long Liu

## Overview

This repository contains a ReactJS-based web application designed to provide a comprehensive and interactive experience for movie enthusiasts. The app interfaces with various movie-related APIs to present a rich set of information including movie details, actor profiles, and various movie lists.

## Features

+ **Playlist Page**: Users can create and manage a personalized movie playlist.
+ **Top-rated Page**: Displays a list of top-rated movies based on user ratings.
+ **Expanded Site Header**: Enhanced navigation options for improved user experience.
+ **Trending Page**: Showcases movies that are currently trending.
+ **Recommendations Page**: Suggests movies based on user preferences or movie history.
+ **Popular Movies Page**: Lists movies that are popular among users.
+ **Similar Movies Page**: Displays movies similar to a selected one.
+ **Actor Home Page**: A dedicated page for browsing popular actors.
+ **Actor Details Page**: Provides detailed information about specific actors.
+ **Movie Credits Page**: Shows the credits for a particular movie.
+ **Credits Page**: Displays actors and their roles in a specific movie.
+ **Actor Filter Function**: Allows users to filter actors based on various criteria.
+ **Follow Actor Function**: Users can follow their favorite actors.
+ **Pagination**: Implements pagination for movie and actor lists.
+ **Login via Email and Password**: Standard authentication method.
+ **Login via Google**: OAuth-based Google login integration.
+ **Register**: New users can register an account.
+ **Code Splitting**: Improves page load efficiency by splitting code into chunks.
+ **Auto-deployment**: Automated deployment process for efficient application updates.

## Setup Requirements

To set up the project locally, run the following command:

```
npm install
```

This will install all the necessary dependencies for the project.

## API Endpoints

The application uses several API endpoints for fetching movie and actor data:

+ **Discover List of Movies**: `discover/movie`
+ **Movie Details**: `movie/:id`
+ **Movie Genres**: `/genre/movie/list`
+ **Top-rated Movies**: `movie/top_rated`
+ **Trending Movies**: `trending/movie/day`
+ **Recommendations Movies**: `movie/:id/recommendations`
+ **Similar Movies**: `movie/:id/similar`
+ **Popular Actors**: `person/popular`
+ **Actor Details**: `person/:id`
+ **Actor Images**: `person/:id/images`
+ **Movie Credits**: `person/:id/movie_credits`
+ **Credits**: `movie/:id/credits`

## Routing

The app includes various routes for different pages and functionalities:

+ `/actors/follows`: Displays actors followed by the user.
+ `/movies/upcoming`: Shows upcoming movie releases.
+ `/movies/playlist`: Displays user's movie playlist.
+ `/movies/topRated`: Lists top-rated movies.
+ `/movies/popular`: Shows popular movies.
+ `/movies/trending`: Displays currently trending movies.
+ `/recommendations/:id`: Shows movie recommendations.
+ `/similar/:id`: Lists movies similar to a particular one.
+ `/actors`: Shows popular actors.
+ `/actors/:id`: Displays detailed information about an actor.
+ `/movieCredits/:id`: Shows movies related to a specific actor.
+ `/credits/:id`: Displays movie credits.

## Independent Learning

+ **Code Splitting**: Implemented code splitting for enhanced webpage efficiency, referenced from [Create React App Documentation on Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting).
+ **Online Deployment**: Deployed the application on GitHub Pages, accessible at [Movies App](https://1730177143.github.io/movies). Referenced from [Create React App Documentation on Deployment](https://create-react-app.dev/docs/deployment/).
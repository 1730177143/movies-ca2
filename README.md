# Assignment 2 - Web API.

Name: long liu

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or
modifications to existing features)

+ login
+ google login
+ sign up
+ add to playlist
+ remove from playlist
+ get playlist
+ add to favorites
+ remove from favorites
+ get favorites
+ add to follows
+ remove from follows
+ get follows
+ get user
+ add reviews
+ get reviews
+ get reviews by movieId
+ get movie by id
+ get movies
+ get genres
+ get movie img
+ get upcoming movies
+ get popular movies
+ get top-rated movies
+ get trending movies
+ get recommendation movies
+ get similar movies
+ get Actors
+ get actor
+ get actor img
+ get credits
+ get movie credits

## Setup requirements.

Install node.js
in the movies folder, Open the terminal and run`npm install`

in the movies app folder, Open the terminal and run `npm install`

This will install all the necessary dependencies for the project.

## API Configuration

creating an `.env `file and what variables to put in it.
______________________
example:

```
NODEENV=development

PORT=8080

HOST=localhost

mongoDB=YourMongoURL 

REACT_APP_TMDB_KEY=Your REACT_APP_TMDB_KEY

secret=YourJWTSecret
```

______________________

## API Design



Run the backend and open the link http://localhost:8080/api-docs, check the API documentation.

Open the link:https://app.swaggerhub.com/apis/20104729/movies-ca_2/1.0 to see API documentation on swagger hub.

Alternatively, open the `movies-ca2.postman_collection.yaml` file in the IDE.


## Security and Authentication

These routes are protected.

Login is required to access these routes.

``` js
<Route element={<ProtectedRoutes/>}>
    <Route path="/movies/favorites" element={<FavoriteMoviesPage/>}/>
    <Route path="/actors/follows" element={<FollowsPage/>}/>
    <Route path="/movies/playlist" element={<PlaylistPage/>}/>
    <Route path="/reviews/form" element={<AddMovieReviewPage/>}/>
</Route>
```

## Integrating with React App

All functions that used to access TMDB on the front-end are no longer directly accessible to TMDB. Instead, it requests from the backend, which accesses TMDB and returns the result to the frontend.

The front-end has added a comment display page to display the added comments. Modified the login and registration pages to save user data to the backend.

## Independent learning (if relevant)

Local swagger UI deployment
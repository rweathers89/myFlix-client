# myFlix-client app

## Description
The client-side for an app called MyMovieMix, built using React based on its existing server-side code (REST API and database). myFlix is a single-page application that allows users to create an account and login to view a list of Ghibli movies, navigate between movie details/profile/account views, and create a favorites list.

## Key Features
* Search for movies via search bar
* Select movie for more details, which include:
  * Summary
  * Director name
  * Release year
  * Genre
  * Similar movies
    
* Add/remove movie from favorites
* Users can update their info & delete their account

## Dependencies
* Bootstrap, React-Bootstrap
* Prop-types
* React, React-DOM
* React-Datepicker, React-Icons
* React-Router, React-Router-DOM


## Steps
1. install parcel npm install -g parcel
Parcel Path in terminal: parcel ["src/index.html"]
2. Install React and React Dom npm install --save react react-dom
3. Run application parcel src/index.html
4. Create components main-view, movie-view & movie-card
5. Add hooks useState, useEffect
6. Create components login-view, signup-view
7. Install bootstrap and react-bootstrap npm install react-bootstrap bootstrap
8. Install react-router and react-router-dom npm install react-router react-router-dom --save
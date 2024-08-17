# Movie Review App

Welcome to the **Movie Review Application**! This project is a React-based frontend interface that allows users to view movies, read and submit reviews, and interact with an engaging star rating system.

This web-app was inspired by https://github.com/IsAmitprajapati/movieoapp
and modifications have been made as per requirements

## Live Demo

Check out the live demo of the app here: [Movie Review App](https://movieioapp.web.app/)

## Features

- **Movie List**: Browse through a list of trending movies fetched from [The Movie Database (TMDb) API](https://www.themoviedb.org/).
- **Movie Details**: Click on a movie to view detailed information, including release date, rating, and an overview.
- **Star Rating**: Rate movies using an interactive star rating component.
- **Review Submission**: Add reviews with text and a star rating. The review form includes validation to ensure that both fields are filled.
- **Edit/Delete Reviews**: Users can edit or delete their own reviews.
- **React Router**: Seamless navigation between different pages of the application.

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For navigating between pages.
- **TMDb API**: For fetching movie data and reviews.
- **Firebase**: For deploying the application and hosting the live demo.
- **React Hooks**: For managing state and side effects.
- **CSS**: For styling the application and ensuring a responsive design.

## Installation & Setup

To get started with the project:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/movie-review-app.git

2. **Navigate into the project directory:**
   ```bash
   cd movie-review-app

3. **Install the necessary dependencies:**
   ```bash
   npm install

4. **Add your TMDb API key:**
   Create a .env file in the root of the project and add the following line:
   ```bash
   REACT_APP_TMDB_API_KEY=your_api_key_here

5. **Run the application:**
   ```bash
   npm start

## Challenges Faced

Integrating the **TMDb API** presented challenges, particularly in managing and displaying data efficiently. Implementing the **star rating component** and ensuring form validation required attention to detail to provide a smooth user experience.

## Deployment

The project is deployed using **Firebase Hosting**. You can view the live application [here](https://movieioapp.web.app/).

## Future Improvements

- **User Authentication**: Add user login functionality to manage reviews better.
- **Pagination**: Implement pagination for movie lists to improve performance.
- **Enhanced Edit/Delete**: Refine review editing and deletion processes with user authentication.
- **CI/CD**: Setting up a CI/CD pipeline for continuous integration and deployment

## Testing

The application has been manually tested for various user interactions, including review submission, editing, and deletion, to ensure all features work as intended and the user experience is seamless.



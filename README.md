Movie Review App
This is a responsive Movie Review Application built using React that allows users to view a list of movies, read reviews, and submit their own ratings and reviews. The app also includes the functionality for users to edit or delete their reviews.

Live Demo

Features
Movie List: View a list of trending movies with details fetched from The Movie Database (TMDb) API.
Movie Details: Click on any movie to view detailed information such as the release date, rating, and overview.
Star Rating System: Users can rate movies using an interactive star rating component.
Review Form: Submit reviews along with a star rating. The form includes validation to ensure all fields are filled before submission.
Edit/Delete Reviews: Users can edit or delete their own reviews.
React Router: Navigation between the movie list and individual movie details pages.
Technologies Used
React: Component-based UI library.
React Router: For navigation between views.
TMDb API: To fetch movie details and reviews.
Firebase: For deploying the project and hosting the live demo.
React Hooks: For state management within components.
CSS: Styled components to create a clean and intuitive interface.
Installation & Setup
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/movie-review-app.git
Install the dependencies:
bash
Copy code
npm install
Get your API key from TMDb and add it to your .env file:
makefile
Copy code
REACT_APP_TMDB_API_KEY=your_api_key_here
Run the app:
bash
Copy code
npm start
Challenges Faced
One of the key challenges was integrating the TMDb API effectively to fetch movie data and reviews. Managing the API response and ensuring smooth navigation between movie details pages while maintaining performance was a priority.

Additionally, implementing the star rating system and ensuring validation for the review submission form required careful handling of state management, especially to provide users with a smooth and intuitive experience.

Deployment
The app is deployed using Firebase Hosting and is live at: Movie Review App

Future Improvements
Implementing user authentication so users can log in before submitting reviews.
Adding pagination to the movie list to enhance performance for larger datasets.
Improving the edit/delete functionality by linking it to user accounts once authentication is in place.
Testing
I performed manual testing by simulating different user actions such as submitting, editing, and deleting reviews, ensuring that the app responds correctly and validation works as expected.
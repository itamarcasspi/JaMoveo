# JaMoveo - Moveo Band Web Application

## Project Description

JaMoveo is a web application designed to enhance the musical rehearsal experience for the Moveo band. It allows band members to log in, specify their instruments, and participate in rehearsal sessions controlled by an admin. The admin can search for songs, display chords and lyrics, and manage the flow of the rehearsal.

## Features

* **Registration & Authentication:**
  * Signup page for users to create accounts (username, password, instrument).
  * Login page for user and admin authentication.
* **Admin Control:**
  * Admin-specific registration.
  * Song search functionality (English and Hebrew).
  * Song selection from search results.
  * "Quit" button to end the rehearsal session for all users.
* **Live Rehearsal Display:**
  * Song title and artist display.
  * Lyrics-only view for singers.
  * Lyrics and chords view for instrumentalists.
  * Automatic custom scrolling.
  * High contrast and large font for readability.
* **Socket.IO Integration:**
  * Real-time communication between admin and players.
* **Song Database:**
  * Uses web scraping from Tabs4U to get dynamic song data.

## Technologies Used

* **Frontend:**
  * React
  * TailwindCSS
  * Socket.io-client
* **Backend:**
  * Nodejs
  * Express
  * Socket.io

* **Database:**
  * MongoDB
* **Deployment:**
  * Render

## Setup Instructions

1. **Clone the Repository:**

    ```bash
    git clone 
    cd 
    ```

2. **Install Dependencies:**

    * For the root directory:

        ```bash
        npm build
        ```

3. **Configure Environment Variables:**

    * Create a `.env` file in the backend directory and add necessary environment variables (e.g., database connection strings, port numbers).

4. **Run the Application:**

    * Start the backend server:

        ```bash
        npm run start
        ```

5. **Access the Application:**

    * Open your browser and navigate to the appropriate URL (usually `http://localhost:5000` for development).

## User Registration and Login

* **Regular User:**
  * Navigate to the signup page.
  * Enter a username, password, and instrument.
  * Click "Register."
  * Use the same credentials to log in on the login page.
* **Admin User:**
  * Navigate to the admin registration page through the interface.
  * Enter a username and password.
  * Click "Register."
  * Use the same credentials to log in on the login page.

## Deployment

* The application is deployed on Render.
* Follow the user registration and login instructions above to access the application.

## Bonus Feature - Web Scraping

* The application also includes a bonus feature to crawl song data from Tab4U.
* This feature is integrated into the song search functionality.

## Testing

  1. **Multiple users registration and login:**
*  Register as an admin, and multiple users (one should be a singer to test chordless output).
*  Login through several Incognito browsers to be able to log to several accounts (This is to bypass local storage )
  2. 
  

## Author

* Itamar casspi

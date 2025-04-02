# JaMoveo - Moveo Band Web Application

## Project Description

JaMoveo is a web application designed to enhance the musical rehearsal experience for the Moveo band. It allows band members to log in, specify their instruments, and participate in rehearsal sessions controlled by an admin. The admin can search for songs, display chords and lyrics, and manage the flow of the rehearsal.

## Deployment

Deployed using Render services- server might spindown on inactivity causing slower reaction on first login.
[Deployed Application Link here](https://jamoveo-qvvw.onrender.com/)

## Demo

1. Player reistration:

  ![player-screen](https://github.com/user-attachments/assets/797b8d7a-3fd0-4ee2-b413-e9d8dc68663b)

2. Admin registration:

   ![admin-screen](https://github.com/user-attachments/assets/c781f84b-58d6-4c4c-81ff-82e2b985bf27)

3. Admin search:
   * Search function only available to admin. Song list data retrieved by web scraping using Axios API.

   ![search_double](https://github.com/user-attachments/assets/ff765f1f-7b79-4ffd-90ac-c111c18dd20d)

4. Session start:
   * Session start function only available to admin. The song data itself is retrieved by web scraping as well.
   * Checkbox auto scroll toggle with added custom scroll speed input.
   * Admin can terminate session to all connected users.
   ![session_double](https://github.com/user-attachments/assets/de833738-a5f0-47ea-bfa2-813c412dafef)

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

    Open terminal and use the following commands:

      ```bash
      git clone https://github.com/itamarcasspi/JaMoveo.git
      cd JaMoveo
      ```

2. **Install Dependencies:**

    From the root directory, use the npm build command, which will install all dependencies and build the app:

      ```bash
      npm run build
      ```

3. **Configure Environment Variables:**

    * Create a `.env` file in the root directory and add necessary environment variables (e.g., database connection strings, port numbers). Choose an open port, get your MONGODB_URI address, and generate a JWT secret.

      1. PORT=
      2. MONGODB_URI=
      3. JWT_SECRET=
      4. NODE_ENV=dev

4. **Run the Application:**

    * Start the backend server, which will handle the frontend page access as well.

        ```bash
        npm run start
        ```

5. **Access the Application:**

    * Open your browser and navigate to localhost.
    * NOTE: for deployment purposes SocketContext address and Socket server adress were hardcoded. To host locally change to your localhost adress with the open port.

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
  
## Bonus Feature - Web Scraping

* The application also includes a bonus feature to crawl song data from Tab4U.
* This feature is integrated into the song search functionality.

## Testing

1. **Multiple users registration and login:**

   * Register as an admin, and multiple users (one should be a singer to test chordless output).
   * Login through several Incognito browsers to be able to log to several accounts (This is to bypass local storage )

2. **Admin song search**
   * Using the Admin's interface search for a song.
   * The application API's uses scraping methods to crawl Tab4U for "live" data.
   *
3.
  
## Author

* Itamar casspi
*

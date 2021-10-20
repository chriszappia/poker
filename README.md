Planning Poker
==============

Tired of making new planning poker games all the time? Need more than 20 characters in your name? Boy do I have a solution for you!


## Host your own

The planning poker app makes use of [Google Firebase](https://firebase.google.com/)'s Realtime Database.

To get started, create a project via the [Firebase Console](https://console.firebase.google.com/). Follow the Wizard and create a new Web App. Create a new Realtime Database under __Realtime Database -> Create Database__.


## Building and Running the application

Copy the `.env.template` file to `.env` and populate the values.

The appropriate values can be found under the [Firebase Console](https://console.firebase.google.com/) under __Project settings -> Your Apps__, under the __SDK setup and configuration__ heading in the code snippet.


Once populated, run `npm start` for a local development server, or `npm run build` for a production build.
# Gotta Have Goals...

Create a fullstack vue/postgres app that allows users to track their goals. It also offers a summary page
that shows for each user how many goals total and how many complete

## App

The App should offer the following routes:
* `/auth` - Sign Up/In
* `/goals`
    * List of goals
        * User can mark goal complete
    * Form to add a new goal
* `/` (home) - List of all users with goals complete and total goals

## Server

You only need the routes required for the app to work:
* `POST` `/api/auth/signup`
* `POST` `/api/auth/signin`
* `GET` `/api/me/goals`
* `POST` `/api/me/goals`
* `PUT` `/api/me/goals`
* `GET` `/api/goals`

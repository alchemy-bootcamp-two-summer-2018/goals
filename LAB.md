# Gotta Have Goals...

Create a fullstack vue/postgres app that allows users to track their goals.

## Build

Change your build setup:
* Use the proxy feature from the Vue dev server to the backend express server
* Change `services/api.js` to not use server name (`/api`, not `http://localhost:8080/api`)

## App

The App should offer the following routes:

* `/` (home) - Landing page with enticement like "sign up now" that links to /auth
* `/auth` - Sign Up/In
* `/goals`
    * List of users own goals
        * User can mark goal complete
    * Form to add a new goal
* `/users` - List of all users and their goals (BONUS: with goals complete and total goals)

Also include a header with Navigation links to other routes

## Server

You only need the routes required for the app to work:
* `POST` `/api/auth/signup`
* `POST` `/api/auth/signin`
* `GET` `/api/me/goals` - implicit `WHERE user_id = $1` and `$1` is `req.userId`
* `POST` `/api/me/goals` - use `req.userId`
* `PUT` `/api/me/goals` - use `req.userId`
* `GET` `/api/users` - return join of `users` and `goals`

## Bonus

* Change `GET` `/api/users` to aggregate count of goals per user and 
* Include count of completed goals

## Rubric

* Setup server auth **4pts**
* Setup app service apis and token tracking **3pts**
* Add Signup and Signin Forms **3pts**

# Gotta Have Goals...

Create a fullstack vue/postgres app that allows users to track their goals.

## App

The App should offer the following routes:

* `/` (home) - Landing page with link to signup
* `/auth` - Sign Up/In
* `/goals`
    * List of users own goals
        * User can mark goal complete
    * Form to add a new goal
* `/users` (home) - List of all users adn their goals (BONUS: with goals complete and total goals)

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

# Gotta Have Goals...

Create a fullstack vue/postgres app that allows users to track their goals.

## Daily Code Kata

Complete [today's Kata](https://www.codewars.com/kata/sum-of-odd-cubed-numbers)

## Build

Make sure you are using proxy feature for development:
* Use the proxy feature from the Vue dev server to the backend express server
* Change `services/api.js` to not use server name (`/api`, not `http://localhost:8080/api`)

## Data

User consists of:
* Username
* First Name
* Last Name
* Email
* Password
* (id)

Goal
* Title
* Start Date
* End Date (not NULL means completed)
* User Id
* (id)

## App

The App should offer the following routes:

* `/` (home) - Landing page with enticement like "sign up now" that links to /auth
* `/auth` - Sign Up/In
* `/goals`
    * List of users own goals
        * User can mark goal complete
    * Form to add a new goal

Also include a header with Navigation links to other routes

## Server

You only need the routes required for the app to work:
* `POST` `/api/auth/signup`
* `POST` `/api/auth/signin`
* `GET` `/api/me/goals` - implicit `WHERE user_id = $1` and `$1` is `req.userId`
* `POST` `/api/me/goals` - use `req.userId`
* `PUT` `/api/me/goals` - use `req.userId`

## Rubric

* Setup server auth **4pts**
* Setup app service apis and token tracking **3pts**
* Add Signup and Signin Forms **3pts**

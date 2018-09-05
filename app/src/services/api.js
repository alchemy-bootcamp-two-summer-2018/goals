const URL = '/api';
const NEIGHBORHOODS_URL = `${URL}/neighborhoods`;
const RESTAURANTS_URL = `${URL}/restaurants`;
const AUTH_URL = `${URL}/auth`;
const GOALS_URL = `${URL}/me/goals`;
const USERS_URL = `${URL}/users`;

function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(body => { 
    throw body.error; 
  });
}

let token = '';

function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if(token) headers['Authorization'] = token;
  return headers;
}

export function getNeighborhoods() {
  return fetch(NEIGHBORHOODS_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function addNeighborhood(neighborhood) {
  return fetch(NEIGHBORHOODS_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(neighborhood)
  })
    .then(responseHandler);
}

export function updateNeighborhood(neighborhood) {
  return fetch(`${NEIGHBORHOODS_URL}/${neighborhood.id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(neighborhood)
  })
    .then(responseHandler);
}

export function removeNeighborhood(id) {
  return fetch(`${NEIGHBORHOODS_URL}/${id}`, {
    headers: getHeaders(),
    method: 'DELETE'
  })
    .then(responseHandler);
}

export function getQuadrants() {
  return fetch(`${URL}/quadrants`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function getQuadrant(id) {
  return fetch(`${URL}/quadrants/${id}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function getRestaurants(neighborhoodId) {
  // use `encodeURIComponent(value)` if things in query string need
  // to be escaped (like spaces, punctuation, etc)
  return fetch(`${RESTAURANTS_URL}?neighborhoodId=${neighborhoodId}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function addRestaurant(restaurant) {
  return fetch(RESTAURANTS_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(restaurant)
  })
    .then(responseHandler);
}

export function signUp(credentials) {
  console.log('auth', AUTH_URL);
  return fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler)
    .then(user => {
      storeUser(user);
      return user;
    });
}

export function signIn(credentials) {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler)
    .then(user => {
      storeUser(user);
      return user;
    });
}

function storeUser(user) {
  token = user.id;
  window.localStorage.setItem('user', JSON.stringify(user));
}

export function signOut() {
  token = '';
  window.localStorage.removeItem('user');
}

export function checkForToken() {
  const json = window.localStorage.getItem('user');
  if(!json) {
    return null;
  }

  const user = JSON.parse(json);
  token = user.id;
  return user;
}

export function getGoals() {
  return fetch(GOALS_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}
export function getUsersandGoals() {
  return fetch(USERS_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function addGoal(goal) {
  return fetch(GOALS_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(goal)
  })
    .then(responseHandler);
}

export function updateGoal(goal) {
  return fetch(`${GOALS_URL}/${goal.id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(goal)
  })
    .then(responseHandler);
}

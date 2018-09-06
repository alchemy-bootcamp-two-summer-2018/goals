const URL = '/api';
const GOALS_URL = `${URL}/goals`;
const AUTH_URL = `${URL}/auth`;

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

export function getGoals() {
  return fetch(GOALS_URL, {
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

export function signUp(credentials) {
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
      // console.log(user);
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
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
export function getUsers() {
  return fetch(`${URL}/users`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}
export function getUser(id) {
  return fetch(`${URL}/users/${id}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}
  
export function signUp(credentials) {
  return fetch(`${AUTH_URL}/signUp`, {
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
  return fetch(`${AUTH_URL}/signIn`, {
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
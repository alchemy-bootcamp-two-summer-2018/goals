const URL = '/api';
const GOALS_URL = `${URL}/goals`;

function responseHandler(response) {
    if(response.ok) return response.json();
    return response.json().then(body => { 
      throw body.error; 
    });
  }

  let token = '';

  function getHeaders() {
      const headers = { 'Content-type': 'application/json' };
      if(token) headers['Authorization'] = token;
      return headers;
  }

export function addGoal(goal) {
    console.log("api goal", goal)
    return fetch(GOALS_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(goal)
    })
        .then(responseHandler);
}
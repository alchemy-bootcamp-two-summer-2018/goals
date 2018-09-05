export default {
    getUser() {
      return fetch('http://localhost:3000', {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json());
    }
  };
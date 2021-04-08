const fetch = require('node-fetch');

const petition = (elevatorEndpoint,url, method="POST", body) => fetch(`${elevatorEndpoint}/${url}`, {
    method,
    headers: {'Content-Type': 'application/json'}, 
    body: body ? JSON.stringify(body) : null
});

module.exports = {fetch: petition};
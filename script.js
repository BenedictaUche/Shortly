input = document.getElementById('input').value

const apiKey = 'ec5c7a9a4101470996efc00af3e1674a';
const longUrl = `${input}`;



fetch(`https://api.rebrandly.com/v1/links`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
    },
    body: JSON.stringify({
        destination: longUrl
    })
})
    .then(response => response.json())
    .then(data => console.log(data.shortUrl))
    .catch(error => console.error(error));

// const selectElement = (selector) => {
//     const element = document.querySelector(selector);
//     if(element) return element;
//     throw new Error(`Cannot find the element ${selector}`)
// }
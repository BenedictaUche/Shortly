let copy = document.querySelector('.copy');

const apiKey = 'ec5c7a9a4101470996efc00af3e1674a';

const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Cannot find the element ${selector}`);
};

const form = selectElement('form');
const input = selectElement('input');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;
    shortenUrl(url);
});

async function shortenUrl(url) {
    try {
        const res = await fetch(`https://api.rebrandly.com/v1/links`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey
            },
            body: JSON.stringify({
                destination: url
            })
        });
        const data = await res.json();

        const shortenedUrlContainer = document.createElement('div');
        shortenedUrlContainer.classList.add('d-flex', 'd-column', 'item');
        shortenedUrlContainer.innerHTML = `
      <div class="d-flex justify-content-between container container-fluid mt-3 py-2 output">
        <div>
          <p>${url}</p>
        </div>
        <div class="shortened">
          <a href="${data.shortUrl}">${data.shortUrl}</a>
          <button class="btn copy">Copy</button>
        </div>
      </div>
    `;
        const copyBtn = shortenedUrlContainer.querySelector('.copy');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
            copy.innerHTML = 'Copied!'
        });
        const output = selectElement('.outputList');
        output.appendChild(shortenedUrlContainer);
        input.value = '';
    } catch (error) {
        console.log(error);
        // display error message to the user

    }
}

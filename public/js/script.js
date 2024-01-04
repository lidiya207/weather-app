document.addEventListener('DOMContentLoaded', (event) => {
    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');
    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');

    if (weatherForm && search) {
        weatherForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const location = search.value;

            messageOne.textContent = 'Loading...';
            messageTwo.textContent = '';  // Clear any previous content

            fetch('/weather?address=' + location)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        messageOne.textContent = data.error;
                    } else {
                        messageOne.textContent = `Location: ${data.location}`;
                        messageTwo.textContent = `Forecast: ${data.forecast}`;
                    }
                })
                .catch(error => {
                    console.log('Fetch error:', error.message);
                });
        });
    } else {
        console.log('Form or input element not found.');
    }
});

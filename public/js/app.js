console.log('Client side javascript file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then(data => {
//         console.log(data);
//     })
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading message...';
    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location + ', ' + data.forecast;
            }
        })
    });
});


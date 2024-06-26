function generateSeatGrid(rows, cols) {
    const seatGrid = document.getElementById('seats');
    seatGrid.innerHTML = '';

    for (let row = 1; row <= rows; row++) {
        const rowEl = document.createElement('div');

        for (let col = 1; col <= cols; col++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.id = `row_${row}col_${col}`;
            rowEl.appendChild(seat);
        }

        seatGrid.appendChild(rowEl);
    }

    const seats = document.querySelectorAll('.seat');

    seats.forEach((seat) => {
        seat.onclick = function (event) {
            if (event.target.classList.contains('selected')) {
                event.target.classList.remove('selected');
            } else {
                event.target.classList.add('selected');
            }
        };
    });
}

function checkSelectedSeats() {
    const seats = document.querySelectorAll('.seat.selected');
    if (seats.length === parseInt(document.getElementById('tickets').value)) {
        document.getElementById('seats').classList.remove('invalid');
    } else {
        document.getElementById('seats').classList.add('invalid');
    }
}

function validation(){
    event.preventDefault();

    const movie = document.getElementById('movie').value;
    const tickets = parseInt(document.getElementById('tickets').value);
    const seats = document.querySelectorAll('.seat.selected');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!movie) {
        alert('Please select a movie.');
        return;
    }

    if (!tickets || tickets < 1) {
        alert('Please enter a valid number of tickets.');
        return;
    }

    if (seats.length !== tickets) {
        alert('Please select the correct number of seats.');
        return;
    }

    if (!name) {
        alert('Please enter your name.');
        return;
    }

    if (!email || !validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!phone || !validatePhone(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    alert('Reservation successful!');
};

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^\d{10}$/;
    return regex.test(phone);
}
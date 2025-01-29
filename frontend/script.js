// Swiper initialization
const swiper = new Swiper('.swiper-container', {
    loop: true, // Infinite loop
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 7000, // Auto-slide every 7 seconds
        disableOnInteraction: false,
    },
});

function sendMessage() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill out all fields before sending your message.');
        return;
    }

    fetch('http://localhost:5000/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                alert('Your message has been sent!');
                document.getElementById('contactForm').reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}

function toggleBookingDropdown() {
    const dropdown = document.getElementById("bookingDropdown");
    dropdown.classList.toggle("show");
}

// Close dropdown if user clicks outside
window.onclick = function(event) {
    if (!event.target.matches('.book-btn')) {
        let dropdowns = document.getElementsByClassName("dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};

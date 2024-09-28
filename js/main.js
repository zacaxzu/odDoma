document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.event-section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Prestani promatrati nakon što je vidljivo
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
});

let cardObserver;

function observeCards() {
    const cards = document.querySelectorAll('.event-card:not(.observed)');

    // Ako nema observera, kreiraj samo jedan
    if (!cardObserver) {
        cardObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    entry.target.classList.add('observed');
                    cardObserver.unobserve(entry.target);

                    // Event listener za preusmjeravanje na novu stranicu
                    entry.target.addEventListener('click', () => {
                        const eventId = entry.target.getAttribute('data-event-id');
                        const eventImage = entry.target.querySelector('img').src;

                        sessionStorage.setItem('eventImage', eventImage);

                        document.body.classList.add('fade-out');
                        setTimeout(() => {
                            window.location.href = `/event-details.html?eventId=${eventId}&image=${encodeURIComponent(eventImage)}`;
                        }, 1000);
                    });
                }
            });
        }, { threshold: 0.2 });
    }

    // Postavi promatranje samo za nove kartice
    cards.forEach(card => cardObserver.observe(card));
}

document.addEventListener('DOMContentLoaded', observeCards);

function loadMoreEvents(sectionId, eventListId, events, showLessId) {
    const button = document.getElementById(sectionId);
    const eventList = document.getElementById(eventListId);
    const showLessButton = document.getElementById(showLessId);

    let addedEvents = [];

    button.addEventListener('click', () => {
        let limit = 3;
        events.slice(0, limit).forEach(event => {
            const newCard = document.createElement('div');
            newCard.classList.add('event-card');
            newCard.innerHTML = `
                <img src="${event.image}" alt="Event Image" loading="lazy">
                <h3>${event.title}</h3>
                <p>Date: ${event.date}</p>
                <p>Location: ${event.location}</p>
                <p>${event.description}</p>
            `;
            eventList.appendChild(newCard);
            addedEvents.push(newCard);
        });

        observeCards(); // Ponovno pokreni observer
        showLessButton.style.display = 'inline-block';
    });

    showLessButton.addEventListener('click', () => {
        addedEvents.forEach(event => {
            event.classList.add('hide');
        });

        setTimeout(() => {
            addedEvents.forEach(event => event.remove());
            addedEvents = [];
            showLessButton.style.display = 'none';
        }, 500);
    });
}

const currentEvents = [
    {
        image: '/slike/the-jopwell-collection-4WTb4tR45JQ-unsplash.jpg',
        title: 'Event 4',
        date: 'December 10, 2024',
        location: 'Chicago',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        image: '/slike/austin-distel-rxpThOwuVgE-unsplash.jpg',
        title: 'Event 5',
        date: 'January 15, 2025',
        location: 'Miami',
        description: 'Nullam id varius nibh, vel gravida eros.'
    },
    {
        image: '/slike/brooke-cagle--uHVRvDr7pg-unsplash.jpg',
        title: 'Event 6',
        date: 'January 15, 2025',
        location: 'Miami',
        description: 'Nullam id varius nibh, vel gravida eros.'
    }
];

loadMoreEvents('load-more-current', 'current-event-list', currentEvents, 'show-less-current');

const textContainer = document.querySelector('.text-container');
const textObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            textContainer.classList.add('active');
        }
    });
}, { threshold: 0.5 });

textObserver.observe(document.querySelector('.bottom-section'));

function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            eventId: params.get('eventId'),
            image: params.get('image')
        };
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Fade-in effect when the page loads
        setTimeout(() => {
            document.body.classList.add('fade-in');
        }, 50);

        const queryParams = getQueryParams();

        // Set background image
        if (queryParams.image) {
            document.querySelector('.event-details-container').style.backgroundImage = `url(${decodeURIComponent(queryParams.image)})`;
        }

        // Back button functionality with fade-out effect
        const backButton = document.getElementById('back-button');
        backButton.addEventListener('click', () => {
            document.body.classList.add('fade-out'); // Trigger fade-out

            setTimeout(() => {
                window.history.back(); // Navigate to the previous page after fade-out
            }, 500); // Match the fade-out transition time
        });

        // Attendees circle functionality
        const attendeesCircle = document.getElementById('attendees-circle');
        const attendeesPopup = document.getElementById('attendees-popup');
        const closePopup = document.getElementById('close-popup');
        const attendeesList = document.getElementById('attendees-list');

        attendeesCircle.addEventListener('click', () => {
            attendeesPopup.style.display = 'flex'; // Show popup

            // Populate the popup with attendees
            const attendees = [
                'Alice Smith',
                'Bob Johnson',
                'Carol Williams',
                'David Brown'
            ];

            attendeesList.innerHTML = attendees.map(attendee => `<li>${attendee}</li>`).join('');
        });

        closePopup.addEventListener('click', () => {
            attendeesPopup.style.display = 'none'; // Hide popup
        });

        window.addEventListener('click', (event) => {
            if (event.target === attendeesPopup) {
                attendeesPopup.style.display = 'none'; // Hide popup if clicked outside
            }
        });
    });
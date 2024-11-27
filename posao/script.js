// script.js
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('toggleButton');

// Sidebar toggle
document.getElementById('toggleButton').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
});

// Sort toggle
const sortToggleButton = document.getElementById('sortToggle');
sortToggleButton.addEventListener('click', () => {
  if (sortToggleButton.textContent === 'Ascending') {
    sortToggleButton.textContent = 'Descending';
  } else {
    sortToggleButton.textContent = 'Ascending';
  }
});

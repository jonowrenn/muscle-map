document.addEventListener('DOMContentLoaded', function() {
  // Get current page from URL path
  const pathParts = window.location.pathname.split('/');
  const currentPage = parseInt(pathParts[pathParts.length - 1]) || 1;

  // Get progress tracker elements — only runs on muscle detail pages
  const tracker = document.querySelector('.progress-tracker');
  if (!tracker) return;
  const trackerItems = tracker.querySelectorAll('li');
  const toggleButton = document.querySelector('.progress-tracker-toggle');

  // Mobile toggle functionality
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      tracker.classList.toggle('show');
    });
  }

  // Update tracker state based on current page
  trackerItems.forEach((item, index) => {
    const pageNum = index + 1;

    // Clear all classes first
    item.classList.remove('locked', 'current', 'completed');

    if (pageNum < currentPage) {
      item.classList.add('completed');
    } else if (pageNum === currentPage) {
      item.classList.add('current');
    } else {
      item.classList.add('locked');
    }

    // Add click handler
    item.addEventListener('click', function() {
      if (!this.classList.contains('locked')) {
        const href = this.getAttribute('data-href');
        if (href) {
          window.location.href = href;
        }
      }
    });
  });

  // Close tracker when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 &&
        !tracker.contains(e.target) &&
        toggleButton && !toggleButton.contains(e.target)) {
      tracker.classList.remove('show');
    }
  });
});

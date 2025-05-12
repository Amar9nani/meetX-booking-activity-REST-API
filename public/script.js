document.addEventListener('DOMContentLoaded', () => {
  // Get all endpoints
  const endpoints = document.querySelectorAll('.endpoint');
  
  // Add event listeners to each endpoint header to toggle details
  endpoints.forEach(endpoint => {
    const header = endpoint.querySelector('.endpoint-header');
    const details = endpoint.querySelector('.endpoint-details');
    
    // Initially show all endpoints
    details.style.display = 'block';
    
    header.addEventListener('click', () => {
      // Toggle display
      if (details.style.display === 'block') {
        details.style.display = 'none';
      } else {
        details.style.display = 'block';
      }
    });
    
    // Add hover effect
    header.style.cursor = 'pointer';
    header.addEventListener('mouseenter', () => {
      header.style.opacity = '0.8';
    });
    header.addEventListener('mouseleave', () => {
      header.style.opacity = '1';
    });
  });
});
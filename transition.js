document.addEventListener('DOMContentLoaded', () => {
    // Add transition class when page loads
    document.body.classList.add('page-transition');

    // Handle navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            // Start exit animation
            document.querySelector('.container').style.animation = 'in-circle-swoop var(--transition__duration) ease-in-out reverse';
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = target;
            }, 800); // Match this with --transition__duration
        });
    });
}); 
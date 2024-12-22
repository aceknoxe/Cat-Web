document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon based on menu state
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    const catImg = document.getElementById('cat-img');
    const generateBtn = document.getElementById('generate-btn');
    const catContainer = document.querySelector('.cat-container');
    
    // Create and append loader
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
    `;
    catContainer.appendChild(loader);
    
    // Function to fetch random cat image
    const generateCat = async () => {
        try {
            // Hide image and show loader
            catImg.style.opacity = '0';
            loader.style.display = 'block';
            generateBtn.disabled = true;
            
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            
            // Update image source
            catImg.src = data[0].url;
            
            // Once image is loaded, hide loader and show image
            catImg.onload = () => {
                loader.style.display = 'none';
                catImg.style.opacity = '1';
                generateBtn.disabled = false;
            };
        } catch (error) {
            console.error('Error fetching cat:', error);
            alert('Failed to fetch cat image. Please try again!');
            loader.style.display = 'none';
            generateBtn.disabled = false;
        }
    };
    
    // Generate initial cat image
    generateCat();
    
    // Add click event listener to button
    generateBtn.addEventListener('click', generateCat);
}); 

// Add to script.js where the image is generated
const saveToGallery = (imageUrl, prompt) => {
    const images = JSON.parse(localStorage.getItem('generatedImages')) || [];
    images.push({
        imageUrl,
        prompt: prompt,
        date: new Date().toISOString()
    });
    localStorage.setItem('generatedImages', JSON.stringify(images));
};

// Add this to your existing generateCat function after successful generation
saveToGallery(data[0].url, promptInput.value);

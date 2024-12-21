document.addEventListener('DOMContentLoaded', () => {
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
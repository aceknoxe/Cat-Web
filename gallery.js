// gallery.js
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Function to load gallery items from localStorage
    const loadGalleryItems = () => {
        const images = JSON.parse(localStorage.getItem('generatedImages')) || [];
        const recentImages = images.slice(-10).reverse(); // Get last 10 images
        
        if (recentImages.length === 0) {
            // Show message if no images
            galleryGrid.innerHTML = `
                <div class="no-images">
                    <p>No images generated yet. Go to the Create page to generate some!</p>
                </div>
            `;
            return;
        }
        
        galleryGrid.innerHTML = ''; // Clear existing content
        
        recentImages.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.prompt}" class="gallery-image">
                <div class="gallery-content">
                    <p class="gallery-prompt">${item.prompt || 'No prompt provided'}</p>
                    <p class="gallery-date">${new Date(item.date).toLocaleDateString()}</p>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    };
    
    loadGalleryItems();
});
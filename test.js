
let currentIndex = 0; // Start from the first image

document.getElementById('yesBtn').addEventListener('click', function() {
    const response = document.getElementById('response');
    response.innerHTML = "<h2>Thank for you for these 6 months my sweetest baby!</h2><h2> I love how every little thing about you feels so special to me, from your laugh to the way you stand up for what's right. Being apart is tough, but it makes me cherish the moments we share even more. You light up my life, and I can't wait until we're together</h2>";
    applyFadeInAnimation(response);
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '<img src="' + "ring.jpg" + '" alt="Memory"/>';
});

// Function to get all images from the images directory
async function getImagesFromDirectory() {
    try {
        // This will only work if the images are in a subdirectory called 'images/'
        // and the server is configured to list directory contents
        const response = await fetch('images/');
        const text = await response.text();
        const parser = new DOMParser();
        const html = parser.parseFromString(text, 'text/html');
        const links = html.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]');
        return Array.from(links).map(link => 'images/' + link.getAttribute('href'));
    } catch (error) {
        console.error('Error loading images:', error);
        return [];
    }
}

document.getElementById('noBtn').addEventListener('click', async function() {
    const response = document.getElementById('response');
    response.innerHTML = "";
    
    const images = await getImagesFromDirectory();
    if (images.length === 0) {
        // Fallback to known images if directory listing fails
        images.push('tying_shoe.jpg', 'scriptie_bracelet.jpg');
    }
    
    if (currentIndex >= images.length) {
        currentIndex = 0; // Reset to the first image if at the end of the array
    }
    
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '<h2>Really saying No??</h2><img src="' + images[currentIndex] + '" alt="Memory"/>';
    applyFadeInAnimation(imageContainer);
    currentIndex++;
});

function applyFadeInAnimation(element) {
    element.classList.remove('fade-in'); // Remove the class to reset the animation
    void element.offsetWidth; // Trigger reflow to actually remove the class
    element.classList.add('fade-in'); // Re-add the class to start the animation
}
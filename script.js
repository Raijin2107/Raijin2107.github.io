const thumbnails = [];
const images = [];
for (let i = 1; i <= 74; i++) {
    thumbnails.push(`src/thumbnails/ကိုကျော်ကားအငှားဝန်ဆောင်မှုsmall (${i}).webp`);
    images.push(`src/services/ကိုကျော်ကားအငှားဝန်ဆောင်မှု (${i}).webp`);
}

const thumbnailContainer = document.getElementById('thumbnails');
const toggleButton = document.getElementById('toggleButton');
let currentIndex = 0;
let isExpanded = false;

thumbnails.forEach((thumbnail, index) => {
    const img = document.createElement('img');
    img.src = thumbnail;
    img.alt = `Image ${index + 1}`;
    img.classList.add('thumbnail');
    img.loading = "lazy"
    img.onclick = () => openPopup(index);
    thumbnailContainer.appendChild(img);
});

// Initial state to show only 3 rows
thumbnailContainer.classList.add('collapsed');

function toggleGallery() {
    if (isExpanded) {
        thumbnailContainer.classList.remove('expanded');
        thumbnailContainer.classList.add('collapsed');
        toggleButton.textContent = 'See More';
    } else {
        thumbnailContainer.classList.remove('collapsed');
        thumbnailContainer.classList.add('expanded');
        toggleButton.textContent = 'See Less';
    }
    isExpanded = !isExpanded;
}

function openPopup(index) {
    currentIndex = index;
    document.getElementById('popupImage').src = images[currentIndex];
    document.getElementById('imagePopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
}

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    document.getElementById('popupImage').src = images[currentIndex];
    preloadNextImage(); // Optionally preload the next image
}

function preloadNextImage() {
    // Preload the next image
    const nextIndex = (currentIndex + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
}

// Variables for swipe detection
let startX = 0;
let endX = 0;

const popupImage = document.getElementById('popupImage');

// Detect touch start
popupImage.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
}, false);

// Detect touch move
popupImage.addEventListener('touchmove', function(event) {
    endX = event.touches[0].clientX;
}, false);

// Detect touch end and determine swipe direction
popupImage.addEventListener('touchend', function() {
    if (endX < startX) {
        changeImage(1); // Swipe left, show next image
    } else if (endX > startX) {
        changeImage(-1); // Swipe right, show previous image
    }
}, false);

window.onclick = function(event) {
    const popup = document.getElementById('imagePopup');
    if (event.target === popup) {
        closePopup();
    }
}

toggleButton.onclick = toggleGallery;


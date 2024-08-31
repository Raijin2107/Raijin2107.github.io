// script.js

const thumbnails = [];
const images = [];
for (let i = 1; i <= 74; i++) {
    thumbnails.push(`src/thumbnails/ကိုကျော်ကားအငှားဝန်ဆောင်မှုsmall (${i}).webp`);
    images.push(`src/services/ကိုကျော်ကားအငှားဝန်ဆောင်မှု (${i}).png`);
}

const thumbnailContainer = document.getElementById('thumbnails');
let currentIndex = 0;

thumbnails.forEach((thumbnail, index) => {
    const img = document.createElement('img');
    img.src = thumbnail;
    img.alt = `Image ${index + 1}`;
    img.classList.add('thumbnail');
    img.loading = "lazy"
    img.onclick = () => openPopup(index);
    thumbnailContainer.appendChild(img);
});

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
}

function preloadNextImage() {
    // Preload the next image
    const nextIndex = (currentIndex + 1) % fullSizeImages.length;
    const img = new Image();
    img.src = fullSizeImages[nextIndex];
}

window.onclick = function(event) {
    const popup = document.getElementById('imagePopup');
    if (event.target === popup) {
        closePopup();
    }
}

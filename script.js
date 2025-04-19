const imageSources = [
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg',
  'images/4.jpg',
  'images/5.jpg',
  // Add as many as you like here
];

let currentIndex = 0;

const slider = document.getElementById('slider');
const background = document.getElementById('background');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateSlider() {
  // Clear current slides
  slider.innerHTML = '';

  // Current image
  const mainImage = document.createElement('img');
  mainImage.src = imageSources[currentIndex];
  mainImage.classList.add('image-slide');
  slider.appendChild(mainImage);

  // Next image preview (optional, only if exists)
  const nextIndex = (currentIndex + 1) % imageSources.length;
  if (imageSources[nextIndex]) {
    const previewImage = document.createElement('img');
    previewImage.src = imageSources[nextIndex];
    previewImage.classList.add('image-slide', 'preview');
    slider.appendChild(previewImage);
  }

  // Update blurred background
  background.style.backgroundImage = `url('${imageSources[currentIndex]}')`;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
  updateSlider();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imageSources.length;
  updateSlider();
}

// Button events
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Initial load
updateSlider();

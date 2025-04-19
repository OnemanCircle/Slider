let currentSlide = 0;
const slider = document.getElementById("slider");

// Dynamically load images from /images/1.jpg, 2.jpg, ...
async function loadImages() {
  let index = 1;
  while (true) {
    const img = new Image();
    img.src = `images/${index}.jpg`;
    img.classList.add("slide-image");

    const loaded = await new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });

    if (!loaded) break;

    slider.appendChild(img);
    index++;
  }

  if (slider.children.length > 0) {
    showSlide(0);
  }
}

function showSlide(index) {
  const totalSlides = slider.children.length;
  if (totalSlides === 0) return;
  currentSlide = (index + totalSlides) % totalSlides;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function moveSlide(dir) {
  showSlide(currentSlide + dir);
}

loadImages();

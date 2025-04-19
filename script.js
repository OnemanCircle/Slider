let currentIndex = 1;
let totalImages = 0;
const mainContainer = document.getElementById("mainImageContainer");
const nextContainer = document.getElementById("nextImageContainer");
const background = document.getElementById("background");

async function imageExists(src) {
  const img = new Image();
  img.src = src;
  return await new Promise((res) => {
    img.onload = () => res(true);
    img.onerror = () => res(false);
  });
}

async function preloadNext(index) {
  const nextImg = `images/${index}.jpg`;
  if (await imageExists(nextImg)) {
    totalImages = Math.max(totalImages, index);
    return nextImg;
  }
  return null;
}

async function updateImages() {
  const mainImg = document.createElement("img");
  const mainSrc = `images/${currentIndex}.jpg`;
  mainImg.src = mainSrc;

  const nextSrc = await preloadNext(currentIndex + 1);

  mainContainer.innerHTML = "";
  mainContainer.appendChild(mainImg);

  // Animate background
  background.style.backgroundImage = `url(${mainSrc})`;

  // Update next preview
  nextContainer.innerHTML = "";
  if (nextSrc) {
    const nextImg = document.createElement("img");
    nextImg.src = nextSrc;
    nextContainer.appendChild(nextImg);
  }
}

function changeImage(dir) {
  const newIndex = currentIndex + dir;
  if (newIndex < 1) return;
  preloadNext(newIndex).then((exists) => {
    if (exists) {
      currentIndex = newIndex;
      updateImages();
    }
  });
}

// Initialize
updateImages();
let startX = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      changeImage(1); // Swipe left
    } else {
      changeImage(-1); // Swipe right
    }
  }
});

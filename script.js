const mainContainer = document.getElementById("mainImageContainer");
const background = document.getElementById("background");

const img = new Image();
img.src = "images/1.jpg";
img.onload = () => {
  background.style.backgroundImage = `url(${img.src})`;
  mainContainer.appendChild(img);
};

img.onerror = () => {
  alert("Image not found at images/1.jpg");
};

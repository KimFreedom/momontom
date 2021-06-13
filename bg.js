const body = document.querySelector("body");

const IMG_NUMBER = 7;
let currentImgNumber = 0;

function getImageURL() {
  currentImgNumber = (currentImgNumber + 1) % IMG_NUMBER;
  return `images/${currentImgNumber}.jpg`;
}

function updateImage() {
  const oldImage = body.querySelector("img");
  oldImage.parentElement.removeChild(oldImage);
  paintImage();
}

function paintImage() {
  const image = new Image();
  image.src = getImageURL();
  image.classList.add("bgImage");
  body.prepend(image);
}


function init() {
  paintImage();
  setInterval(updateImage, 8000);
}

init();

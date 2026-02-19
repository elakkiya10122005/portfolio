const frameCount = 240;
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const currentFrame = (index) => {
  const paddedIndex = String(index).padStart(3, '0');
  return `frames/ezgif-frame${paddedIndex}.jpg`;
};

const images = [];
let loadedImages = 0;
let currentFrameIndex = 0;

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
    loadedImages++;
    if (loadedImages === frameCount) {
      renderImage(1);
    }
  };
  images.push(img);
}

function renderImage(index) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const img = images[index - 1];

  // Scale image to cover screen
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = canvas.width / 2 - (img.width / 2) * scale;
  const y = canvas.height / 2 - (img.height / 2) * scale;

  context.drawImage(
    img,
    x,
    y,
    img.width * scale,
    img.height * scale
  );
}

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount,
    Math.ceil(scrollFraction * frameCount)
  );

  if (frameIndex !== currentFrameIndex) {
    currentFrameIndex = frameIndex;
    renderImage(frameIndex);
  }
});

// Resize support
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderImage(currentFrameIndex || 1);
});

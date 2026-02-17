const input = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const convertBtn = document.getElementById("convertBtn");
const formatSelect = document.getElementById("formatSelect");
let currentImage = null;

function createImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.style.maxWidth = "200px";
  img.style.margin = "10px";
  return img;
}

input.addEventListener("change", () => {
  preview.innerHTML = "";
  const file = input.files[0];

  if (!file || !file.type.startsWith("image/")) {
    alert("Please select only image files.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    currentImage = createImage(e.target.result);
    preview.appendChild(currentImage);
  };
  reader.readAsDataURL(file);
});

convertBtn.addEventListener("click", () => {
  if (!currentImage) {
    alert("Nenhuma imagem carregada.");
    return;
  }

  const format = formatSelect.value;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = currentImage.naturalWidth;
  canvas.height = currentImage.naturalHeight;
  ctx.drawImage(currentImage, 0, 0);

  const convertedData = canvas.toDataURL(format);

  preview.appendChild(createImage(convertedData));
});

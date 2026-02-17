const input = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const convertBtn = document.getElementById("convertBtn");
const formatSelect = document.getElementById("formatSelect");
let currentImage = null;
let convertedFormats = new Set();

function createImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.style.maxWidth = "200px";
  img.style.margin = "10px";
  return img;
}

input.addEventListener("change", () => {
  preview.innerHTML = "";
  convertedFormats.clear();
  const file = input.files[0];

  if (!file || !file.type.startsWith("image/")) {
    alert("Por favor, selecione apenas arquivos de imagem.");
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

  if (convertedFormats.has(format)) {
    alert(
      `A imagem já foi convertida para ${format.split("/")[1].toUpperCase()}.`,
    );
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = currentImage.naturalWidth;
  canvas.height = currentImage.naturalHeight;
  ctx.drawImage(currentImage, 0, 0);

  const convertedData = canvas.toDataURL(format);
  preview.appendChild(createImage(convertedData));

  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = `Baixar ${format.split("/")[1].toUpperCase()}`;
  downloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = convertedData;
    a.download = `imagem_convertida.${format.split("/")[1]}`;
    a.click();
  };
  preview.appendChild(downloadBtn);

  convertedFormats.add(format);
});

formatSelect.addEventListener("change", () => {
  if (!currentImage) return;
  preview.innerHTML = "";
  preview.appendChild(currentImage);
});

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth"
    });

    nav.classList.remove("active");
  });
});

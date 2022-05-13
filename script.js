"use strict";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const image1 = new Image();
image1.crossOrigin = "anonymous";
image1.src =
  "https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_960_720.jpg";

const inputSlider = document.getElementById("resolution");
const inputLabel = document.getElementById("resolutionLabel");
inputSlider.addEventListener("change", handleSlider);

class Cell {
  constructor(x, y, symbol, color) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillText(this.symbol, this.x, this.y);
  }
}

class AsciiEffect {
  #imageCellArray = [];
  #sysmbols = [];
  #pixels = [];
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.#ctx.drawImage(image1, 0, 0, this.#width, this.#height);
    this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
    console.log(this.#pixels);
  }

  #convertToSymbol(g) {
    if (g > 250) return "@";
    else if (g > 240) return "*";
    else if (g > 220) return "+";
    else if (g > 200) return "#";
    else if (g > 180) return "&";
    else if (g > 160) return "%";
    else if (g > 140) return "_";
    else if (g > 120) return ":";
    else if (g > 100) return "$";
    else if (g > 80) return "/";
    else if (g > 60) return "-";
    else if (g > 40) return "X";
    else if (g > 20) return "W";
    else return "";
  }

  #scanImage(cellSize) {
    this.#imageCellArray = [];
    for (let y = 0; y < this.#pixels.height; y += cellSize) {
      for (let x = 0; x < this.#pixels.width; x += cellSize) {
        const posX = x * 4;
        const posY = y * 4;
        const pos = posY * this.#pixels.width + posX;
        if (this.#pixels.data[pos + 3] > 128) {
          const red = this.#pixels.data[pos];
          const green = this.#pixels.data[pos + 1];
          const blue = this.#pixels.data[pos + 2];
          const total = red + green + blue;
          const avarageColorValue = total / 3;
          const color = `rgb(${red}, ${green}, ${blue})`;
          const symbol = this.#convertToSymbol(avarageColorValue);
          this.#imageCellArray.push(new Cell(x, y, symbol, color));
        }
      }
    }
  }
  #drawAscii() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    for (let i = 0; i < this.#imageCellArray.length; i++) {
      this.#imageCellArray[i].draw(this.#ctx);
    }
  }
  draw(cellSize) {
    this.#scanImage(cellSize);
    this.#drawAscii();
  }
}
let effect;

function handleSlider() {
  if (inputSlider.value == 1) {
    inputLabel.textContent = "Original image";
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
  } else {
    inputLabel.textContent = "Resolution: " + inputSlider.value + " px";
    effect.draw(parseInt(inputSlider.value));
  }
}

image1.onload = function initialize() {
  canvas.width = image1.width;
  canvas.height = image1.height;
  effect = new AsciiEffect(ctx, image1.width, image1.height);
  handleSlider();
};

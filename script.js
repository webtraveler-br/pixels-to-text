"use strict";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const image1 = new Image();
image1.crossOrigin = "anonymous";
image1.src =
  "https://cdn.pixabay.com/photo/2021/12/19/21/48/eurasian-pygmy-owl-6881984_960_720.jpg";

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
          if (total > 200)
            this.#imageCellArray.push(new cellSize(x, y, symbol, color));
        }
      }
    }
  }
}
let effect;

image1.onload = function initialize() {
  canvas.width = image1.width;
  canvas.height = image1.height;
  effect = new AsciiEffect(ctx, image1.width, image1.height);
};

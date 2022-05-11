"use strict";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const image1 = new Image();
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
  }
}
let effect;

image1.onload = function initialize() {
  canvas.width = image1.width;
  canvas.height = image1.height;
  effect = new AsciiEffect(ctx, image1.width, image1.height);
};

let result;
let sketchrunning=1;
let button;
let button1;
let piece;
let promptText;
var Anzahl=['100g', '1tsp', '2kg', '500g', '225ml', '0,5l','a pack', 'a pinch'];
var Zutaten=['milk','mushrooms', 'butter', 'lemon juice', 'tomatoes', 'spinach','water', 'beans'];
var Adjektiv=['soft', 'raw','white','thin','thick','rich','hot','slightly old'];
var Verb=['chop very fine', 'pour in', 'boil', 'blend','fill with', 'put in a kettle over the oven', 'bake','roll out'];
var Verb2=['boil', 'bake','fry','stew in broth','let cool down']
var Würze=['salt', 'pepper','red onions', 'curry powder','cheese','chilli','sage', 'spring onions'];
var Zustand=['crispy', 'creamy','tender', 'a good smell emerges', 'bubbles start to form','you get tired','it gets hot','done']
var Zusatz=['immediatly', 'with an alcoholic beverage of your choice', 'with a tall glass of milk', 'a big portion', 'with a soda', 'on wafers','with a nice salad','as cold as possible']
//setTimeout(stoprunning, 5000);
let state = 0;
let liquidPositions = [];
let foodPositions = [];

let textContent;
let textPosition;
let rowLenght;


let liquidColors = {
  "milk": {r: 255,g: 255,b: 255},
  "lemon": {r: 250,g: 255,b: 180},
  "water": {r: 215,g: 235,b: 235},
}

let foodColors = {
  "mushrooms": {r: 150,g: 115,b: 60},
  "butter": {r: 255,g: 250,b: 230},
  "tomatoes": {r: 230,g: 10,b: 20},
  "spinach": {r: 30,g: 115,b: 30},
  "beans": {r: 120,g: 50,b: 15},
  "salt": {r: 245,g: 245,b: 245},
  "pepper": {r: 45,g: 30,b: 25},
  "red": {r: 235,g: 170,b: 180},
  "curry": {r: 255,g: 160,b: 0},
  "cheese": {r: 240,g: 215,b: 115},
  "chilli": {r: 220,g: 45,b: 0},
  "sage": {r: 145,g: 170,b: 145},
  "spring": {r: 160,g: 205,b: 105},
}

function preload() {
  fontslim = loadFont('EuropaLight.otf');
  fontfat = loadFont('EuropaBold.otf')
  result = loadStrings('cookbook.txt');
}

function setup() {
  textAlign(CENTER);
  createCanvas(windowWidth,windowHeight);
  pixelDensity(1)
  fill(20);
  button=createButton('refuse');
  button1=createButton('choose a recipe');
  button1.position(windowWidth/2-button1.width/2,windowHeight-150);
  button.position(windowWidth/2-button1.width/2,windowHeight-90);
  button1.mousePressed(stoprunning);
  button.mousePressed(startrunning);
  button1.size(100,50);
  button.size(100,50);
  button1.style('background', color(0));
  button.style('background', color(0));
  button1.style('font-size', '15px')
  button.style('font-size', '15px')
  button1.style('color',color(230));
  button.style('color',color(230));
  frameRate(15);
  button.hide();
  rowLenght = width;
}

function draw() {
  if (state == 0) {
    if(sketchrunning==1){
      rand=floor(random(8));
      rand1=floor(random(8));
      rand2=floor(random(8));
      rand3=floor(random(8));
      rand4=floor(random(5));
      
      let resultA=join(result);
      piece=match(resultA, /\w[A-Z]\w{1,}/g);
      promptText = random(piece)+ ' ' + random(piece);
    }
    
    textAlign(CENTER);
    background(230);
    noStroke();
    textFont=fontfat;
    textStyle(BOLD);
    textSize(35);
    text("WHAT ARE YOU EATING?" + "\n" + "\n" ,20,50,windowWidth,windowHeight);
    textSize(35);
    text("do you accept or refuse the meal?", 20,100,windowWidth,windowHeight);
    textFont=fontslim;
    textStyle(NORMAL)
    textSize(20);
    //if(frameCount%40==0){
      text(promptText, windowWidth/2-300,170,600,windowHeight)
      textContent = 'Take '+ Anzahl[rand] +' of '+ Zutaten[rand] + ' and add '+ Anzahl[rand2]+' of '+ Adjektiv[rand] +' '+ Zutaten[rand2]+', mix them very well in a big bowl, '+ Verb[rand]+ ' some ' + Zutaten[rand3] + ' and '+ Anzahl[rand3] +' of '+ Würze[rand]+ '. Take the mixture and '+ Verb2[rand4] +' until ' + Zustand[rand] +'. Now serve and enjoy ' + Zusatz[rand]+ '!'
    textAlign(LEFT);
      text(textContent, windowWidth/2-300,210,600,windowHeight);
    //}
  }
  else if (state == 1) {
    loadPixels();

    for (let i = 0; i < foodPositions.length; i++) {
      Powder.spawnAtPosition(foodPositions[i].x, foodPositions[i].y, foodPositions[i].color)
    }

    for (let i = 0; i < liquidPositions.length; i++) {
      Liquid.spawnAtPosition(liquidPositions[i].x, liquidPositions[i].y, liquidPositions[i].color)
    }

    PixelGrain.update();
    updatePixels();
  }
}

function stoprunning(){
  if(sketchrunning==1){
    //noLoop();
    button.show();
    sketchrunning=0;
    button1.html("accept")
  } else if (sketchrunning == 0) {
    button.hide();
    button1.hide();
    getWordPositions();
    state = 1;
    frameRate(60);
  }
}  

function startrunning(){
  if(sketchrunning==0){
    //noLoop();
    sketchrunning=1;
    button.hide();
    button1.html("choose a recipe")
  }
}  

function getWordPositions() {
  let maxWidth = 600;
  let baseX = windowWidth/2-300;
  let currentX = baseX;
  let currentY = 210;

  textContent.split(" ").forEach(currentWord => {
    currentX += textWidth(currentWord + " ");
    if (currentX > baseX + maxWidth) {
      currentX = baseX + textWidth(currentWord + " ");
      currentY += 25;
    }

    for (const [key, value] of Object.entries(liquidColors)) {
      if (currentWord.includes(key)) {
        liquidPositions.push({x: Math.floor(currentX), y: currentY, color: value, name: key})
        liquidPositions.push({x: Math.floor(currentX - textWidth(currentWord) / 2), y: currentY, color: value, name: key})
        liquidPositions.push({x: Math.floor(currentX - textWidth(currentWord)), y: currentY, color: value, name: key})
      }
    }

    for (const [key, value] of Object.entries(foodColors)) {
      if (currentWord.includes(key)) {
        foodPositions.push({x: Math.floor(currentX), y: currentY, color: value, name: key})
        foodPositions.push({x: Math.floor(currentX - textWidth(currentWord) / 2), y: currentY, color: value, name: key})
        foodPositions.push({x: Math.floor(currentX - textWidth(currentWord)), y: currentY, color: value, name: key})
      }
    }
  })
}

class PixelGrain {
  static instances = [];
  static positions = [];

  static spawnAtPosition(x, y, color) {
    let pos = rowLenght * y + x;
    [
      pos + 1, pos -1, pos + 3, pos -3,
      pos + rowLenght, pos - rowLenght, pos + rowLenght * 3, pos - rowLenght * 3,
      pos + rowLenght + 2, pos + rowLenght - 2, pos - rowLenght + 2, pos - rowLenght - 2,
      pos + rowLenght * 2 + 1, pos + rowLenght * 2 - 1, pos - rowLenght * 2 + 1, pos - rowLenght * 2 - 1
    ].forEach(position => {
      if (random([true, false, false, false]) && PixelGrain.positions[pos] == null) new this(position, color)
    })
  }

  static update() {
    for (let i = 0; i < PixelGrain.instances.length; i++) {
      this.instances[i].update();
    }
  }

  static clear() {
    PixelGrain.instances = [];
    PixelGrain.positions = [];
  }
  
  pos;
  color;
  bias;
  type;

  constructor(pos, color) {
    this.pos = pos;
    this.bias = random([-1, 1]);
    this.color = color;
  }

  drawPixel() {
    pixels[this.pos * 4] = this.color.r;
    pixels[this.pos * 4 + 1] = this.color.g;
    pixels[this.pos * 4 + 2] = this.color.b;
    pixels[this.pos * 4 + 3] = 255;
  }

  clearPixel() {
    pixels[this.pos * 4] = 220;
    pixels[this.pos * 4 + 1] = 220;
    pixels[this.pos * 4 + 2] = 220;
    pixels[this.pos * 4 + 3] = 255;
  }
}

class Powder extends PixelGrain {
  constructor(pos, color) {
    super(pos, color)
    PixelGrain.positions[this.pos] = this;
    PixelGrain.instances.push(this);
    this.type = 0;
    this.drawPixel();
  }

  update() {
    if (this.pos * 4 > pixels.length - rowLenght * 4) return;

    if (this.bias < 0) {
      this.movePixel(rowLenght) || 
      this.movePixel(rowLenght + this.bias) || 
      this.movePixel(rowLenght - this.bias);
    } else {
      this.movePixel(rowLenght) || 
      this.movePixel(rowLenght + this.bias) || 
      this.movePixel(rowLenght - this.bias);
    }
  }

  movePixel = (nextIndex) => {
    if (PixelGrain.positions[this.pos + nextIndex] == null) {
      PixelGrain.positions[this.pos] = null;
      this.clearPixel();
      this.pos += nextIndex;
      this.drawPixel();
      PixelGrain.positions[this.pos] = this;
    } else if(PixelGrain.positions[this.pos + nextIndex].type == 1) {
      PixelGrain.positions[this.pos] = null;
      this.clearPixel();
      PixelGrain.positions[this.pos + nextIndex].movePixel(-rowLenght + this.bias) ||
      PixelGrain.positions[this.pos + nextIndex].movePixel(-rowLenght - this.bias) ||
      PixelGrain.positions[this.pos + nextIndex].movePixel(-rowLenght);
      this.pos += nextIndex;
      this.drawPixel();
      PixelGrain.positions[this.pos] = this;
    } else return false;
    return true;
  }
}

class Liquid extends PixelGrain {
  constructor(pos, color) {
    super(pos, color)
    PixelGrain.positions[this.pos] = this;
    PixelGrain.instances.push(this);
    this.type = 1;
    this.drawPixel();
  }

  update() {
    if (this.pos * 4 > pixels.length - rowLenght * 4) return;

    if (this.bias < 0) {
      this.movePixel(rowLenght) || 
      this.movePixel(rowLenght + this.bias) || 
      this.movePixel(rowLenght - this.bias) ||
      this.movePixel(this.bias) ||
      this.movePixel(-this.bias);
    } else {
      this.movePixel(rowLenght) || 
      this.movePixel(rowLenght + this.bias) || 
      this.movePixel(rowLenght - this.bias) ||
      this.movePixel(this.bias) ||
      this.movePixel(-this.bias);
    }
  }

  movePixel = (nextIndex) => {
    if (PixelGrain.positions[this.pos + nextIndex] == null) {
      PixelGrain.positions[this.pos] = null;
      this.clearPixel();
      this.pos += nextIndex;
      this.drawPixel();
      PixelGrain.positions[this.pos] = this;
    } else return false;
    return true;
  }
}
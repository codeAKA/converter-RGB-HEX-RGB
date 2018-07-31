// --- BUTTONS ---
var changeBtn = document.querySelector(".btn.invert");
var convBtn = document.querySelector(".btn.change");
var refBtn = document.querySelector(".btn.ref");
var container = document.querySelector("#container");

// --- EVENTS --- 
window.onload = resetInputs();
refBtn.addEventListener("click", resetInputs);
changeBtn.addEventListener("click", changeUnits);
convBtn.addEventListener("click", convertUnits);

// --- INPUTS ---
var rgbElements = document.querySelectorAll('.color.rgb');
var hexElement = document.querySelector('.color.hex');
var pickedElement = document.querySelector('.picked.col');

// --- INPUT RESET ---
function resetInputs() {
  
  var inp = document.querySelectorAll(".color");
  
  for(var i = 0; i < inp.length; i++) {
    
    inp[i].value = "";
    
  }
}

// --- choice INPUT: --- RGB or HEX ---

function changeUnits() { 
  
  container.classList.toggle("rev");
  
}

// --- change CALC FUNCTION: ---RGB or HEX---

function convertUnits() {
  
  if(container.classList.contains("rev")) {
    
    hexStringToRGB();
    
  } else {
    
    rgbInput();
  
  }
  changePickedInput();
}


// --- CALC SECTION ---

// --- CALC: --- RGB to HEX

function rgbInput() {
  
  var hex = "";
  
  for (var i = 0; i < rgbElements.length; i++) {
    
    hex += rgbColor(rgbElements[i].value);
    
  }
  
  hexElement.value = hex;
  
}

// --- add COLOR ---

function changePickedInput() {
  var hex = "#";
  
  for (var i = 0; i < rgbElements.length; i++) {
    
    hex += rgbColor(rgbElements[i].value);
    
  }
  
  pickedElement.style.background = hex;
}
// --- add COLOR ---
function rgbColor(color) {
  
  var hexa = "";
  var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  var main = 0;
  var rest = 0;
  var sixteens;
  var units;
  
  if (color < 16) {
    if (digits[color] === undefined) {
      digits[color] = "0";
    }
    hexa = "0" + digits[color];
    
  } else if (color >= 255) {
    
    hexa = "FF";
    
  } else  if (color === 16) {
   
    hexa = "10";
    
  } else {
  
    main = Math.floor(color / 16);
    sixteens = digits[main];
    rest = color - main * 16;
    units = digits[rest];
    hexa = sixteens + units;
  }
  return hexa;
  
}


// --- CALC: --- HEX to RGB ---


function hexStringToRGB() {
  
  var hexVal = hexElement.value;
  var hexArr = [];
  
  if (hexVal[0] === "#") {
    
    hexVal = hexVal.slice(1, hexVal.length);
    
  }
  
  hexVal = hexVal.toUpperCase();
  
  for (var i = 0; i < hexVal.length; i ++) {
    
    hexArr[i] = hexVal.slice(i, i + 2);
    
    if (i % 2 !== 0) {
      
      hexArr.splice(i, 1);
      
    }
    
  }
  
  hexArr = hexArr.filter(Boolean);
  
  for (var j = 0; j < hexArr.length; j++) {
    
    hexArr[j] = rgbPart(hexArr[j]);
    
    rgbElements[j].value = hexArr[j];
    
  }
  
}

function rgbPart(color) {
  
  var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  var decimal = color[0];
  var units = color[1];
  var colorDec, colorUni, hexa;
  
  for (var i = 0; i < digits.length; i++) {
    
    if (digits[i] === decimal) {
      
      colorDec = i * 16;
      
    }
    
    if (digits[i] === units) {
      
      colorUni = i;
      
    }
    
  }
  
  hexa = colorDec + colorUni;
  
  return hexa;
  
}

// console.log(rgbPart("D0"))

//console.log(hexStringToRGB("#FF01A5"))




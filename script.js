var canvas = document.querySelector("#mycanvas");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;
var textCanvas = "";
var dialogs = [];
dialogs["accusé"] = "Ceci représente les dernières paroles d'un accusé. Je ne suis qu'un homme qui se trouvait au mauvais endroit au mauvais moment.";
dialogs["murderer"] = "I murdered that girl, and I enjoyed it. Who are you to judge me ? You are all sick, you're just too big cowards to admit it."
draw();
writeText(dialogs["murderer"]);
function draw() {
  clearCanvas();
  ctx.font = "20px Georgia";
  ctx.fillStyle = "#FFFFFF";
  let lines = textCanvas.split('\n');
  for (let i = 0; i < lines.length; i++) {
	  const line = lines[i];
	  ctx.fillText(line, 10, 30*(i+1));
  }
  requestAnimationFrame(draw);
}

function clearCanvas() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

async function writeText(text) {
  textCanvas = "";
  let charArray = text.split("");
  let time = 0;
  let goToNextLine = false;
  for (let i = 0; i < charArray.length; i++) {
	let char = charArray[i];
	if(textCanvas.length % 40 == 0 && textCanvas.length >= 40 || char == "\n"){
		goToNextLine = true;
	}
	if(goToNextLine && char == " "){
		textCanvas += "\n"
		char = "";
		goToNextLine = false;
	}
	textCanvas += await writeAfterXTime(char, time);
	time = timeBasedOnChar(char);
  }
}

function writeAfterXTime(text, xTime) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(text);
    }, xTime);
  });
}

function isPunctuation(char){
	return [".", ",","?","!"].includes(char);
}

function timeBasedOnChar(char){
	let time = 0;
    switch (char) {
		case " ":
		  time = 50;
		  break;
		case ".": case "?": case "!":
		  time = 500;
		  break;
		case ",":
		  time = 400;
		  break;
		default:
		  time = 30;
		  break;
	  }
	  return time;
}
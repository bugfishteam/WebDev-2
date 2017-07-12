

// var colors = [
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)"
// 	]
var numSquares = 6;
var colors = [];  //generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
// var pickedColor = colors[3];  //For starters picks a color from array
var pickedColor;  // = pickColor();
var colorDisplay = document.getElementById("colorDisplay");  //Grabs span by ID, feeds back assignment
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
// var easyBtn = document.querySelector("#easy");
// var hardBtn = document.querySelector("#hard");
var modeButtons = document.querySelectorAll(".mode");


init();  //Init function runs on page refresh

//colorDisplay.textContent = pickedColor;  //For starters assigns span to picked color

// for(var i = 0; i < squares.length; i++) {
// 	//Initial colors per array for all squares
// 	squares[i].style.backgroundColor = colors[i];
// 	//Click listener
// 	squares[i].addEventListener("click", function() {
// 		// alert("Clicked a square");
// 		//Grab color of clicked square
// 		var clickedColor = this.style.backgroundColor;
// 		//Compare grabbed and correct color
// 		if(clickedColor === pickedColor) {
// 			// alert("Correct");
// 			messageDisplay.textContent = "Correct";
// 			resetButton.textContent = "Play again?";
// 			changeColors(clickedColor);  //Runs the changeColors function below
// 			h1.style.backgroundColor = clickedColor;
// 		} else {
// 			// alert("Try again");
// 			this.style.backgroundColor = "#232323";
// 			messageDisplay.textContent = "Try again";
// 		}
// 	});
// }

// easyBtn.addEventListener("click", function(){
// 	// alert("Easy");
// 	easyBtn.classList.add("selected");
// 	hardBtn.classList.remove("selected");
// 	//Clicking makes new colors (to avoid deleting a potential winner)
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i = 0; i < squares.length; i++){
// 		if(colors[i]){  //Only loops as many colors.length
// 			squares[i].style.backgroundColor = colors[i];
// 		} else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// });

// hardBtn.addEventListener("click", function(){
// 	// alert("Hard");
// 	easyBtn.classList.remove("selected");
// 	hardBtn.classList.add("selected");
// 	//Similarly generates new colors
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i = 0; i < squares.length; i++){
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = "block";
// 	}
// });

resetButton.addEventListener("click", function(){
	// // alert("Reset");
	// //Generate new colors
	// colors = generateRandomColors(numSquares);
	// //Pick new random color
	// pickedColor = pickColor();
	// //Change colorDisplay to match pickedColor
	// colorDisplay.textContent = pickedColor;
	// //Change colors of squares
	// for(var i = 0; i < squares.length; i++){
	// 	squares[i].style.backgroundColor = colors[i];
	// }
	// h1.style.backgroundColor = "steelblue";
	// messageDisplay.textContent = "";
	// this.textContent = "New Colors";
	reset();
});


function init(){  //Can refactor by putting individual blocks below in different functions
	//Mode buttons event listeners
	//Creates a button array and adds listener to each element via loop
	for(var i = 0; i < modeButtons.length; i++){  //Be able to setup n difficulty levels with this code
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//Figure out # sqaures
			if(this.textContent === "Easy"){
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			//Alternatively ternary operator
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}

	for(var i = 0; i < squares.length; i++) {
		//Initial colors per array for all squares
		// squares[i].style.backgroundColor = colors[i];
		//Click listener
		squares[i].addEventListener("click", function() {
			// alert("Clicked a square");
			//Grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//Compare grabbed and correct color
			if(clickedColor === pickedColor) {
				// alert("Correct");
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play again?";
				changeColors(clickedColor);  //Runs the changeColors function below
				h1.style.backgroundColor = clickedColor;
			} else {
				// alert("Try again");
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again";
			}
		});
	}

	reset();
}

function reset(){
	//Pick new colors
	colors = generateRandomColors(numSquares);
	//Pick new winning color
	pickedColor = pickColor();
	//Update page to reflect changes
	colorDisplay.textContent = pickedColor;
	//Change 
	for(var i = 0; i < squares.length; i++){  //Difference between squares[] and colors[]
		if(colors[i]){
			squares[i].style.display = "block";  //Makes all squares visible in case click hardBtn
			squares[i].style.backgroundColor = colors[i];
		} else {  //This part hides squares without colors if easyBtn pressed
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";  //Swtiched to var since no listener
}

function changeColors(color){  //Sets square array colors, and rewrites the correct one
							   //Remember, for loop above sets all square colors per array
	//Loop through all squares
	for(var i = 0; i < colors.length; i++){
		//Change each color to match the given
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	//Pick random number, access color in array
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//Make array
	var arr = [];
	//Add num random colors to it
	for(i = 0; i < num; i++){
		//Get random color, push into array
		arr.push(randomColor());
	}
	//Return array
	return arr;
}

function randomColor(){
	//Pick a red from 0 - 255
	var r = Math.floor(Math.random() * 256)  //Follows MDN advice, basically max - min + min to get in interval
									 //Math.floor ensures uniform dist. (vs. 50% chance on ends w/ rounding)
	//Pick a green
	var g = Math.floor(Math.random() * 256)
	//Pick a blue
	var b = Math.floor(Math.random() * 256)
	//"rgb(r, g, b)";
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

$(document).ready(function() {

	var wins = 0;
	var guessesLeft = '';
	var lettersGuessed = '';
	var lettersMissed = '';
	var secretBro = '';
	var secretBroLetters = '';
	var keypresses = 0;
	var matches = 0;

	var bros = {
		broName : ['Pikachu', 'Samus', 'Mario'],
		broSong : ['iYyDbVUWgTI', 'Ky-eaH9C1l0', '8QLGlbJA7C0'],
		broImage : ['assets/images/Pikachu.png', 'assets/images/samus.png', 'assets/images/mario.png'],
		broTagline : ['Pika!', 'Try me!', 'Ohhhh. Mamma Mia!']
// broName : ['Pikachu', 'Samus', 'Mario', 'Luigi', 'Jigglypuff', 'Yoshi', 'Kirby', 'Mewtwo', 'Ganondorf', 'Zelda'],	
// //values are URL endings for Youtube links.
// broSong : ['iYyDbVUWgTI', 'Ky-eaH9C1l0', '8QLGlbJA7C0', 'EfVP9iWgbZ4', '4tQSIaGFdRg', 'nghTrcPBp3s', '3CS93CdMv_E', 'Plw8glq02V0', 'gmL3xSeAmsw', 'cGufy1PAeTU'],
//  broImage : ['assets/images/Pikachu.png', 'Charizard', 'Greninja', 'Jirachi', 'Keldeo', 'Lucario', 'Pikachu', 'Reshiram', 'Shaymin', 'Zygarde'],
//   broTagline : ['Arceus', 'Charizard', 'Greninja', 'Jirachi', 'Keldeo', 'Lucario', 'Pikachu', 'Reshiram', 'Shaymin', 'Zygarde']
};
function randomBro () {
	secretBro = bros.broName[Math.floor(Math.random() * bros.broName.length)];
	secretBroLetters = secretBro.toLowerCase();
}
function resetBoard () {
	guessesLeft = 13;
	$('.guesses-left').html(guessesLeft);
	matches = 0;
	lettersGuessed = '';
	lettersMissed = '';
	$('.your-guesses').empty();

	randomBro();	
	changeImage();
	changeTagline();
// playSong();

displayGameboard();
console.log("The board is reset!");
}
function changeImage() {
	var index = bros.broName.indexOf(secretBro);
	$("#bro-image").attr("src",bros.broImage[index]);
}
function changeTagline() {
	var index = bros.broName.indexOf(secretBro);
	$(".tagline").html(bros.broTagline[index]);
}
function displayGameboard () {
	$(".gameboard").empty();
	for (var i = 0; i < secretBro.length; i++) {
		$(".gameboard").append("<div class=" + i + "></div>");
	}
	$(".hyphens").empty();
	for (var i = 0; i < secretBro.length; i++) {
		$(".hyphens").append("<div>-</div>");
	}
}

//Setting initial gameboard
$('.wins').html(wins);
$('.guesses-left').html('13');
// $('.your-guesses').html('');
console.log("Hi there buddy!");

//Start Game on key press - runs only once
$('body').one("keyup", function() {
	resetBoard();
	keypresses++

});
//Subsequent key presses play the game
$('body').on("keyup", function() {
	console.log(keypresses)
	if (keypresses > 0) {

		var letter = String.fromCharCode(event.which).toLowerCase();
		console.log(letter)
		var chars = "abcdefghijklmnopqrstuvwxyz";
		var letterPressed = chars.includes(letter);
		var letterRepeated = lettersGuessed.includes(letter);
		var letterInSecret = secretBroLetters.includes(letter);
		
		//When user hits an alphabet letter not repeated
		if (letterPressed && !letterRepeated) {

			// When user hits a letter contained in the secret word
			if (letterInSecret) {

				for (var i = 0; i < secretBroLetters.length; i++) {

					if (letter === secretBroLetters.charAt(i)) {
						// $( "input[id][name$='man']" ).val( "only this one" );\
						$(".gameboard ." + i).html(letter.toUpperCase())

						// Important to set global variables using equal sign for global methods
						// matchedLetters = matchedLetters.append(letter)
						secretBroLetters = secretBroLetters.replace(letter, "*")
						console.log('secretBroLetters= ' + secretBroLetters)
						lettersGuessed += letter
						matches++
						console.log(matches)
						console.log('lettersGuessed= ' +lettersGuessed)

					}

				}
				//Check for win condition
				if (matches === secretBroLetters.length) {
					wins++
					$('.wins').html(wins);
					resetBoard();
				}

			} else if (!letterInSecret && guessesLeft > 1) {	// When user hits a wrong letter

				//Process incorrect guess
				guessesLeft--;
				$('.guesses-left').html(guessesLeft);
				lettersGuessed += letter
				lettersMissed += letter
				console.log('lettersMissed= ' + lettersMissed)
				$('.your-guesses').html(lettersMissed.toUpperCase().split('').join(' '));

			} else if (!letterInSecret && guessesLeft === 1) { //Check for loss condition
				resetBoard();
			}
		};  
	};
});

//document ready
});	

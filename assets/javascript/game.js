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
		
		broName : ['Pikachu', 'Samus', 'Mario', 'Luigi', 'Bowser', 'Yoshi', 'Kirby', 'Falco', 'Ganondorf', 'Zelda'],	
		//values are URL endings for Youtube links.
		broSong : ['https://www.youtube.com/watch?v=iYyDbVUWgTI', 
					'https://www.youtube.com/watch?v=6gWyfQFdMJA', 
					'https://www.youtube.com/watch?v=8QLGlbJA7C0', 
					'https://www.youtube.com/watch?v=wjdgxK44ctQ', 
					'https://www.youtube.com/watch?v=ajY2Ee70vNw', 
					'https://www.youtube.com/watch?v=nghTrcPBp3s', 
					'https://www.youtube.com/watch?v=3CS93CdMv_E', 
					'https://www.youtube.com/watch?v=LpW3DvP-Qe4', 
					'https://www.youtube.com/watch?v=gmL3xSeAmsw', 
					'https://www.youtube.com/watch?v=cGufy1PAeTU'],
		broSongName : ['Pikachu Song', 
						'Metroid: Samus Returns OST - Theme of Samus', 
						'Super Mario World - Overworld Theme (GFM Trap Remix)', 
						'Luigi\'s Mansion Theme - Super Smash Bros. Brawl', 
						'Super Mario BOWSER\'S CASTLE (Trap Remix)', 
						'Yoshi\'s Story: Theme', 
						'Kirby dream land theme song', 
						'Super Smash Bros. for Wii U Character Theme Falco', 
						'Final Battle Against Ganon - The Legend of Zelda: Ocarina of Time', 
						'Zelda Main Theme Song'],
		broImage : ['assets/images/Pikachu.png', 
								'assets/images/samus.png', 
								'assets/images/mario.png', 
								'assets/images/luigi.png', 
								'assets/images/bowser.png', 
								'assets/images/yoshi.png', 
								'assets/images/kirby.png', 
								'assets/images/falco.png', 
								'assets/images/ganondorf.png', 
								'assets/images/zelda.png'],
		broTagline : ['Pika!', 
						'Try me!', 
						'Ohhhh. Mamma Mia!', 
						'Okey Dokey!', 
						'Bwah hah hah!', 
						'T. Yoshisaur Munchakoopas', 
						'Right Back at Ya!', 
						'Gee, I\'ve been saved by Fox. How swell.', 
						'Pathetic little fool!', 
						'We must win! The fate of Hyrule depends on it!']

	};
	function randomBro () {
		secretBro = bros.broName[Math.floor(Math.random() * bros.broName.length)].toLowerCase();
		secretBroLetters = secretBro.toLowerCase();
	}
	function resetBoard () {
		guessesLeft = 13;
		$('.guesses-left').html(guessesLeft);
		matches = 0;
		lettersGuessed = '';
		lettersMissed = '';
		$('.your-guesses').empty();
    addKeypressEvent()
		randomBro();
		displayGameboard();
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
			var gameboard =$('<div class=' + i + '></div>')
			$(".gameboard").append(gameboard);
		}
		$(".hyphens").empty();
		for (var i = 0; i < secretBro.length; i++) {
			$(".hyphens").append("<div>-</div>");
		}
	}
	// function playSong() {
	// 	var source = "http://downloads.khinsider.com/game-soundtracks/album/super-mario-bros/01%2520-%2520Super%2520Mario%2520Bros.mp3";
	// 	var audio = new Audio(); 
	// 	audio.src = source;
	// 	// audio.crossOrigin="anonymous"
	// 	audio.autoplay = true; // add this
	// 	audio.play();
	// }
	// function showSongTitle() {
	// 	var index = bros.broName.indexOf(secretBro);
	// 	var song = bros.broSongName[index];
	// 	$(".songtitle").html(song);
	// }

	// Main Program

	//Setting initial gameboard
	$('.wins').html(wins);
	$('.guesses-left').html('13');

	//Start Game on key press - runs only once
	$('body').one("keyup", function() {
		resetBoard();
		keypresses++
	});

	//Subsequent key presses play the game
	function addKeypressEvent() {
		$('body').on("keyup", function() {

			var letter = String.fromCharCode(event.which).toLowerCase();
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
							lettersGuessed += letter
							matches++

						}

					}
					//Check for win condition
					if (matches === secretBroLetters.length) {
						matches++
						wins++
						$('.wins').html(wins);
						$('body').off("keyup")
						changeImage();
						changeTagline();
						// playSong();
						// showSongTitle();
						$(".gameboard ." + i).html(letter.toUpperCase())
						setTimeout(function(){ 
							resetBoard(); 
						}, 5000);
						
					}

				} else if (!letterInSecret && guessesLeft > 1) {	// When user hits a wrong letter

					//Process incorrect guess
					guessesLeft--;
					$('.guesses-left').html(guessesLeft);
					lettersGuessed += letter
					lettersMissed += letter
					$('.your-guesses').html(lettersMissed.toUpperCase().split('').join(' '));

				} else if (!letterInSecret && guessesLeft === 1) { //Check for loss condition
					$('body').off("keyup")
					changeImage();
					changeTagline();
					// playSong();
					// showSongTitle();
					resetBoard();
				}
			};  
		});
	}

	//document ready
});	

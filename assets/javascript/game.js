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
								'assets/images/mewtwo.png', 
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
			$(".gameboard").append("<div class=" + i + "></div>");
		}
		$(".hyphens").empty();
		for (var i = 0; i < secretBro.length; i++) {
			$(".hyphens").append("<div>-</div>");
		}
	}
	function playSong() {
		// var index = bros.broName.indexOf(secretBro);
		// var audio = new Audio("raven.mp3");
		// audio.play();
		var index = bros.broName.indexOf(secretBro);
		$("iframe#ytplayer").attr("src", broSong[index])
		$("iframe#ytplayer").attr("src", $("iframe#ytplayer").attr("src").add("autoplay=1"));
		// $("iframe#ytplayer").attr("src", $("iframe#ytplayer").attr("src").replace("autoplay=0", "autoplay=1"));
	}
	function showSongTitle() {
		var index = bros.broName.indexOf(secretBro);
		var song = bros.broSongName[index];
		$(".songtitle").html(song);
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
						changeImage();
						changeTagline();
						playSong();
						showSongTitle();
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
					changeImage();
					changeTagline();
					playSong();
					showSongTitle();
					resetBoard();
				}
			};  
		};
	});

	//document ready
});	

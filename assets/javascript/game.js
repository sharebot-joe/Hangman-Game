
var randomLetter = '';
var wins = 0;
var losses = 0;
var guessesLeft = 9;

$(document).ready(function() {

	//Board Setup
	$('.wins').append(wins);
	$('.losses').append(losses);
	$('.guesses-left').append(guessesLeft);
	$('.random-letter').append(randomLetter);

	pickRandomLetter();

  	function pickRandomLetter() {
		var chars = "abcdefghiklmnopqrstuvwxyz";
		var rnum = Math.floor(Math.random() * chars.length);
		randomLetter = chars[rnum];

		// Toggle displaying random letter
		// $('.random-letter').html(randomLetter);   

	}
	function updateLoss() {
		losses++
		guessesLeft = 9
		$('.losses').html(losses);
		$('.guesses-left').html(guessesLeft);
		$('.your-guesses').empty();
		pickRandomLetter()
	}
	function updateWin() {
		wins++;
		guessesLeft = 9
		$('.wins').html(wins);
		$('.guesses-left').html(guessesLeft);
		$('.your-guesses').html('');
		pickRandomLetter()
	}
	//Key Press Event Listener
	document.onkeyup = function(event) {

    // Captures the key press, converts it to lowercase, and saves it to a variable.
    	var letter = String.fromCharCode(event.which).toLowerCase();

    	if (letter === randomLetter) {
    		updateWin()
    	} else {
    		if (guessesLeft > 1) {
				guessesLeft--;
				$('.guesses-left').html(guessesLeft);
				$('.your-guesses').append(letter + '\ ');
    		} else  {
    			updateLoss()
			}
    	}
    };

});	

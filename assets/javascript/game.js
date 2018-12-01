$(document).ready(function() {

  var wins = 0;
  var guessesLeft = '';
  var lettersGuessed = '';
  var secretBro = '';
  var secretBroLetters = '';
  var matchedLetters = 0;
  var bros = {
    broName: ['Pikachu', 'Samus', 'Mario', 'Luigi', 'Bowser', 'Yoshi', 'Kirby', 'Falco', 'Ganondorf', 'Zelda'],
    //values are URL endings for Youtube links.
    broSong: ['https://www.youtube.com/watch?v=iYyDbVUWgTI',
      'https://www.youtube.com/watch?v=6gWyfQFdMJA',
      'https://www.youtube.com/watch?v=8QLGlbJA7C0',
      'https://www.youtube.com/watch?v=wjdgxK44ctQ',
      'https://www.youtube.com/watch?v=ajY2Ee70vNw',
      'https://www.youtube.com/watch?v=nghTrcPBp3s',
      'https://www.youtube.com/watch?v=3CS93CdMv_E',
      'https://www.youtube.com/watch?v=LpW3DvP-Qe4',
      'https://www.youtube.com/watch?v=gmL3xSeAmsw',
      'https://www.youtube.com/watch?v=cGufy1PAeTU'
    ],
    broSongName: ['Pikachu Song',
      'Metroid: Samus Returns OST - Theme of Samus',
      'Super Mario World - Overworld Theme (GFM Trap Remix)',
      'Luigi\'s Mansion Theme - Super Smash Bros. Brawl',
      'Super Mario BOWSER\'S CASTLE (Trap Remix)',
      'Yoshi\'s Story: Theme',
      'Kirby dream land theme song',
      'Super Smash Bros. for Wii U Character Theme Falco',
      'Final Battle Against Ganon - The Legend of Zelda: Ocarina of Time',
      'Zelda Main Theme Song'
    ],
    broImage: ['assets/images/Pikachu.png',
      'assets/images/samus.png',
      'assets/images/mario.png',
      'assets/images/luigi.png',
      'assets/images/bowser.png',
      'assets/images/yoshi.png',
      'assets/images/kirby.png',
      'assets/images/falco.png',
      'assets/images/ganondorf.png',
      'assets/images/zelda.png'
    ],
    broTagline: ['Pika!',
      'Try me!',
      'Ohhhh. Mamma Mia!',
      'Okey Dokey!',
      'Bwah hah hah!',
      'T. Yoshisaur Munchakoopas',
      'Right Back at Ya!',
      'Gee, I\'ve been saved by Fox. How swell.',
      'Pathetic little fool!',
      'We must win! The fate of Hyrule depends on it!'
    ]
  };

  function randomBro() {
    secretBro = bros.broName[Math.floor(Math.random() * bros.broName.length)];
    secretBroLetters = secretBro.toLowerCase();
    secretBroIndex = bros.broName.indexOf(secretBro);
  }

  function changeImage() {
    $(".bro-image").attr("src", bros.broImage[secretBroIndex]);
  }

  function changeTagline() {
    $(".tagline").html(bros.broTagline[secretBroIndex]);
  }

  function resetGame() {
    $(document).one("keyup", function() {
      lettersGuessed = '';
      $('#letters-guessed .data').empty();
      //Setting initial gameboard
      $('#wins .data').html(wins);
      $(".bro-image").attr("src", "assets/images/questionmarkicon.png");
      $(".tagline").html("");
      randomBro();
      $('.user-prompt').html('Guess the secret word!');
      startGame();
    });
  }
  function initializeGameboard() {
    $(".gameboard").empty();
    for (var i = 0; i < secretBro.length; i++) {
    $(".gameboard").append($('<div class=' + i + '>-</div>'));
    }
  }

  function startGame() {
    guessesLeft = 10;
    $('#guesses-left .data').html(guessesLeft);
    initializeGameboard();
    // key press begins the game
    setTimeout(function() {
		  $(document).keyup(keyUpFunc);
		}, 600);
  }

  function keyUpFunc(event) {
    var inp = String.fromCharCode(event.which).toLowerCase();

    // Check if input is a letter
    if (/[a-z]/.test(inp)) {

      // Check if inputted letter has been previously guessed
      if (!lettersGuessed.includes(inp)) {
        lettersGuessed += inp

        // Check if inputted letter is in secret word
        if (secretBroLetters.includes(inp)) {

          // Loop through secret word
          for (var i = 0; i < secretBroLetters.length; i++) {
            if (inp === secretBroLetters.charAt(i)) {
              $(".gameboard ." + i).html(inp.toUpperCase())
              matchedLetters++
            }
          }
          //Check for win condition
          if (matchedLetters === secretBroLetters.length) {
            matchedLetters = 0;
            wins++
            $('#wins .data').html(wins);
            $('.user-prompt').html(`You won! You guessed ${secretBro}!` + '<br>Press any key to play again!').css('display', 'none');
            $('.user-prompt').show("bounce", {
              times: 2
            }, 300);
            $(document).unbind("keyup", keyUpFunc);
            changeImage();
            changeTagline();
            setTimeout(function() {
						  resetGame();
						}, 4000);
            return
          }
          $('.user-prompt').html('Yes!').css('display', 'none');
          $('.user-prompt').show("bounce", {
            times: 2
          }, 300);
        } else {
          guessesLeft--;
          $('#guesses-left .data').html(guessesLeft);
          $('#letters-guessed .data').html(lettersGuessed.toUpperCase().split('').join(' '));

          // Check for end game condition
          if (guessesLeft < 1) {
            matchedLetters = 0;
            $(document).unbind("keyup", keyUpFunc);
            $('.user-prompt').html(`You lost!  The correct answer was ${secretBro}.` + '<br>Press any key to play again!').css('display', 'none');
            $('.user-prompt').show("bounce", {
              times: 2
            }, 300);
            changeImage();
            changeTagline();
            setTimeout(function() {
						  resetGame();
						}, 4000);
            return
          }

          $('.user-prompt').html('Sorry, guess again!').css('display', 'none');
          $('.user-prompt').show("shake", {
            times: 2
          }, 300);
        }
      }
    }
  }
  resetGame()
});
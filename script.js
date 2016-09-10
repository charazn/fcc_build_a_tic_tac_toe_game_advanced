$(document).ready(function() {
  var a, t, player_symbol, computer_symbol, turn, computer_first_choices, computer_choice, player_choice, computer_choice_id, player_choice_id;
  var avail_boxes = [1,2,3,4,5,6,7,8,9];
  var computer_selected = [];
  var player_selected = [];
  var winning_condition = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]; // Only 8 winning possibilities
  var check_win_computer;
  var winning_lines_computer = [];
  var check_win_player;
  var winning_lines_player = [];

  function computer_turn() {
    $('#announcement').text('Computer'+"'"+'s turn');
    if (turn === 'computer') {
      if (computer_selected.length < 6) {
        if (avail_boxes.length === 1) {
          computer_choice = avail_boxes[0];
        } else {
          if (computer_selected.length === 0) {
            computer_first_choices = [1, 3, 5, 7, 9];
            computer_choice = computer_first_choices[Math.floor(Math.random() * computer_first_choices.length)];
          }
          if (computer_selected[0] === 5) { // Computer and player have both made a first move
            runLogicCenter();
          } else {
            runLogicCorner();
          }
        }

        return_computer_choice_id();

        $('#'+computer_choice_id).text(computer_symbol);
        $('#'+computer_choice_id).off('click');
        $('#'+computer_choice_id).css('cursor', 'not-allowed');
        avail_boxes.splice(avail_boxes.indexOf(computer_choice), 1);
        computer_selected.push(computer_choice);

        check_against_winning_condition('computer');
        check_if_win('computer');
      }
    }
  }

  $('#cross').click(function() {
    $('#choice_symbol').text('Your symbol');
    $('#cross').css({'background-color': 'green', 'color': 'white'});
    $('#cross').off('click');
    $('#cross').css('cursor', 'default');
    $('#circle').hide();
    $('#circle').off('click');
    $('#or').hide();
    $('td').css('cursor', 'pointer');
    player_symbol = 'X';
    computer_symbol = 'O';
    $('#announcement').css('visibility', 'visible');
    turn = 'computer';
    t = setTimeout(computer_turn, 1000);
  });

  $('#circle').click(function() {
    $('#circle').css({'background-color': 'green', 'color': 'white'});
    $('#circle').off('click');
    $('#circle').css('cursor', 'default');
    $('#cross').hide();
    $('#cross').off('click');
    $('#or').hide();
    $('td').css('cursor', 'pointer');
    player_symbol = 'O';
    computer_symbol = 'X';
    $('#announcement').css('visibility', 'visible');
    turn = 'computer';
    t = setTimeout(computer_turn, 1000);
  });

  $('#reset').click(function() {
    location.reload();
  });

  $('#corner1, #edge1, #corner2, #edge2, #center, #edge3, #corner3, #edge4, #corner4').click(function(){
    if (!player_symbol) {
      $('#choice_symbol').css('color', 'orange');
    }
    if (turn === 'player') {
      $(this).text(player_symbol);
      player_choice_id = this.id;

      return_player_choice();

      $('#'+player_choice_id).off('click');
      $('#'+player_choice_id).css('cursor', 'not-allowed');
      player_selected.push(player_choice);
      avail_boxes.splice(avail_boxes.indexOf(player_choice), 1);

      check_against_winning_condition('player');
      check_if_win('player');
    }
  });

  function check_against_winning_condition(gamer) {
    for (i = 0; i < winning_condition.length; i++) {
      for (j = 0; j < winning_condition[i].length; j++) {
        if (gamer === 'computer') {
          check_win_computer = winning_condition[i].every(function(elem) {
            return computer_selected.includes(elem);
          });
          if (check_win_computer) {
            winning_lines_computer.push(winning_condition[i]);
          }
        } else {
          check_win_player = winning_condition[i].every(function(elem) {
            return player_selected.includes(elem);
          });
          if (check_win_player) {
            winning_lines_player.push(winning_condition[i]);
          }
        }
      }
    }
  }

  function check_if_win(gamer) {
    if (gamer === 'computer') {
      if (winning_lines_computer.length !== 0) {
        $('#announcement').text('The computer wins!');
        $('#reset').text('PLAY AGAIN?');
        $('td').off('click');
        $('td').css('cursor', 'not-allowed');
      } else {
        if (avail_boxes.length === 0) {
          $('#announcement').text('It'+"'"+'s a draw!');
          $('#reset').text('PLAY AGAIN?');
        } else {
          turn = 'player';
          a = setTimeout(function(){
            $('#announcement').text('Your turn');
          }, 1000);
        }
      }
    } else {
      if (winning_lines_player.length !== 0) {
        $('#announcement').text('You win!');
        $('#reset').text('PLAY AGAIN?');
        $('td').off('click');
        $('td').css('cursor', 'not-allowed');
      } else {
        turn = 'computer';
        t = setTimeout(computer_turn, 500);
      }
    }
  }

  function return_computer_choice_id() {
    if (computer_choice === 1) {
      computer_choice_id = 'corner1';
    } else if (computer_choice === 2) {
      computer_choice_id = 'edge1';
    } else if (computer_choice === 3) {
      computer_choice_id = 'corner2';
    } else if (computer_choice === 4) {
      computer_choice_id = 'edge2';
    } else if (computer_choice === 5) {
      computer_choice_id = 'center';
    } else if (computer_choice === 6) {
      computer_choice_id = 'edge3';
    } else if (computer_choice === 7) {
      computer_choice_id = 'corner3';
    } else if (computer_choice === 8) {
      computer_choice_id = 'edge4';
    } else if (computer_choice === 9) {
      computer_choice_id = 'corner4';
    }
  }

  function return_player_choice() {
    if (player_choice_id === 'corner1') {
      player_choice = 1;
    } else if (player_choice_id === 'edge1') {
      player_choice = 2;
    } else if (player_choice_id === 'corner2') {
      player_choice = 3;
    } else if (player_choice_id === 'edge2') {
      player_choice = 4;
    } else if (player_choice_id === 'center') {
      player_choice = 5;
    } else if (player_choice_id === 'edge3') {
      player_choice = 6;
    } else if (player_choice_id === 'corner3') {
      player_choice = 7;
    } else if (player_choice_id === 'edge4') {
      player_choice = 8;
    } else if (player_choice_id === 'corner4') {
      player_choice = 9;
    }
  }

  function runLogicCenter() {
    if (computer_selected.length === 1) {
      // First move. Player starts on an edge. A mistake.
      // if (player_selected[0] === 2 || player_selected[0] === 4 || player_selected[0] === 6 || player_selected[0] === 8) {
      if (player_selected[0] === 2) {
        computer_choice = 7;
      } else if (player_selected[0] === 4) {
        computer_choice = 9;
      } else if (player_selected[0] === 6) {
        computer_choice = 1;
      } else if (player_selected[0] === 8) {
        computer_choice = 3;
        // First move. Player starts at a corner. Smarter.
        // } else if (player_selected[0] === 1 || player_selected[0] === 3 || player_selected[0] === 7 || player_selected[0] === 9) {
      } else if (player_selected[0] === 1) {
        computer_choice = 9;
      } else if (player_selected[0] === 3) {
        computer_choice = 7;
      } else if (player_selected[0] === 7) {
        computer_choice = 3;
      } else if (player_selected[0] === 9) {
        computer_choice = 1;
      }
    }
    if (computer_selected.length === 2) {
      // Below is not necessary, as whether the player made his first move on an edge or corner, the computer always places its second move on a corner. See above's strategy when computer_selected.length === 1 and player_selected.length === 1.
      // if (computer_selected[1] === 1 || computer_selected[1] === 3 || computer_selected[1] === 7 || computer_selected[1] === 9) {
      // First move. Player starts on an edge. Mistake.
      if (player_selected[0] === 2 || player_selected[0] === 4 || player_selected[0] === 6 || player_selected[0] === 8) {
        // Second move. Player places on corner to block computers' second move. Already mistake.
        if (computer_selected[1] === 1) { // Computer [5, 1]
          if (player_selected[1] === 9) { // Player [6, 9]
            computer_choice = 3; // Computer [5, 1, 3]
          } else {
            computer_choice = 9; // Computer wins [5, 1, 9]
          }
        } else if (computer_selected[1] === 3) { // Computer [5, 3]
          if (player_selected[1] === 7) { // Player [8, 7]
            computer_choice = 9; // Computer [5, 3, 9]
          } else {
            computer_choice = 7; // Computer wins [5, 3, 7]
          }
        } else if (computer_selected[1] === 7) { // Computer [5, 7]
          if (player_selected[1] === 3) { // Player [2, 3]
            computer_choice = 1; // Computer [5, 7, 1]
          } else {
            computer_choice = 3; // Computer wins [5, 7, 3]
          }
        } else if (computer_selected[1] === 9) { // Computer [5, 9]
          if (player_selected[1] === 1) { // Player [4, 1]
            computer_choice = 7; // Computer [5, 9, 7]
          } else {
            computer_choice = 1; // Computer wins [5, 9, 1]
          }
        }
        // First move. Player starts at a corner. Smarter.
      } else if (player_selected[0] === 1 || player_selected[0] === 3 || player_selected[0] === 7 || player_selected[0] === 9) {
        // Computer's second move is also a corner, opposite to player's first move.
        // Second move. Player places on an edge. A mistake.
        if (player_selected[1] === 2 || player_selected[1] === 4 || player_selected[1] === 6 || player_selected[1] === 8) {
          if (computer_selected[1] === 1) { // Computer [5, 1]
            if (player_selected[1] === 2) { // Player [9, 2]
              computer_choice = 7; // Computer [5, 1, 7]
            } else if (player_selected[1] === 4) { // Player [9, 4]
              computer_choice = 3; // Computer [5, 1, 3]
            } else if (player_selected[1] === 6) { // Player [9, 6]
              computer_choice = 3; // Computer [5, 1, 3]
            } else if (player_selected[1] === 8) { // Player [9, 8]
              computer_choice = 7; // Computer [5, 1, 7]
            }
          } else if (computer_selected[1] === 3) { // Computer [5, 3]
            if (player_selected[1] === 2) { // Player [7, 2]
              computer_choice = 9; // Computer [5, 3, 9]
            } else if (player_selected[1] === 4) { // Player [7, 4]
              computer_choice = 1; // Computer [5, 3, 1]
            } else if (player_selected[1] === 6) { // Player [7, 6]
              computer_choice = 1; // Computer [5, 3, 1]
            } else if (player_selected[1] === 8) { // Player [7, 8]
              computer_choice = 9; // Computer [5, 3, 9]
            }
          } else if (computer_selected[1] === 7) { // Computer [5, 7]
            if (player_selected[1] === 2) { // Player [3, 2]
              computer_choice = 1; // Computer [5, 7, 1]
            } else if (player_selected[1] === 4) { // Player [3, 4]
              computer_choice = 9; // Computer [5, 7, 9]
            } else if (player_selected[1] === 6) { // Player [3, 6]
              computer_choice = 9; // Computer [5, 7, 9]
            } else if (player_selected[1] === 8) { // Player [3, 8]
              computer_choice = 1; // Computer [5, 7, 1]
            }
          } else if (computer_selected[1] === 9) { // Computer [5, 9]
            if (player_selected[1] === 2) { // Player [1, 2]
              computer_choice = 3; // Computer [5, 9, 3]
            } else if (player_selected[1] === 4) { // Player [1, 4]
              computer_choice = 7; // Computer [5, 9, 7]
            } else if (player_selected[1] === 6) { // Player [1, 6]
              computer_choice = 7; // Computer [5, 9, 7]
            } else if (player_selected[1] === 8) { // Player [1, 8]
              computer_choice = 3; // Computer [5, 9, 3]
            }
          }
          // Second move. Player places at a second corner. Smarter.
        } else if (player_selected[1] === 1 || player_selected[1] === 3 || player_selected[1] === 7 || player_selected[1] === 9) {
          if (computer_selected[1] === 1) { // Computer [5, 1]
            if (player_selected[1] === 3) { // Player [9, 3]
              computer_choice = 6; // Computer [5, 1, 6]
            } else if (player_selected[1] === 7) { // Player [9, 7]
              computer_choice = 8; // Computer [5, 1, 8]
            }
          } else if (computer_selected[1] === 3) { // Computer [5, 3]
            if (player_selected[1] === 1) { // Player [7, 1]
              computer_choice = 4; // Computer [5, 3, 4]
            } else if (player_selected[1] === 9) { // Player [7, 9]
              computer_choice = 8; // Computer [5, 3, 8]
            }
          } else if (computer_selected[1] === 7) { // Computer [5, 7]
            if (player_selected[1] === 1) { // Player [3, 1]
              computer_choice = 2; // Computer [5, 7, 2]
            } else if (player_selected[1] === 9) { // Player [3, 9]
              computer_choice = 6; // Computer [5, 7, 6]
            }
          } else if (computer_selected[1] === 9) { // Computer [5, 9]
            if (player_selected[1] === 3) { // Player [1, 3]
              computer_choice = 2; // Computer [5, 9, 2]
            } else if (player_selected[1] === 7) { // Player [1, 7]
              computer_choice = 4; // Computer [5, 9, 4]
            }
          }
        }
      }
    }
    if (computer_selected.length === 3) {
      // First move. Player starts on an edge.
      if (player_selected[0] === 2 || player_selected[0] === 4 || player_selected[0] === 6 || player_selected[0] === 8) {
        // Below is not necessary as, if the player starts on an edge, the computer's second and third move must also be a corner.
        // if (computer_selected[2] === 1 || computer_selected[2] === 3 || computer_selected[2] === 7 || computer_selected[2] === 9) {
        if (computer_selected[2] === 1) { // Computer [5, 7, 1]
          if (player_selected[2] === 4) { // Player [2, 3, 4]
            computer_choice = 9; // Computer wins [5, 7, 1, 9]
          } else if (player_selected[2] === 9) { // Player [2, 3, 9]
            computer_choice = 4; // Computer wins [5, 7, 1, 4]
          } else { // Player [2, 3, 6] or [2, 3, 8]
            computer_choice = 4; // or 9. Computer wins [5, 7, 1, 4]
          }
        } else if (computer_selected[2] === 3) { // Computer [5, 1, 3]
          if (player_selected[2] === 2) { // Player [6, 9, 2]
            computer_choice = 7; // Computer wins [5, 1, 3, 7]
          } else if (player_selected[2] === 7) { // Player [6, 9, 7]
            computer_choice = 2; // Computer wins [5, 1, 3, 2]
          } else { // Player [6, 9, 4] or [6, 9, 8]
            computer_choice = 2; // or 7. Computer wins [5, 1, 3, 2]
          }
        } else if (computer_selected[2] === 7) { // Computer [5, 9, 7]
          if (player_selected[2] === 3) { // Player [4, 1, 3]
            computer_choice = 8; // Computer wins [5, 9, 7, 8]
          } else if (player_selected[2] === 8) { // Player [4, 1, 8]
            computer_choice = 3; // Computer wins [5, 9, 7, 3]
          } else { // Player [4, 1, 2] or [4, 1, 6]
            computer_choice = 3; // or 8. Computer wins [5, 9, 7, 3]
          }
        } else if (computer_selected[2] === 9) { // Computer [5, 3, 9]
          if (player_selected[2] === 1) { // Player [8, 7, 1]
            computer_choice = 6; // Computer wins [5, 3, 9, 6]
          } else if (player_selected[2] === 6) { // Player [8, 7, 6]
            computer_choice = 1; // Computer wins [5, 3, 9, 1]
          } else { // Player [8, 7, 2] or [8, 7, 4]
            computer_choice = 1; // or 6. Computer wins [5, 3, 9, 1]
          }
        }
        // First move. Player starts at a corner. Smarter.
      } else if (player_selected[0] === 1 || player_selected[0] === 3 || player_selected[0] === 7 || player_selected[0] === 9) {
        // Second move. Player places on an edge. Mistake.
        // if (player_selected[1] === 2 || player_selected[1] === 4 || player_selected[1] === 6 || player_selected[1] === 8) {
        if (computer_selected[1] === 1 && computer_selected[2] === 7) { // Computer [5, 1, 7]
          if (player_selected[2] === 3) { // Player [9, 2, 3] or [9, 8, 3]
            computer_choice = 4; // Computer wins [5, 1, 7, 4]
          } else if (player_selected[2] === 4) { // Player [9, 2, 4] or [9, 8, 4]
            computer_choice = 3; // Computer wins [5, 1, 7, 3]
          } else { // Player [9, 2, 6] or [9, 8, 6] or [9, 2, 8] or [9, 8, 2]
            computer_choice = 3; // or 4 Compter wins [5, 1, 7, 3]
          }
        } else if (computer_selected[1] === 1 && computer_selected[2] === 3) { // Computer [5, 1, 3]
          if (player_selected[2] === 2) { // Player [9, 4, 2] or [9, 6, 2]
            computer_choice = 7; // Computer wins [5, 1, 3, 7]
          } else if (player_selected[2] === 7) { // Player [9, 4, 7] or [9, 6, 7]
            computer_choice = 2; // Computer wins [5, 1, 3, 2]
          } else { // Player [9, 4, 8] or [9, 6, 8] or [9, 4, 6] or [9, 6, 4]
            computer_choice = 2; // or 7 Computer wins [5, 1, 3, 2]
          }
        } else if (computer_selected[1] === 3 && computer_selected[2] === 9) { // Computer [5, 3, 9]
          if (player_selected[2] === 1) { // Player [7, 2, 1] or [7, 8, 1]
            computer_choice = 6; // Computer wins [5, 3, 9, 6]
          } else if (player_selected[2] === 6) { // Player [7, 2, 6] or [7, 8, 6]
            computer_choice = 1; // Computer wins [5, 3, 9, 1]
          } else { // Player [7, 2, 4] or [7, 8, 4] or [7, 2, 8] or [7, 8, 2]
            computer_choice = 1; // or 6 Computer wins [5, 3, 9, 1]
          }
        } else if (computer_selected[1] === 3 && computer_selected[2] === 1) { // Computer [5, 3, 1]
          if (player_selected[2] === 2) { // Player [7, 4, 2] or [7, 6, 2]
            computer_choice = 9; // Computer wins [5, 3, 1, 9]
          } else if (player_selected[2] === 9) { // Player [7, 4, 9] or [7, 6, 9]
            computer_choice = 2; // Computer wins [5, 3, 1, 2]
          } else { // Player [7, 4, 8] or [7, 6, 8] or [7, 4, 6] or [7, 6, 4]
            computer_choice = 2; // or 9 Computer wins [5, 3, 1, 2]
          }
        } else if (computer_selected[1] === 7 && computer_selected[2] === 1) { // Computer [5, 7, 1]
          if (player_selected[2] === 4) { // Player [3, 2, 4] or [3, 8, 4]
            computer_choice = 9; // Computer wins [5, 7, 1, 9]
          } else if (player_selected[2] === 9) { // Player [3, 2, 9] or [3, 8, 9]
            computer_choice = 4; // Computer wins [5, 7, 1, 4]
          } else { // Player [3, 2, 6] or [3, 8, 6] or [3, 2, 8] or [3, 8, 2]
            computer_choice = 4; // or 9 Computer wins [5, 7, 1, 4]
          }
        } else if (computer_selected[1] === 7 && computer_selected[2] === 9) { // Computer [5, 7, 9]
          if (player_selected[2] === 1) { // Player [3, 4, 1] or [3, 6, 1]
            computer_choice = 8; // Computer wins [5, 7, 9, 8]
          } else if (player_selected[2] === 8) { // Player [3, 4, 8] or [3, 6, 8]
            computer_choice = 1; // Computer wins [5, 7, 9, 1]
          } else { // Player [3, 4, 2] or [3, 6, 2] or [3, 4, 6] or [3, 6, 4]
            computer_choice = 1; // or 8 Computer wins [5, 7, 9, 1]
          }
        } else if (computer_selected[1] === 9 && computer_selected[2] === 3) { // Computer [5, 9, 3]
          if (player_selected[2] === 6) { // Player [1, 2, 6] or [1, 8, 6]
            computer_choice = 7; // Computer wins [5, 9, 3, 7]
          } else if (player_selected[2] === 7) { // Player [1, 2, 7] or [1, 8, 7]
            computer_choice = 6; // Computer wins [5, 9, 3, 6]
          } else { // Player [1, 2, 4] or [1, 8, 4] or [1, 2, 8] or [1, 8, 2]
            computer_choice = 6; // or 7 Computer wins [5, 9, 3, 6]
          }
        } else if (computer_selected[1] === 9 && computer_selected[2] === 7) { // Computer [5, 9, 7]
          if (player_selected[2] === 3) { // Player [1, 4, 3] or [1, 6, 3]
            computer_choice = 8; // Computer wins [5, 9, 7, 8]
          } else if (player_selected[2] === 8) { // Player [1, 4, 8] or [1, 6, 8]
            computer_choice = 3; // Computer wins [5, 9, 7, 3]
          } else { // Player [1, 4, 2] or [1, 6, 2] or [1, 4, 6] or [1, 6, 4]
            computer_choice = 3; // or 8 Computer wins [5, 9, 7, 3]
          }
          // Third move. Player places first and second moves at corner. Smarter.
          // } else if (player_selected[1] === 2 || player_selected[1] === 4 || player_selected[1] === 6 || player_selected[1] === 8)
        } else if (computer_selected[1] === 1 && computer_selected[2] === 6) {
          if (player_selected[2] === 4) {
            computer_choice = avail_boxes[Math.floor(Math.random() * avail_boxes.length)];
          } else {
            computer_choice = 4; // Computer wins [5, 1, 6, 4]
          }
        } else if (computer_selected[1] === 1 && computer_selected[2] === 8) {
          if (player_selected[2] === 2) {
            computer_choice = avail_boxes[Math.floor(Math.random() * avail_boxes.length)];
          } else {
            computer_choice = 2; // Computer wins [5, 1, 8, 2]
          }
        } else if (computer_selected[1] === 3 && computer_selected[2] === 4) {
          if (player_selected[2] === 6) {
            computer_choice = avail_boxes[Math.floor(Math.random() * avail_boxes.length)];
          } else {
            computer_choice = 6; // Computer wins [5, 3, 4, 6]
          }
        } else if (computer_selected[1] === 3 && computer_selected[2] === 8) {
          if (player_selected[2] === 2) {
            computer_choice = avail_boxes[Math.floor(Math.random() * avail_boxes.length)];
          } else {
            computer_choice = 2; // Computer wins [5, 3, 8, 2]
          }
        } else if (computer_selected[1] === 7 && computer_selected[2] === 2) {
          if (player_selected[2] === 8) {
            computer_choice = avail_boxes[Math.floor(Math.random() * avail_boxes.length)];
          } else {
            computer_choice = 8; // Computer wins [5, 7, 2, 8]
          }
        } else if (computer_selected[1] === 7 && computer_selected[2] === 6) {
          if (player_selected[2] === 4) {
            computer_choice = avail_boxes[Math.floor(Math.random() * avail_boxes.length)];
          } else {
            computer_choice = 4; // Computer wins [5, 7, 6, 4]
          }
        } else if (computer_selected[1] === 9 && computer_selected[2] === 2) {
          if (player_selected[2] === 8) {
            computer_choice = avail_boxes[Math.floor(Math.random() * avail_boxes.length)];
          } else {
            computer_choice = 8; // Computer wins [5, 9, 2, 8]
          }
        } else if (computer_selected[1] === 9 && computer_selected[2] === 4) {
          if (player_selected[2] === 6) {
            computer_choice = avail_boxes[Math.floor(Math.random() * avail_boxes.length)];
          } else {
            computer_choice = 6; // Computer wins [5, 9, 4, 6]
          }
        }
      }
    }
    if (computer_selected.length === 4) {
      computer_choice = avail_boxes[Math.floor(Math.random() * avail_boxes.length)];
    }
  }

  function runLogicCorner() {
    if (player_selected[0] === 5) {
      if (computer_selected.length === 1) {
        if (computer_selected[0] === 1) {
          computer_choice = 9; // Always opposite to first move
        } else if (computer_selected[0] === 3) {
          computer_choice = 7;
        } else if (computer_selected[0] === 7) {
          computer_choice = 3;
        } else if (computer_selected[0] === 9) {
          computer_choice = 1;
        }
      }
      if (computer_selected.length === 2) {
        if (player_selected[1] === 1) { // Player [5, 1]
          computer_choice = 9; // Computer choice [3, 7, 9] or [7, 3, 9]
        } else if (player_selected[1] === 3) { // Player [5, 3]
          computer_choice = 7; // Computer choice [1, 9, 7] or [9, 1, 7]
        } else if (player_selected[1] === 7) { // Player [5, 7]
          computer_choice = 3; // Computer choice [1, 9, 3] or [9, 1, 3]
        } else if (player_selected[1] === 9) { // Player [5, 9]
          computer_choice = 1; // Computer choice [3, 7, 1] or [7, 3, 1]
        } else if (player_selected[1] === 2) { // Player [5, 2]
          computer_choice = 8; // Computer choice [1, 9, 8] or [9, 1, 8] or [3, 7, 8] or [7, 3, 8]
        } else if (player_selected[1] === 4) { // Player [5, 4]
          computer_choice = 6; // Computer choice [1, 9, 6] or [9, 1, 6] or [3, 7, 6] or [7, 3, 6]
        } else if (player_selected[1] === 6) { // Player [5, 6]
          computer_choice = 4; // Computer choice [1, 9, 4] or [9, 1, 4] or [3, 7, 4] or [7, 3, 4]
        } else if (player_selected[1] === 8) { // Player [5, 8]
          computer_choice = 2; // Computer choice [1, 9, 8] or [9, 1, 8] or [3, 7, 8] or [7, 3, 8]
        }
      }
      if (computer_selected.length === 3) {
        if (player_selected[1] === 1) {
          if (player_selected[2] === 6) {
            computer_choice = 8; // Computer wins [3, 7, 8] or [7, 3, 8]
          } else if (player_selected[2] === 8) {
            computer_choice = 6; // Computer wins [3, 7, 6] or [7, 3, 6]
          } else {
            computer_choice = 6; // Computer wins [3, 7, 6] or [7, 3, 6]
          }
        } else if (player_selected[1] === 3) {
          if (player_selected[2] === 4) {
            computer_choice = 8; // Computer wins [1, 9, 8] or [9, 1, 8]
          } else if (player_selected[2] === 8) {
            computer_choice = 4; // Computer wins [1, 9, 4] or [9, 1, 4]
          } else {
            computer_choice = 4; // Computer wins [1, 9, 4] or [9, 1, 4]
          }
        } else if (player_selected[1] === 7) {
          if (player_selected[2] === 2) {
            computer_choice = 6; // Computer wins [1, 9, 6] or [9, 1, 6]
          } else if (player_selected[2] === 6) {
            computer_choice = 2; // Computer wins [1, 9, 2] or [9, 1, 2]
          } else {
            computer_choice = 2; // Computer wins [1, 9, 2] or [9, 1, 2]
          }
        } else if (player_selected[1] === 9) {
          if (player_selected[2] === 2) {
            computer_choice = 4; // Computer wins [3, 7, 4] or [7, 3, 4]
          } else if (player_selected[2] === 4) {
            computer_choice = 2; // Computer wins [3, 7, 2] or [7, 3, 2]
          } else {
            computer_choice = 2; // Computer wins [3, 7, 2] or [7, 3, 2]
          }
        } else if (computer_selected[0] === 1 || computer_selected[0] === 9) {
          if (player_selected[1] === 2) {
            if (player_selected[2] === 7) { // Player [5, 2, 7]
              computer_choice = 3; // Computer [1, 9, 8, 3] or [9, 1, 8, 3]
            } else {
              computer_choice = 7; // Computer wins [1, 9, 8, 7] or [9, 1, 8, 7]
            }
          } else if (player_selected[1] === 8) {
            if (player_selected[2] === 3) {// Player [5, 8, 3]
              computer_choice = 7; // Computer [1, 9, 2, 7] or [9, 1, 2, 7]
            } else {
              computer_choice = 3; // Computer wins [1, 9, 2, 3] or [9, 1, 2, 3]
            }
          } else if (player_selected[1] === 4) {
            if (player_selected[2] === 3) {// Player [5, 4, 3]
              computer_choice = 7; // Computer [1, 9, 6, 7] or [9, 1, 6, 7]
            } else {
              computer_choice = 3; // Computer wins [1, 9, 6, 3] or [9, 1, 6, 3]
            }
          } else if (player_selected[1] === 6) {
            if (player_selected[2] === 7) {// Player [5, 6, 7]
              computer_choice = 3; // Computer [1, 9, 6, 3] or [9, 1, 6, 3]
            } else {
              computer_choice = 7; // Computer wins [1, 9, 6, 7] or [9, 1, 6, 7]
            }
          }
        } else if (computer_selected[0] === 3 || computer_selected[0] === 7) {
          if (player_selected[1] === 2) {
            if (player_selected[2] === 9) { // Player [5, 2, 9]
              computer_choice = 1; // Computer [3, 7, 8, 1] or [7, 3, 8, 1]
            } else {
              computer_choice = 9; // Computer wins [3, 7, 8, 9] or [7, 3, 8, 9]
            }
          } else if (player_selected[1] === 8) {
            if (player_selected[2] === 1) {// Player [5, 8, 1]
              computer_choice = 9; // Computer [3, 7, 2, 9] or [7, 3, 2, 9]
            } else {
              computer_choice = 1; // Computer wins [3, 7, 2, 1] or [7, 3, 2, 1]
            }
          } else if (player_selected[1] === 4) {
            if (player_selected[2] === 9) {// Player [5, 4, 9]
              computer_choice = 1; // Computer [3, 7, 6, 7] or [7, 3, 6, 7]
            } else {
              computer_choice = 9; // Computer wins [3, 7, 6, 3] or [7, 3, 6, 3]
            }
          } else if (player_selected[1] === 6) {
            if (player_selected[2] === 1) {// Player [5, 6, 7]
              computer_choice = 9; // Computer [3, 7, 4, 9] or [7, 3, 4, 9]
            } else {
              computer_choice = 1; // Computer wins [3, 7, 4, 1] or [7, 3, 4, 1]
            }
          }
        }
      }
      if (computer_selected.length === 4) {
        // Player starts with [1, 9] or [9, 1]
        if (computer_selected[2] === 8 && computer_selected[3] === 3) {
          if (player_selected[3] === 6) {
            computer_choice = 4; // Draw
          } else {
            computer_choice = 6; // Computer wins [1, 9, 8, 3, 6]
          }
        } else if (computer_selected[2] === 2 && computer_selected[3] === 7) {
          if (player_selected[3] === 4) {
            computer_choice = 6; // Draw
          } else {
            computer_choice = 4; // Computer wins [1, 9, 2, 7, 4]
          }
        } else if (computer_selected[2] === 6 && computer_selected[3] === 7) {
          if (player_selected[3] === 8) {
            computer_choice = 2; // Draw
          } else {
            computer_choice = 8; // Computer wins [1, 9, 6, 7, 8]
          }
        } else if (computer_selected[2] === 4 && computer_selected[3] === 3) {
          if (player_selected[3] === 2) {
            computer_choice = 8; // Draw
          } else {
            computer_choice = 2; // Computer wins [1, 9, 4, 3, 2]
          }
        // Player starts with [3, 7] or [7, 3]
        } else if (computer_selected[2] === 8 && computer_selected[3] === 1) {
          if (player_selected[3] === 4) {
            computer_choice = 6; // Draw
          } else {
            computer_choice = 4; // Computer wins [3, 7, 8, 1, 4]
          }
        } else if (computer_selected[2] === 2 && computer_selected[3] === 9) {
          if (player_selected[3] === 6) {
            computer_choice = 4; // Draw
          } else {
            computer_choice = 6; // Computer wins [3, 7, 2, 9, 6]
          }
        } else if (computer_selected[2] === 6 && computer_selected[3] === 1) {
          if (player_selected[3] === 2) {
            computer_choice = 8; // Draw
          } else {
            computer_choice = 2; // Computer wins [3, 7, 6, 1, 2]
          }
        } else if (computer_selected[2] === 4 && computer_selected[3] === 9) {
          if (player_selected[3] === 8) {
            computer_choice = 2; // Draw
          } else {
            computer_choice = 8; // Computer wins [3, 7, 4, 9, 8]
          }
        }
      }
    } else { // Player first move is not center
      // Computer's first move will always place on a corner
      if (computer_selected.length === 1) {
        if (computer_selected[0] === 1) {
          // Player's first move is adjacent
          if (player_selected[0] === 2 || player_selected[0] === 3 || player_selected[0] === 6 || player_selected[0] === 9) { // Scenario 1: One adjacent, one corner && Scenario 9: One far edge, one opposite corner
            computer_choice = 7; // Computer [1, 7]
          } else if (player_selected[0] === 4 || player_selected[0] === 7 || player_selected[0] === 8) { // Scenario 2: One adjacent, one corner && Scenario 13: One far edge
            computer_choice = 3; // Computer [1, 3]
          }
          // else if (player_selected[0] === 5) {
          //   computer_choice =
          // }
        } else if (computer_selected[0] === 3) {
          if (player_selected[0] === 2 || player_selected[0] === 1 || player_selected[0] === 4) { // Scenario 3: One adjacent, one corner && Scenario 14: One far edge
            computer_choice = 9; // Computer [3, 9]
          } else if (player_selected[0] === 6 || player_selected[0] === 9 || player_selected[0] === 8 || player_selected[0] === 7) { // Scenario 4: One adjacent, one corner && Scenario 10: One far edge, one opposite corner
            computer_choice = 1; // Computer [3, 1]
          }
        } else if (computer_selected[0] === 7) {
          if (player_selected[0] === 4 || player_selected[0] === 1 || player_selected[0] === 2 || player_selected[0] === 3) { // Scenario 5: One adjacent, one corner && Scenario 11: One far edge, one opposite corner
            computer_choice = 9; // Computer [7, 9]
          } else if (player_selected[0] === 8 || player_selected[0] === 9 || player_selected[0] === 6) { // Scenario 6: One adjacent, one corner
            computer_choice = 1; // Computer [7, 1]
          }
        } else if (computer_selected[0] === 9) {
          if (player_selected[0] === 6 || player_selected[0] === 3 || player_selected[0] === 2) { // Scenario 7: One adjacent, one corner
            computer_choice = 7; // Computer [9, 7]
          } else if (player_selected[0] === 8 || player_selected[0] === 7 || player_selected[0] === 4 || player_selected[0] === 1) { // Scenario 8: One adjacent, one corner && Scenario 12: One far edge, one opposite corner
            computer_choice = 3; // Computer [9, 3]
          }
        }
      }
      if (computer_selected.length === 2) {
        // Below two lines are no longer necessary as player's moves can be predicted from computer's moves
        // Player's first move is adjacent
        // if (player_selected[0] === 2 || player_selected[0] === 4 || player_selected[0] === 6 || player_selected[0] === 8)
        if (computer_selected[0] === 1 && computer_selected[1] === 7) { // Scenario 1
          if (player_selected[1] === 4) { // Player [2, 4] or [3, 4] or [6, 4] or [9, 4]
            if (player_selected[0] === 2 || player_selected[0] === 3) {
              computer_choice = 9; // Computer [1, 7, 9] // Scenario 1
            } else if (player_selected[0] === 6) {
              computer_choice = 5; // Computer [1, 7, 5] // Scenario 9 far edge
            } else if (player_selected[0] === 9) {
              computer_choice = 3; // Computer [1, 7, 3] // Scenario 9 opposite corner
            }
          } else {
            computer_choice = 4; // Computer wins [1, 7, 4]
          }
        } else if (computer_selected[0] === 1 && computer_selected[1] === 3) { // Scenario 2
          if (player_selected[1] === 2) { // Player blocks [4, 2] or [7, 2]
            if (player_selected[0] === 4 || player_selected[0] === 7) {
              computer_choice = 9; // Computer [1, 3, 9]
            } else if (player_selected[0] === 8) {
              computer_choice = 5; // Computer [1, 3, 5] // Scenario 13
            }
          } else {
            computer_choice = 2; // Computer wins [1, 3, 2]
          }
        } else if (computer_selected[0] === 3 && computer_selected[1] === 9) { // Scenario 3
          if (player_selected[1] === 6) { // Player blocks [2, 6] or [1, 6] or [4, 6]
            if (player_selected[0] === 2 || player_selected[0] === 1) {
              computer_choice = 7; // Computer [3, 9, 7]
            } else if (player_selected[0] === 4) {
              computer_choice = 5; // Computer [3, 9, 5] // Scenario 14
            }
          } else {
            computer_choice = 6; // Computer wins [3, 9, 6]
          }
        } else if (computer_selected[0] === 3 && computer_selected[1] === 1) { // Scenario 4
          if (player_selected[1] === 2) { // Player [6, 2] or [9, 2] or [8, 2] or [7, 2]
            if (player_selected[0] === 6 || player_selected[0] === 9) {
              computer_choice = 7; // Computer [3, 1, 7] // Scenario 4
            } else if (player_selected[0] === 8) {
              computer_choice = 5; // Computer [3, 1, 5] // Scenario 10 far edge
            } else if (player_selected[0] === 7) {
              computer_choice = 9; // Computer [3, 1, 9] // Scenario 10 opposite corner
            }
          } else {
            computer_choice = 2; // Computer wins [3, 1, 2]
          }
        } else if (computer_selected[0] === 7 && computer_selected[1] === 9) { // Scenario 5
          if (player_selected[1] === 8) { // Player [4, 8] or [1, 8] or [2, 8] or [3, 8]
            if (player_selected[0] === 4 || player_selected[0] === 1) {
              computer_choice = 3; // Computer [7, 9, 3] // Scenario 5
            } else if (player_selected[0] === 2) {
              computer_choice = 5; // Computer [7, 9, 5] // Scenario 11 far edge
            } else if (player_selected[0] === 3) {
              computer_choice = 1; // Computer [7, 9, 1] // Scenario 11 opposite corner
            }
          } else {
            computer_choice = 8; // Computer wins [7, 9, 8]
          }
        } else if (computer_selected[0] === 7 && computer_selected[1] === 1) { // Scenario 6
          if (player_selected[1] === 4) { // Player [8, 4] or [9, 4] or [6, 4]
            if (player_selected[0] === 8 || player_selected[0] === 9) {
              computer_choice = 3; // Computer [7, 1, 3]
            } else if (player_selected[0] === 6) {
              computer_choice = 5; // Computer [7, 1, 5] // Sceneario 15
            }
          } else {
            computer_choice = 4; // Computer wins [7, 1, 4]
          }
        } else if (computer_selected[0] === 9 && computer_selected[1] === 7) { // Scenario 7
          if (player_selected[1] === 8) { // Player [6, 8] or [3, 8] or [2, 8]
            if (player_selected[0] === 6 || player_selected[0] === 3) {
              computer_choice = 1; // Computer [9, 7, 1]
            } else if (player_selected[0] === 2) {
              computer_choice = 5; // Computer [9, 7, 5] // Scenario 16
            }
          } else {
            computer_choice = 8; // Computer wins [9, 7, 8]
          }
        } else if (computer_selected[0] === 9 && computer_selected[1] === 3) { // Scenario 8
          if (player_selected[1] === 6) { // Player [8, 6] or [7, 6] or [4, 6] or [1, 6]
            if (player_selected[0] === 8 || player_selected[0] === 7) {
              computer_choice = 1; // Computer [9, 3, 1] // Scenario 8
            } else if (player_selected[0] === 4) {
              computer_choice = 5; // Computer [9, 3, 5] // Scenario 12 far edge
            } else if (player_selected[0] === 1) {
              computer_choice = 7; // Computer [9, 3, 7] // Scenario 12 opposite corner
            }
          } else {
            computer_choice = 6; // Computer wins [9, 3, 6]
          }
        }
      }

      if (computer_selected.length === 3) {
        // Computer [1, 7, 9] Player [2, 4] or [3, 4]
        if (computer_selected[0] === 1 && computer_selected[1] === 7) {
          if (computer_selected[2] === 9) { // Scenario 1
            if (player_selected[2] === 5) {
              computer_choice = 8; // Computer wins [1, 7, 9, 8]
            } else if (player_selected[2] === 8) {
              computer_choice = 5; // Computer wins [1, 7, 9, 5]
            } else {
              computer_choice = 5; // Computer wins [1, 7, 9, 5]
            }
          } else if (computer_selected[2] === 5) { // Scenario 9 Far edge
            if (player_selected[2] === 3) {
              computer_choice = 9; // Computer wins [1, 7, 5, 9]
            } else if (player_selected[2] === 9) {
              computer_choice = 3; // Computer wins [1, 7, 5, 3]
            } else {
              computer_choice = 3; // Computer wins [1, 7, 5, 3]
            }
          } else if (computer_selected[2] === 3) { // Scenario 9 opposite corner
            if (player_selected[2] === 2) {
              computer_choice = 5; // Computer wins [1, 7, 3, 5]
            } else if (player_selected[2] === 5) {
              computer_choice = 2; // Computer wins [1, 7, 3, 2]
            } else {
              computer_choice = 2; // Computer wins [1, 7, 3, 2]
            }
          }
        // Computer [1, 3, 9] Player [4, 2] or [7, 2]
        } else if (computer_selected[0] === 1 && computer_selected[1] === 3) {
          if (computer_selected[2] === 9) { // Scenario 2
            if (player_selected[2] === 5) {
              computer_choice = 6; // Computer wins [1, 3, 9, 6]
            } else if (player_selected[2] === 6) {
              computer_choice = 5; // Computer wins [1, 3, 9, 5]
            } else {
              computer_choice = 5; // Computer wins [1, 3, 9, 5]
            }
          // Computer [1, 3, 5] Player [8, 2] // Scenario 13
          } else if (computer_selected[2] === 5) {
            if (player_selected[2] === 7) {
              computer_choice = 9; // Computer wins [1, 3, 5, 9]
            } else if (player_selected[2] === 9) {
              computer_choice = 7; // Computer wins [1, 3, 5, 7]
            } else {
              computer_choice = 7; // Computer wins [1, 3, 5, 7]
            }
          }
        // Computer [3, 9, 7] Player [2, 6] or [1, 6]
        } else if (computer_selected[0] === 3 && computer_selected[1] === 9) {
          if (computer_selected[2] === 7) { // Scenario 3
            if (player_selected[2] === 5) {
              computer_choice = 8; // Computer wins [3, 9, 7, 8]
            } else if (player_selected[2] === 8) {
              computer_choice = 5; // Computer wins [3, 9, 7, 5]
            } else {
              computer_choice = 5; // Computer wins [3, 9, 7, 5]
            }
          // Computer [3, 9, 5] Player [4, 6] // Scenario 14
          } else if (computer_selected[2] === 5) {
            if (player_selected[2] === 1) {
              computer_choice = 7; // Computer wins [3, 9, 5, 7]
            } else if (player_selected[2] === 7) {
              computer_choice = 1; // Computer wins [3, 9, 5, 1]
            } else {
              computer_choice = 1; // Computer wins [3, 9, 5, 1]
            }
          }
        // Computer [3, 1, 7] Player [6, 2]
        } else if (computer_selected[0] === 3 && computer_selected[1] === 1) {
          if (computer_selected[2] === 7) { // Scenario 4
            if (player_selected[2] === 5) {
              computer_choice = 4; // Computer wins [3, 1, 7, 4]
            } else if (player_selected[2] === 4) {
              computer_choice = 5; // Computer wins [3, 1, 7, 5]
            } else {
              computer_choice = 5; // Computer wins [3, 1, 7, 5]
            }
          } else if (computer_selected[2] === 5) {
            if (player_selected[2] === 7) {
              computer_choice = 9; // Computer wins [3, 1, 5, 9]
            } else if (player_selected[2] === 9) {
              computer_choice = 7; // Computer wins [3, 1, 5, 7]
            } else {
              computer_choice = 7; // Computer wins [3, 1, 5, 7]
            }
          } else if (computer_selected[2] === 9) {
            if (player_selected[2] === 5) {
              computer_choice = 6; // Computer wins [3, 1, 9, 6]
            } else if (player_selected[2] === 6) {
              computer_choice = 5; // Computer wins [3, 1, 9, 5]
            } else {
              computer_choice = 5; // Computer wins [3, 1, 9, 5]
            }
          }
        // Computer [7, 9, 3] Player [4, 8]
        } else if (computer_selected[0] === 7 && computer_selected[1] === 9) {
          if (computer_selected[2] === 3) { // Scenario 5
            if (player_selected[2] === 5) {
              computer_choice = 6; // Computer wins [7, 9, 3, 6]
            } else if (player_selected[2] === 6) {
              computer_choice = 5; // Computer wins [7, 9, 3, 5]
            } else {
              computer_choice = 5; // Computer wins [7, 9, 3, 5]
            }
          } else if (computer_selected[2] === 5) {
            if (player_selected[2] === 1) {
              computer_choice = 3; // Computer wins [7, 9, 5, 3]
            } else if (player_selected[2] === 3) {
              computer_choice = 1; // Computer wins [7, 9, 5, 1]
            } else {
              computer_choice = 1; // Computer wins [7, 9, 5, 1]
            }
          } else if (computer_selected[2] === 1) {
            if (player_selected[2] === 5) {
              computer_choice = 4; // Computer wins [7, 9, 1, 4]
            } else if (player_selected[2] === 4) {
              computer_choice = 5; // Computer wins [7, 9, 1, 5]
            } else {
              computer_choice = 4; // Computer wins [7, 9, 1, 4]
            }
          }
        // Computer [7, 1, 3] Player [8, 4]
        } else if (computer_selected[0] === 7 && computer_selected[1] === 1) {
          if (computer_selected[2] === 3) { // Scenario 6
            if (player_selected[2] === 5) {
              computer_choice = 2; // Computer wins [7, 1, 3, 2]
            } else if (player_selected[2] === 2) {
              computer_choice = 5; // Computer wins [7, 1, 3, 5]
            } else {
              computer_choice = 5; // Computer wins [7, 1, 3, 5]
            }
          // Computer [7, 1, 5] Player [6, 4] // Scenario 15
          } else if (computer_selected[2] === 5) {
            if (player_selected[2] === 3) {
              computer_choice = 9; // Computer wins [7, 1, 5, 9]
            } else if (player_selected[2] === 9) {
              computer_choice = 3; // Computer wins [7, 1, 5, 3]
            } else {
              computer_choice = 3; // Computer wins [7, 1, 5, 3]
            }
          }
        // Computer [9, 7, 1] Player [6, 8]
        } else if (computer_selected[0] === 9 && computer_selected[1] === 7) {
          if (computer_selected[2] === 1) { // Scenario 7
            if (player_selected[2] === 5) {
              computer_choice = 4; // Computer wins [9, 7, 1, 4]
            } else if (player_selected[2] === 4) {
              computer_choice = 5; // Computer wins [9, 7, 1, 5]
            } else {
              computer_choice = 5; // Computer wins [9, 7, 1, 5]
            }
          // Computer [9, 7, 5] Player [2, 8] Scenario 16
          } else if (computer_selected[2] === 5) {
            if (player_selected[2] === 1) {
              computer_choice = 3; // Computer wins [9, 7, 5, 3]
            } else if (player_selected[2] === 3) {
              computer_choice = 1; // Computer wins [9, 7, 5, 1]
            } else {
              computer_choice = 1; // Computer wins [9, 7, 5, 1]
            }
          }
        // Computer [9, 3, 1] Player [8, 6]
        } else if (computer_selected[0] === 9 && computer_selected[1] === 3) {
          if (computer_selected[2] === 1) { // Scenario 8
            if (player_selected[2] === 5) {
              computer_choice = 2; // Computer wins [9, 3, 1, 2]
            } else if (player_selected[2] === 2) {
              computer_choice = 5; // Computer wins [9, 3, 1, 5]
            } else {
              computer_choice = 5; // Computer wins [9, 3, 1, 5]
            }
          } else if (computer_selected[2] === 5) {
            if (player_selected[2] === 1) {
              computer_choice = 7; // Computer wins [9, 3, 5, 7]
            } else if (player_selected[2] === 7) {
              computer_choice = 1; // Computer wins [9, 3, 5, 1]
            } else {
              computer_choice = 1; // Computer wins [9, 3, 5, 1]
            }
          } else if (computer_selected[2] === 7) {
            if (player_selected[2] === 5) {
              computer_choice = 8; // Computer wins [9, 3, 7, 8]
            } else if (player_selected[2] === 8) {
              computer_choice = 5; // Computer wins [9, 3, 7, 5]
            } else {
              computer_choice = 5; // Computer wins [9, 3, 7, 5]
            }
          }
        }
      }
    }
  }

});

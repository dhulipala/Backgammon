var boardData = {};
var diceData = {};
var currentPlayerData = "";
var goData = {};

$(function() {
	
	for (var i = 1; i <= 24; i++) {
			boardData[i] = {};
			boardData[i].value = "";
			boardData[i].color = "";
		}

		diceData[1] = "";
		diceData[2] = "";
		

		boardData[1].value = 2;
		boardData[1].color = "red";

		boardData[6].value = 3;
		boardData[6].color = "black";

		boardData[8].value = 3;
		boardData[8].color = "red";

		boardData[12].value = 5;
		boardData[12].color = "black";

		boardData[13].value = 5;
		boardData[13].color = "red";

		boardData[17].value = 3;
		boardData[17].color = "black";

		boardData[19].value = 5;
		boardData[19].color = "red";

		boardData[24].value = 2;
		boardData[24].color = "black";

		paintBoard(boardData, diceData);

		currentPlayerData = "red";
		paintPlayer(currentPlayerData);
		
		
	});
	
	function handleGo(currentPlayerData, goData){
		var countChance = 0;
		var oppositePlayerData;
		
		diceData[1] = $("#dice_1").val();
		diceData[2] = $("#dice_2").val();
				
		if(currentPlayerData = 'red'){
			oppositePlayerData = 'black';
			goData[1] = $("#red_input1").val();
			goData[2] = $("#red_input2").val();
		} 
		else{
			oppositePlayerData = 'red';
			goData[1] = $("#black_input1").val();
			goData[2] = $("#black_input2").val();
		}
				
		//if a stone stack is empty raise an alert
		// if stone numbered board.player is not curent player raise alert
		if(isEmpty(boardData, goData) || !isSameColor(currentPlayerData, boardData, goData)){
			alert("error");
		}
		else{
			do{
				
				var whereToMove = +goData[1] + +diceData[1];
			
				if(isEmpty(boardData, goData) || isSameColor(currentPlayerData, boardData, goData)){
					boardData[goData[1]].value = +boardData[goData[1]].value-1;
					boardData[whereToMove].value = +boardData[whereToMove].value+1;
					boardData[whereToMove].color = currentPlayerData;
					countChance = countChance+1;
					// if a board value if 1 it makes it null instead of '0'.
					if(boardData[goData[1]].value == 0){
						boardData[goData[1]].value = null;
					}
			} 
			 else {
					if((boardData[whereToMove].value == 1) && (boardData[whereToMove].color == oppositePlayerData)){
				
					boardData[whereToMove].value = 0;
					boardData[whereToMove].value = 1;
					boardData[whereToMove].color = currentPlayerData;
					countChance = countChance+1;
					}
				}
				paintBoard(boardData);
			}while(countChance == 2);
		}
		disableButtonsOf(currentPlayerData,goData);
		
	};
	
	function isSameColor(currentPlayerData, boardData, goData){
		if (boardData[goData[1]].color == currentPlayerData){
			return true;
		}
	};
	
	function isEmpty(boardData, goData){
		
		if (boardData[goData[1]].value == 0  ){
			return true;
		}
	};
	
	
	function pad(str, max) {
		str = str.toString();
		return str.length < max ? pad("0" + str, max) : str;
	};
	
	function paintBoard(boardData) {
		for (var i = 1; i <= 24; i++) {
			$("#board_" + i).removeClass("red");
			$("#board_" + i).removeClass("black");
			$("#board_" + i).val(boardData[i].value);
			$("#board_" + i).addClass(boardData[i].color);
		}
	};

	function rollRedDice(diceData) {
		diceData[1] = Math.floor(Math.random() * 6) + 1;
		diceData[2] = Math.floor(Math.random() * 6) + 1;
		paintRedDice(diceData);
		var rolled = true;
		disableButtonsOf("red",rolled);
	};
	function rollBlackDice(diceData) {
		diceData[1] = Math.floor(Math.random() * 6) + 1;
		diceData[2] = Math.floor(Math.random() * 6) + 1;
		paintBlackDice(diceData);
		var rolled = true;
		disableButtonsOf("black",rolled);
	};

	function paintRedDice(diceData) {
		$("#dice_1").val(diceData[1]);
		$("#dice_2").val(diceData[2]);
	};

	function paintBlackDice(diceData) {
		$("#dice_3").val(diceData[1]);
		$("#dice_4").val(diceData[2]);
	};

	function paintPlayer(currentPlayerData) {
		$("#red_input").val("");
		$("#red_input").prop("disabled", true);
		$("#red_go").prop("disabled", true);

		$("#black_input").val("");
		$("#black_input").prop("disabled", true);
		$("#black_go").prop("disabled", true);

		$("#" + currentPlayerData + "_input").prop("disabled", false);
		$("#" + currentPlayerData + "_go").prop("disabled", false);
	};
	
	function disableButtonsOf(currentPlayerData, rolled){
		var oppositePlayerData ;
		if (rolled == true){
			if(currentPlayerData == "red"){
				oppositePlayerData = "black";
			}
			else{
				oppositePlayerData = "red";
			}
				document.getElementById(currentPlayerData + "_roll").disabled = true;
				document.getElementById(oppositePlayerData + "_roll").disabled = true;
				document.getElementById("dice_3").disabled = true;
				document.getElementById("dice_4").disabled = true;
				document.getElementById(oppositePlayerData + "_go1").disabled = true;
				document.getElementById(oppositePlayerData + "_input1").disabled = true;
				document.getElementById(oppositePlayerData + "_go2").disabled = true;
				document.getElementById(oppositePlayerData + "_input2").disabled = true;
			}
		}
		
	
	

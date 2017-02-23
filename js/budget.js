var display = document.getElementById("dropdownMenu1");

for (var i=1; i<=11; i++) {
	var button = document.getElementById("choice" + i);
	if (button != null) {  	 	
		button.onclick = function(e) {
			display.innerHTML = e.target.innerHTML;
		}
	}			   
}


$(document).ready(function(){
var display = document.getElementById("budget-category");

for (var i=1; i<=11; i++) {
	var button = document.getElementById("choice" + i);
	if (button != null) {
		button.onclick = function(e) {
			display.innerHTML = e.target.innerHTML;
		}
	}
}
})

function update_budget(){
	var category = document.getElementById("budget-category").innerHTML;
	var amount = document.getElementById("budget-amount").value;
	confirm("Success! You have updated budget category of \"" + category + "\" to $" + amount + "!");
}

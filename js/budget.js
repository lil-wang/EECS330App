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

var category_input = document.getElementById("category-input");
var budget_input = document.getElementById("budget-input");

function add_new_category(){
	
	var budgetbody = document.getElementById("budgetbody");
	var cat_value = category_input.value;
	var budget_value = budget_input.value;
	var newContent='<div class="row budget-row">\
	<div class="col-sm-2 col-md-2">\
	<p>'+ cat_value +'</p>\
	</div>\
	<div class="col-sm-8 col-md-8">\
	<div class="progress">\
	<div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"\
	aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:0%">\
	0% Reached\
	</div>\
	</div>\
	</div>\
	<div class="col-sm-2 col-md-2">\
	<p>$0 /' + budget_value + '</p>\
	</div>\
	</div>';

	$(budgetbody).append(newContent);
}

var account_number = document.getElementById("account-number");
var account_type = document.getElementById("account-type");
var account_name = document.getElementById("account-name");

for (var i=1; i<=5; i++) {
    var acc = document.getElementById("choice" + i);
    if (acc != null) {
        acc.onclick = function(e) {
            account_type.innerHTML = e.target.innerHTML;
        }
    }
}

function add_account(){
  confirm("Success! You have added a new bank account from " + account_name.value + ": \n" +
  "- Account type: " + account_type.innerHTML + "\n- Account Number: " + account_number.value);

};

$(document).ready(function() {
    $('#transactions').DataTable( {
        initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        }
    } );

    $('#datePicker')
        .datepicker({
            format: 'mm/dd/yyyy'
        });

} );

var display = document.getElementById("categdropdown");

for (var i=1; i<=11; i++) {
    var button = document.getElementById("choice" + i);
    if (button != null) {       
        button.onclick = function(e) {
            display.innerHTML = e.target.innerHTML;
        }
    }              
}

var display2 = document.getElementById("accdropdown");

for (var i=1; i<=11; i++) {
    var acc = document.getElementById("choice" + i);
    if (acc != null) {       
        button.onclick = function(e) {
            display2.innerHTML = e.target.innerHTML;
        }
    }              
}

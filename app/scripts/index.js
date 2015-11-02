'use strict';
$( document ).ready(function() {

    $(document).on('change', '#schoolsearch', function(e) {
        $.get("https://mijn.magister.net/api/schools?filter=" + $('#schoolsearch').val(), function(res) {
            console.log(res);
        });
        e.preventDefault();
    });

    $("form").on("submit", function (e) {
        e.preventDefault();
    });
    
});
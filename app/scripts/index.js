'use strict';
$( document ).ready(function() {

    $(document).on('change', '#schoolsearch', function(e) {
        $.get("https://mijn.magister.net/api/schools?filter=" + $('#schoolsearch').val(), function(res) {
            $('.schoolresult').html('');
            if (res.length == 0) {
                $('<li class="list-group-item">Geen school gevonden</li>').appendTo('.schoolresult');
            } else {   
                $.each(res, function(index, val) {
                    var reg = new RegExp('https://([^<]*).magister.net', 'g');
                    $('<li class="list-group-item selected" data-schoolid="'+ reg.exec(val.Url)[1] +'">'+ val.Name +'</li>').appendTo('.schoolresult');
                });
            }
            console.log(res);
        });
        e.preventDefault();
    });

    $("form").on("submit", function (e) {
        e.preventDefault();
    });
    
});
'use strict';
$( document ).ready(function() {

    $(document).on('change', '#schoolsearch', function(e) {
        $.get('https://mijn.magister.net/api/schools?filter=' + $('#schoolsearch').val(), function(res) {
            $('.schoolresult').html('');
            if (res.length == 0) {
                $('<label for="" disabled><input type="radio" value="accessible" name="quality" id=""><span>Geen school gevonden</span></label>').appendTo('.schoolresult');
            } else {   
                $.each(res, function(index, val) {
                    var reg = new RegExp('https://([^<]*).magister.net', 'g');
                    $('<label for="'+ val.Id +'"><input type="radio" value="accessible" name="quality" id="'+ val.Id +'"><span>'+ reg.exec(val.Url)[1] +'</span></label>').appendTo('.schoolresult');
                });
            }
            console.log(res);
        });
        e.preventDefault();
    });

    $(document).on('click', '.schoolresult li', function(e) {
        console.log(e); 
        console.log($(e.target).addClass('selected'));
        e.preventDefault();
    });

    $("form").on("submit", function (e) {
        e.preventDefault();
    });
    
});
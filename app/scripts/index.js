'use strict';
$( document ).ready(function() {
    var tempSchoolkiezen = Handlebars.compile($("#schoolkiezen").html());
    var tempSchoollogin = Handlebars.compile($("#schoollogin").html());

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




    $.ajax({
        url: 'https://ams.magister.net/api/sessies/huidige',
        type: 'DELETE'
    })
    .done(function() {
        console.log("success");
        $.ajax({
            url: 'https://ams.magister.net/api/sessies',
            type: 'POST',
            data: {Gebruikersnaam: "5241", Wachtwoord: "zfarnk", IngelogdBlijven: false},
            success: function(data, textStatus, request){
                console.log("success");
                console.log(request);
                // alert(request.getResponseHeader(''));
                // alert(request.getResponseHeader(''));
                // console.log(this.headers) 
                console.log(request.getResponseHeader('Set-Cookie'));
                console.log(data);
                $.ajax({
                    url: 'https://ams.magister.net/api/sessies',
                    type: 'POST',
                    data: {"Gebruikersnaam":"5241","Wachtwoord":"zfarnk","IngelogdBlijven":false},
                    success: function(data, textStatus, requests){
                        console.log(requests.getResponseHeader('Set-Cookie'));
                     
                        $.ajax({
                            url: 'https://ams.magister.net/api/accounts/6246',
                            success: function(result) {
                                console.log(result)
                            }
                        });
                    }
                });
            }
        });
        });
    
});
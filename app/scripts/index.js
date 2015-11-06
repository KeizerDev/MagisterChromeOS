'use strict';

var school;

$( document ).ready(function() {
    var tempSchoollogin = $('#schoollogin').html();
    var tempSchoolkiezen = $('#schoolkiezen').html();

    // var rendered = Mustache.render(tempSchoolkiezen, {name: "Luke"});
    // $('.login-container').html(rendered);

    $('.login-container').html(Mustache.render(tempSchoolkiezen, {}));
    $('#schoolsearch').on('input', function(e) {
        $.get('https://mijn.magister.net/api/schools?filter=' + $('#schoolsearch').val(), function(res) {
            $('.schoolresult').html('');
            if (res.length == 0) {
                $('<label for="" disabled><input type="radio" name="school" id=""><span>Geen school gevonden</span></label>').appendTo('.schoolresult');
            } else {
                $.each(res, function(index, val) {
                    var reg = new RegExp('https://([^<]*).magister.net', 'g');
                    $('<label for="'+ val.Id +'"><input type="radio" name="school" data-schoolname="'+ reg.exec(val.Url)[1] +'" id="'+ val.Id +'"><span>'+ val.Name +'</span></label>').appendTo('.schoolresult');
                });
            }
            console.log(res);
        });

        e.preventDefault();
    });


    $(document).on('click', '.btn-submit-school', function(event) {
        if ($('.schoolresult input[name="school"]:checked', '.mgstr-school').data('schoolname') != undefined) {
            school = $('.schoolresult input[name="school"]:checked', '.mgstr-school').data('schoolname');
            $('.login-container').html(Mustache.render(tempSchoollogin, {}));
        };
        event.preventDefault();
    });

    $(document).on('click', '.btn-submit-login', function(event) {
        $('.btn-submit-login').attr('disabled', '');
        var username = $('.mgstr-user', '.mgstr-login').val();
        var password = $('.mgstr-pass', '.mgstr-login').val();
        var schoolprefix = 'https://'+school+'.magister.net/api';

        $.ajax({
            url: schoolprefix + '/sessies/huidige',
            type: 'DELETE',
            xhrFields: {
                withCredentials: true
            },
            success: function(data, textStatus, xhr){
                // console.log(xhr.getAllResponseHeaders());
                $.ajax({
                    url: schoolprefix + '/sessies',
                    type: 'POST',
                    data: {Gebruikersnaam: username, Wachtwoord: password, IngelogdBlijven: false},
                    xhrFields: {
                        withCredentials: true,
                        setDisableHeaderCheck: true
                    },
                    success: function(data, textStatus, xhr){
                        $('.btn-submit-login').removeAttr('disabled');

                        console.log("success");
                        console.log(xhr);
                        // alert(request.getResponseHeader(''));
                        // alert(request.getResponseHeader(''));
                        // console.log(this.headers)
                        console.log(xhr.getAllResponseHeaders());
                        console.log(xhr.getResponseHeader('Set-Cookie'));
                        console.log(data);
                    },
                    failure: function(data, textStatus, xhr) {
                        $('.btn-submit-login').removeAttr('disabled');
                    }
                });
            }
        });
        event.preventDefault();
    });

});




// $.ajax({
//     url: schoolprefix + '/personen/5431/afspraken?status=1&tot=2015-11-04&van=2015-11-03',
//     success: function(result) {
//         console.log(result)
//     }
// });

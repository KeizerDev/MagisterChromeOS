'use strict';

var school;

$( document ).ready(function() {
    init();
    // firstrun();
});

function init() {
    chrome.storage.sync.get('firstrun', function(e) {
        if (e == undefined || e == true) {
            containerSetup(true);
            firstrun();
        } else {
            containerSetup(false);
        };
    });
}

function containerSetup(firstrun) {
    $('.app').html();
    if (firstrun) {
        var tempSchoollogin = $('#schoolcontainer').html();
        $('.app').html(Mustache.render(tempSchoollogin, {}));
        firstrun();
    } else {
        var tempSchooldash = $('#schooldashboard').html();
        $('.app').html(Mustache.render(tempSchooldash, {}));
        dashboard();
    }
}


function dashboard() {

}

function firstrun() {
    var tempMgstrlogin = $('#schoollogin').html();
    var tempMgstrkiezen = $('#schoolkiezen').html();

    // var rendered = Mustache.render(tempSchoolkiezen, {name: "Luke"});
    // $('.login-container').html(rendered);

    $('.login-container').html(Mustache.render(tempMgstrkiezen, {}));
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
            $('.login-container').html(Mustache.render(tempMgstrlogin, {}));
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
                withCredentials: true,
                setDisableHeaderCheck: true
            }
        }).done(function() {
            $.ajax({
                url: schoolprefix + '/sessies',
                type: 'POST',
                data: {Gebruikersnaam: username, Wachtwoord: password, IngelogdBlijven: false},
                xhrFields: {
                    withCredentials: true,
                    setDisableHeaderCheck: true
                },
                success: function(data, textStatus, xhr){
                    console.log("success");
                    saveData({'school': school, 'username': username, 'password': password, firstrun: false});
                    init();
                },
                complete: function(data, textStatus, xhr) {
                    $('.btn-submit-login').removeAttr('disabled');
                    console.log(this)
                }
            });
        });
        event.preventDefault();
    });
}


function saveData(obj) {
    // Pass some sort of object:
    // {'value': theValue}

    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set(obj, function() {
    });
}

function getChanges(str) {
    // get obj:
    // {'value': theValue}

    // Save it using the Chrome extension storage API.
    chrome.storage.sync.get(str, function(e) {
        console.log(e);
        // return e;
    });
}

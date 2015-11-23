'use strict';

var school;

$( document ).ready(function() {
    chrome.storage.local.set({'firstrun': false}, function() {});

    chrome.storage.local.get('firstrun', function(e) {
        console.log(e)
        if (e.firstrun == true) {
            console.log(true);
        } else {
            console.log(false);
        };
    });


// function containerSetup(isFirstrun) {
//     $('#app').html();
//     if (isFirstrun) {
//         var tempSchoollogin = $('#schoolcontainer').html();
//         $('#app').html(Mustache.render(tempSchoollogin, {}));
//     } else {
//         var tempSchooldash = $('#schooldashboard').html();
//         $('#app').html(Mustache.render(tempSchooldash, {}));
//     }
// }


// function firstrun() {
    var tempMgstrContainer = $('#schoolcontainer').html();
    var tempMgstrlogin = $('#schoollogin').html();
    var tempMgstrkiezen = $('#schoolkiezen').html();

    var rendered = Mustache.render(tempMgstrContainer, {});
    $('#app').html(rendered);

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
            // Start iframe
            console.log('lol');
        };
        event.preventDefault();
    });

});


function saveData(obj) {
    // Pass some sort of object:
    // {'value': theValue}

    // Save it using the Chrome extension storage API.
    chrome.storage.local.set(obj, function() {
    });
}

function getChanges(str) {
    // get obj:
    // {'value': theValue}

    // Save it using the Chrome extension storage API.
    chrome.storage.local.get(str, function(e) {
        console.log(e);
        // return e;
    });
}

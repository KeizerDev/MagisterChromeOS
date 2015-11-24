'use strict';

var school;

$( document ).ready(function() {
    // chrome.storage.local.set({'firstrun': true}, function() {});
    chrome.storage.local.get('firstrun', isFirstrun);
});

function viewFirstrun() {
    var tempMgstrContainer = $('#schoolcontainer').html();
    var tempMgstrkiezen = $('#schoolkiezen').html();

    // Basic view for not logged in users
    $('#app').html(Mustache.render(tempMgstrContainer, {}));
    $('.login-container').html(Mustache.render(tempMgstrkiezen, {}));

    // Extra handlers for above view
    $('#schoolsearch').on('input', searchSchool);
    $(document).on('click', '.btn-submit-school', function(event) {
        if ($('.schoolresult input[name="school"]:checked', '.mgstr-school').data('schoolname') != undefined) {
            school = $('.schoolresult input[name="school"]:checked', '.mgstr-school').data('schoolname');

            saveData({'firstrun': false});
            saveData({'school': school});
            // Do things to store them and start iframe
            viewMagisterframe();
        };
        event.preventDefault();
    });
}

function viewMagisterframe() {
    var tempMgstrwebview = $('#magisterframe').html();
    chrome.storage.local.get('school', setupWebview);
    $('#app').html(Mustache.render(tempMgstrwebview, {}));
}

function saveData(obj) {
    // Pass object:
    // {'value': theValue}

    // Set obj
    chrome.storage.local.set(obj, function() {
    });
}

function setupWebview(e) {
    console.log(e.school)
}


function isFirstrun(e) {
    console.log(e);
    if (e.firstrun == false) {
        console.log("firstrun:" + false);
        viewMagisterframe();
    } else {
        console.log("firstrun:" + true);
        viewFirstrun();
    };
}

function searchSchool(e) {
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
}

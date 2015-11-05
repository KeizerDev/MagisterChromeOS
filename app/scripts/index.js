// 'use strict';


var counter=0;
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('reset').addEventListener('click', function(event) {
    counter=0;
    document.querySelector("#result").innerHTML="";
  });

  document.getElementById('sendMessage').addEventListener('click', function(event) {
    counter++;
    var message = {
      command: 'render',
      templateName: 'schoollogin',
      context: {'counter': counter}
    };

    var message1 = {
      command: 'render',
      templateName: 'schoolkiezen',
      context: {'counter': counter}
    };
    document.getElementById('theFrame').contentWindow.postMessage(message, '*');

    setTimeout(function() {
    document.getElementById('theFrame').contentWindow.postMessage(message1, '*');
    }, 1000);
  });

  // on result from sandboxed frame:
  window.addEventListener('message', function(event) {
    document.querySelector("#result").innerHTML=event.data.result || "invalid result"
  });
});


// $( document ).ready(function() {
//     var tempSchoolkiezen = Handlebars.compile($("#schoolkiezen").html());
//     var tempSchoollogin = Handlebars.compile($("#schoollogin").html());

//     setTimeout(function() {
//         $('.login-container').html(tempSchoolkiezen());
//         $('#schoolsearch').on('change', function(e) {
//             $.get('https://mijn.magister.net/api/schools?filter=' + $('#schoolsearch').val(), function(res) {
//                 $('.schoolresult').html(tempSchoolkiezen(res));
//                 if (res.length == 0) {
//                     $('<label for="" disabled><input type="radio" value="accessible" name="quality" id=""><span>Geen school gevonden</span></label>').appendTo('.schoolresult');
//                 } else {
//                     $.each(res, function(index, val) {
//                         var reg = new RegExp('https://([^<]*).magister.net', 'g');
//                         $('<label for="'+ val.Id +'"><input type="radio" value="accessible" name="quality" id="'+ val.Id +'"><span>'+ reg.exec(val.Url)[1] +'</span></label>').appendTo('.schoolresult');
//                     });
//                 }
//                 console.log(res);
//             });
//             e.preventDefault();
//         });
//     }, 1000);

//     $(document).on('click', '.schoolresult li', function(e) {
//         console.log(e);
//         console.log($(e.target).addClass('selected'));
//         e.preventDefault();
//     });

//     $("form").on("submit", function (e) {
//         e.preventDefault();
//     });

//     $.ajax({
//         url: 'https://ams.magister.net/api/sessies/huidige',
//         type: 'DELETE',
//         xhrFields: {
//             withCredentials: true
//         },
//         success: function(data, textStatus, xhr){
//             // console.log(xhr.getAllResponseHeaders());
//             $.ajax({
//                 url: 'https://ams.magister.net/api/sessies',
//                 type: 'POST',
//                 data: {Gebruikersnaam: "5241", Wachtwoord: "zfarnk", IngelogdBlijven: false},
//                 xhrFields: {
//                     withCredentials: true,
//                     setDisableHeaderCheck: true
//                 },
//                 success: function(data, textStatus, xhr){


//                     console.log("success");
//                     console.log(xhr);
//                     // alert(request.getResponseHeader(''));
//                     // alert(request.getResponseHeader(''));
//                     // console.log(this.headers)
//                     console.log(xhr.getAllResponseHeaders());
//                     console.log(xhr.getResponseHeader('Set-Cookie'));
//                     console.log(data);

//                 }
//             });
//         }
//     });
// });

// $.ajax({
//     url: 'https://ams.magister.net/api/personen/5431/afspraken?status=1&tot=2015-11-04&van=2015-11-03',
//     success: function(result) {
//         console.log(result)
//     }
// });
